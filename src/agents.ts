import {AgentConfig} from "@tokenring-ai/agent/Agent";
import architect from "./agents/architect.ts";
import brainstorm from "./agents/brainstorm.ts";
import codeReview from "./agents/code-review.ts";
import code from "./agents/code.ts";
import leader from "./agents/leader.js";
import refactor from "./agents/refactor.ts";

export default {
  architect,
  brainstorm,
  code,
  codeReview,
  leader,
  refactor,
} as Record<string, AgentConfig>;