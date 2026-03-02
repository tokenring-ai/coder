import {AgentConfig} from "@tokenring-ai/agent/schema";

import accessibilityEngineer from "./accessibility-engineer.ts";
import documentationEngineer from "./documentation-engineer.ts";
import seoEngineer from "./seo-engineer.ts";
import uiUxDesigner from "./ui-ux-designer.ts";

export default [
  accessibilityEngineer,
  documentationEngineer,
  seoEngineer,
  uiUxDesigner,
] satisfies AgentConfig[];
