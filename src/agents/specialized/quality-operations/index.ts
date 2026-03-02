import {AgentConfig} from "@tokenring-ai/agent/schema";

import codeQualityEngineer from "./code-quality-engineer.ts";
import devopsEngineer from "./devops-engineer.ts";
import performanceEngineer from "./performance-engineer.ts";
import securityReview from "./security-review.ts";
import testEngineer from "./test-engineer.ts";

export default [
  codeQualityEngineer,
  devopsEngineer,
  performanceEngineer,
  securityReview,
  testEngineer,
] satisfies AgentConfig[];
