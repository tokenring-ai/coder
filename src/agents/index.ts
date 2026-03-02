import {AgentConfig} from "@tokenring-ai/agent/schema";
import designDocumentationAgents from "./specialized/design-documentation/index.ts"
import developmentAgents from "./specialized/development/index.ts"
import engineeringAgents from "./specialized/engineering/index.ts"
import planningManagementAgents from "./specialized/planning-management/index.ts"
import qualityOperationsAgents from "./specialized/quality-operations/index.ts"
import interactiveAgents from "./interactive/index.ts"

export default [
  ...designDocumentationAgents,
  ...developmentAgents,
  ...engineeringAgents,
  ...planningManagementAgents,
  ...qualityOperationsAgents,
  ...interactiveAgents,
] satisfies AgentConfig[];
