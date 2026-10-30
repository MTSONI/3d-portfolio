"use client";

import { useRef, type FC } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  SERVICE_ACCENTS,
  STACK_OFFSET_REM,
  STACK_SCALE_STEP,
} from "@/constants/services-ui-constants";
import { formatCounter, padIndex } from "@/helpers/format-helpers";
import { type ServiceCardProps } from "@/types/services-types";
import { ServiceBullets } from "./service-bullets";
import { ServiceCta } from "./service-cta";

export const ServiceCard: FC<ServiceCardProps> = ({
  service,
  index,
  total,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (total - index) * STACK_SCALE_STEP]
  );
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.7]);

  return (
    <div
      ref={ref}
      style={{
        top: `calc(7rem + ${index * STACK_OFFSET_REM}rem)`,
      }}
      className="sticky"
    >
      <motion.article
        style={{ scale, opacity }}
        className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12"
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${
            SERVICE_ACCENTS[index % SERVICE_ACCENTS.length]
          } blur-[90px]`}
        />

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-eyebrow">
                  {formatCounter(index + 1, total)}
                </span>
                <span className="h-px w-8 bg-white/20" />
              </div>

              <h3 className="text-heading mt-3 text-2xl md:text-3xl lg:text-4xl">
                {service.title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-neutral-400 md:text-lg">
                {service.description}
              </p>
            </div>

            <div className="mt-8">
              <ServiceCta />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="relative flex items-start justify-end">
              <span className="text-[7rem] font-black leading-none tracking-tighter text-white/10 md:text-[10rem]">
                {padIndex(index + 1)}
              </span>
              <div className="absolute right-0 top-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md md:h-20 md:w-20">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={36}
                  height={36}
                  className="h-8 w-8 opacity-90 md:h-9 md:w-9"
                />
              </div>
            </div>

            <ServiceBullets bullets={service.bullets} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
      </motion.article>
    </div>
  );
};
