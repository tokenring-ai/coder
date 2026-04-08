import deepMerge from "@tokenring-ai/utility/object/deepMerge";
import specializedCodingAgents from "./agents/specialized"
import codingAgents from "./agents/coding"
import audio from "./audio.yaml" with {type: "yaml"};
import lifecycle from "./lifecycle.yaml" with {type: "yaml"};
import chat from "./chat.yaml" with {type: "yaml"};
import imageGeneration from "./imageGeneration.yaml" with {type: "yaml"};
import sandbox from "./sandbox.yaml" with {type: "yaml"};

export default deepMerge(
  codingAgents,
  specializedCodingAgents,
  chat,
  audio,
  lifecycle,
  imageGeneration,
  sandbox,
);
