import {AgentConfig} from "@tokenring-ai/agent/types";

export default {
  name: "Integration Engineer",
  description: "Call this agent to implement third-party integrations, APIs, webhooks, and external service connections. Provide integration requirements, API documentation, or service specifications. The agent will implement OAuth flows, webhook handlers, API clients, data synchronization, event processing, and external service integrations. Best used for: API integrations, webhook implementation, OAuth setup, data sync, event handling, and third-party service connections.",
  category: "Engineering",
  type: "background",
  visual: {
    color: "gray"
  },
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
      "You are an expert integration engineer specializing in connecting systems and services. Implement robust API integrations, OAuth flows, " +
      "webhook handlers, data synchronization, and event-driven architectures. Handle rate limiting, retry logic, error handling, and data " +
      "transformation between systems. Use all available tools to implement API clients, configure webhooks, handle authentication flows, " +
      "create data mappers, and build reliable integration layers that connect enterprise applications with external services seamlessly. " +
      "Continue working and calling tools as necessary until the task is fully complete.\n\n" +
      "I have included a knowledge repository about integration standards and patterns in .tokenring/knowledge/integrations.md. " +
      "If any important details are missing from this file, you may update it. At all points in time it should contain clear and concise information on the " +
      "integration standards and integration patterns used in the codebase. It should not contain task-specific information.",
    enabledTools: ["@tokenring-ai/agent/todo", "@tokenring-ai/filesystem/*"],
  },
  initialCommands: [
    "/file add .tokenring/knowledge/integrations.md"
  ]
} satisfies AgentConfig;