import {type AgentPackageConfig} from "@tokenring-ai/agent/schema";
import deepMerge from "@tokenring-ai/utility/object/deepMerge";
import code from "./code.yaml" with {type: "yaml"};
import leader from "./leader.yaml" with {type: "yaml"};
import plan from "./plan.yaml" with {type: "yaml"};
import research from "./research.yaml" with {type: "yaml"};
import swarm from "./swarm.yaml" with {type: "yaml"};

export default deepMerge(
  code,
  leader,
  plan,
  swarm,
  research,
) satisfies AgentPackageConfig["agents"]
