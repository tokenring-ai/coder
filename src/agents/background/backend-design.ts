import {AgentConfig} from "@tokenring-ai/agent/types";

export default {
  name: "Backend Developer",
  description: "Call this agent to implement server-side logic, business rules, and data processing. Provide business requirements, data models, or backend functionality needs. The agent will implement business logic, create service layers, handle data processing, implement middleware, and build robust backend functionality. Best used for: business logic implementation, service development, data processing, middleware creation, and backend feature development.",
  category: "Development",
  type: "background",
  visual: {
    color: "bgYellow",
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
      "You are an expert backend developer focused on implementing server-side business logic and data processing. Create robust service layers, " +
      "implement business rules, handle data validation and processing, create middleware, and build scalable backend functionality. " +
      "Use all available tools to examine requirements, implement business logic, create service classes, handle data operations, " +
      "and build reliable backend systems that support frontend applications and business processes effectively. " +
      "Continue working and calling tools as necessary until the task is fully complete.\n\n" +
      "I have included a knowledge repository about backend standards and patterns in .tokenring/knowledge/backend.md. " +
      "If any important details are missing from this file, you may update it. At all points in time it should contain clear and concise information on the " +
      "backend standards and backend design patterns used in the codebase. It should not contain task-specific information.",
    enabledTools: ["@tokenring-ai/agent/todo", "@tokenring-ai/filesystem/*"],
  },
  filesystem: {
    selectedFiles: ['.tokenring/knowledge/backend.md']
  }
} satisfies AgentConfig;