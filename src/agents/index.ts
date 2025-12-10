import {AgentConfig} from "@tokenring-ai/agent/types";
import apiDesigner from "./background/api-designer.ts";
import authDesign from "./background/auth-design.ts";
import backendDesign from "./background/backend-design.ts";
import businessLogicEngineer from "./background/business-logic-engineer.ts";
import codeQualityEngineer from "./background/code-quality-engineer.ts";
import dataEngineer from "./background/data-engineer.ts";
import databaseDesign from "./background/database-design.ts";
import devopsEngineer from "./background/devops-engineer.ts";
import documentationEngineer from "./background/documentation-engineer.ts";
import frontendDesign from "./background/frontend-design.ts";
import fullStackDeveloper from "./background/full-stack-developer.ts";
import integrationEngineer from "./background/integration-engineer.ts";
import performanceEngineer from "./background/performance-engineer.ts";
import productDesignEngineer from "./background/product-design-engineer.ts";
import productManager from "./background/product-manager.ts";
import securityReview from "./background/security-review.ts";
import systemArchitect from "./background/system-architect.ts";
import teamLeader from "./interactive/team-leader.ts";
import testEngineer from "./background/test-engineer.ts";
import uiUxDesigner from "./background/ui-ux-designer.ts";

import interactiveCodeAgent from "./interactive/code.ts";

export default {
  interactiveCodeAgent,
  apiDesigner,
  authDesign,
  backendDesign,
  businessLogicEngineer,
  codeQualityEngineer,
  dataEngineer,
  databaseDesign,
  documentationEngineer,
  devopsEngineer,
  frontendDesign,
  fullStackDeveloper,
  integrationEngineer,
  performanceEngineer,
  productDesignEngineer,
  productManager,
  securityReview,
  systemArchitect,
  teamLeader,
  testEngineer,
  uiUxDesigner,
} satisfies Record<string, AgentConfig>;