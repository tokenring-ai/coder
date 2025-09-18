import {AgentConfig} from "@tokenring-ai/agent/Agent";
import apiDesigner from "./agents/api-designer.ts";
import authDesign from "./agents/auth-design.ts";
import backendDesign from "./agents/backend-design.ts";
import businessLogicEngineer from "./agents/business-logic-engineer.ts";
import codeQualityEngineer from "./agents/code-quality-engineer.ts";
import dataEngineer from "./agents/data-engineer.ts";
import databaseDesign from "./agents/database-design.ts";
import devopsEngineer from "./agents/devops-engineer.ts";
import frontendDesign from "./agents/frontend-design.ts";
import fullStackDeveloper from "./agents/full-stack-developer.ts";
import integrationEngineer from "./agents/integration-engineer.ts";
import performanceEngineer from "./agents/performance-engineer.ts";
import productDesignEngineer from "./agents/product-design-engineer.ts";
import productManager from "./agents/product-manager.ts";
import securityReview from "./agents/security-review.ts";
import systemArchitect from "./agents/system-architect.ts";
import teamLeader from "./agents/team-leader.ts";
import testEngineer from "./agents/test-engineer.ts";
import uiUxDesigner from "./agents/ui-ux-designer.ts";

export default {
  apiDesigner,
  authDesign,
  backendDesign,
  businessLogicEngineer,
  codeQualityEngineer,
  dataEngineer,
  databaseDesign,
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
} as Record<string, AgentConfig>;