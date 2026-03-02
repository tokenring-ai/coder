import {AgentConfig} from "@tokenring-ai/agent/schema";

import productDesignEngineer from "./product-design-engineer.ts";
import productManager from "./product-manager.ts";
import systemArchitect from "./system-architect.ts";

export default [
  productDesignEngineer,
  productManager,
  systemArchitect,
] satisfies AgentConfig[];
