import {AgentConfig} from "@tokenring-ai/agent/schema";

import authDesign from "./auth-design.ts";
import businessLogicEngineer from "./business-logic-engineer.ts";
import dataEngineer from "./data-engineer.ts";
import integrationEngineer from "./integration-engineer.ts";

export default [
  authDesign,
  businessLogicEngineer,
  dataEngineer,
  integrationEngineer,
] satisfies AgentConfig[];
