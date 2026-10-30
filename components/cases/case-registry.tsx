import { type FC } from "react";
import { CASES, WORKBENCH } from "@/constants/work-constants";
import { MyntraCase, QuickCommerceCase, ShkCase } from "./business-cases";
import { AutomationCase, BluestockCase } from "./systems-cases";
import { WisprCase } from "./wispr-case";
import { WorkbenchCase } from "./workbench-case";

interface CaseEntry {
  title: string;
  description: string;
  Component: FC;
}

const COMPONENTS: Record<string, FC> = {
  "wispr-flow-india-growth": WisprCase,
  "shk-global-ventures": ShkCase,
  "ai-automation": AutomationCase,
  "bluestock-financial-intelligence": BluestockCase,
  "quick-commerce-unit-economics": QuickCommerceCase,
  "myntra-profitability-analysis": MyntraCase,
};

export const CASE_REGISTRY: Record<string, CaseEntry> = {
  ...Object.fromEntries(
    CASES.map((item) => [
      item.slug,
      { title: item.title, description: item.hook, Component: COMPONENTS[item.slug] },
    ])
  ),
  [WORKBENCH.slug]: {
    title: WORKBENCH.title,
    description: `${WORKBENCH.line} ${WORKBENCH.body}`,
    Component: WorkbenchCase,
  },
};
