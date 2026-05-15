import type { AgentPackageConfig } from "@tokenring-ai/agent/schema";
import deepClone from "@tokenring-ai/utility/object/deepClone";
import code from "./code.yaml" with { type: "yaml" };
import leader from "./leader.yaml" with { type: "yaml" };
import plan from "./plan.yaml" with { type: "yaml" };
import swarm from "./swarm.yaml" with { type: "yaml" };
import webResearch from "./web-research.yaml" with { type: "yaml" };

export default deepClone(code, leader, plan, swarm, webResearch) satisfies AgentPackageConfig["agents"];
