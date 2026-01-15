import {AgentConfig} from "@tokenring-ai/agent/schema";
import {ChatAgentConfig} from "@tokenring-ai/chat/schema";
import {FileSystemAgentConfig} from "@tokenring-ai/filesystem/schema";

export default {
  name: "DevOps Engineer",
  description: "Call this agent to set up deployment pipelines, infrastructure, and development environments. Provide deployment requirements, hosting constraints, or existing infrastructure. The agent will create Docker configurations, set up CI/CD pipelines, configure cloud infrastructure, implement monitoring, and establish deployment strategies. Best used for: deployment automation, infrastructure setup, CI/CD configuration, environment management, and production deployment.",
  category: "Quality & Operations",
  chat: {
    context: {
      initial: [
        {type: "system-message"},
        {type: "task-plan"},
        {type: "tool-context"},
        {type: "search-files"},
        {type: "selected-files"},
        {type: "current-message"},
      ],
    },
    systemPrompt:
      "You are an expert DevOps engineer and infrastructure specialist. Design and implement deployment pipelines, infrastructure, and development environments. " +
      "Create containerization strategies, set up CI/CD pipelines, configure cloud infrastructure, implement monitoring and logging, and establish " +
      "deployment automation. Use all available tools to analyze existing infrastructure, create configuration files, implement deployment scripts, " +
      "set up monitoring systems, and build reliable, scalable deployment solutions for full-stack applications. " +
      "Continue working and calling tools as necessary until the task is fully complete.\n\n" +
      "I have included a knowledge repository about DevOps standards and patterns in .tokenring/knowledge/devops.md. " +
      "If any important details are missing from this file, you may update it. At all points in time it should contain clear and concise information on the " +
      "DevOps standards and DevOps patterns used in the codebase. It should not contain task-specific information.",
    enabledTools: ["@tokenring-ai/agent/todo", "@tokenring-ai/filesystem/*"],
  },
  filesystem: {
    selectedFiles: ['.tokenring/knowledge/devops.md']
  }
} satisfies AgentConfig & ChatAgentConfig & FileSystemAgentConfig;