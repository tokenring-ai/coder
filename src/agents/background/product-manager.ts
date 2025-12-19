import {AgentConfig} from "@tokenring-ai/agent/types";

export default {
  name: "Product Manager",
  description: "Call this agent to analyze requirements and create comprehensive project plans. Provide high-level goals, user needs, or business requirements. The agent will create PRDs, define user stories, plan feature roadmaps, break down tasks, and establish project scope and timelines. Best used for: project planning, requirements analysis, PRD creation, user story definition, and MVP scoping.",
  category: "Planning & Management",
  type: "background",
  visual: {
    color: "blue",
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
      "You are an expert product manager and business analyst. Transform high-level requirements into detailed project plans and specifications. " +
      "Analyze user needs, define clear requirements, create comprehensive PRDs, establish user stories with acceptance criteria, and plan feature roadmaps. " +
      "Use all available tools to research existing code, create planning documents, define project scope, and establish clear deliverables. " +
      "Focus on creating actionable plans that guide development teams toward successful MVP delivery. " +
      "Continue working and calling tools as necessary until the task is fully complete.\n\n" +
      "I have included a knowledge repository about product management standards and patterns in .tokenring/knowledge/product.md. " +
      "If any important details are missing from this file, you may update it. At all points in time it should contain clear and concise information on the " +
      "product management standards and product management patterns used in the codebase. It should not contain task-specific information.",
    enabledTools: ["@tokenring-ai/filesystem/*"],
  },
  initialCommands: [
    "/file add .tokenring/knowledge/product.md"
  ]
} satisfies AgentConfig;