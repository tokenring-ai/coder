import {AgentConfig} from "@tokenring-ai/agent/schema";

import apiDesigner from "./api-designer.ts";
import backendDesign from "./backend-design.ts";
import codeSymbolLocator from "./code-symbol-locator.ts";
import databaseDesign from "./database-design.ts";
import frontendDesign from "./frontend-design.ts";
import fullStackDeveloper from "./full-stack-developer.ts";

export default [
  apiDesigner,
  backendDesign,
  codeSymbolLocator,
  databaseDesign,
  frontendDesign,
  fullStackDeveloper,
] satisfies AgentConfig[];
