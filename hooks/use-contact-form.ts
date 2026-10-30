"use client";

import { useCallback, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ALERT_DURATION,
  CONTACT_SUCCESS_MESSAGE,
  INITIAL_FORM_STATE,
  REQUIRED_FIELDS,
} from "@/constants/contact-constants";
import {
  type AlertState,
  type AlertType,
  type ContactField,
  type ContactFormData,
} from "@/types/contact-types";

const HIDDEN_ALERT: AlertState = {
  visible: false,
  type: "success",
  message: "",
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>(HIDDEN_ALERT);
  const alertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = useCallback((key: ContactField, value: string) => {
    setFormData((previous) => ({ ...previous, [key]: value }));
  }, []);

  const completion = useMemo(() => {
    const filled = REQUIRED_FIELDS.filter((key) => formData[key].trim()).length;
    return filled / REQUIRED_FIELDS.length;
  }, [formData]);

  const showAlert = useCallback((type: AlertType, message: string) => {
    if (alertTimer.current) clearTimeout(alertTimer.current);
    setAlert({ visible: true, type, message });
    alertTimer.current = setTimeout(
      () => setAlert(HIDDEN_ALERT),
      ALERT_DURATION
    );
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setIsLoading(true);

      try {
        // Client-side static handler:
        // Future developers or Emergent agents can plug in Formspree, Resend,
        // Web3Forms, or EmailJS endpoint here.
        await new Promise((resolve) => setTimeout(resolve, 600));

        setFormData(INITIAL_FORM_STATE);
        showAlert("success", CONTACT_SUCCESS_MESSAGE);
      } catch (error) {
        showAlert(
          "danger",
          error instanceof Error ? error.message : "Submission failed. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [showAlert]
  );

  return { formData, update, completion, isLoading, alert, handleSubmit };
};
