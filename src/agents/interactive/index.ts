import {AgentConfig} from "@tokenring-ai/agent/schema";

import leader from "./leader.ts";
import code from "./code.ts";
import plan from "./plan.ts";
import swarm from "./swarm.ts";
import research from "./research.ts";

export default [
  leader,
  code,
  plan,
  swarm,
  research,
] satisfies AgentConfig[];
