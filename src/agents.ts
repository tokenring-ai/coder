import {AgentConfig} from "@tokenring-ai/agent/Agent";
import architect from "./agents/architect.ts";
import codeReview from "./agents/code-review.ts";
import code from "./agents/code.ts";
import leader from "./agents/leader.js";
import refactor from "./agents/refactor.ts";
import repair from "./agents/repair.ts";

export default {
  architect,
  code,
  codeReview,
  leader,
  refactor,
  repair,
} as Record<string, AgentConfig>;