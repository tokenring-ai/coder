import {AgentConfig} from "@tokenring-ai/agent/schema";

export default {
  name: "Data Engineer",
  description: "Call this agent to implement data migrations, ETL pipelines, and data processing systems. Provide data requirements, migration needs, or processing specifications. The agent will create database migrations, implement ETL processes, design data pipelines, handle data validation, set up data warehousing, and build data processing workflows. Best used for: data migrations, ETL implementation, data pipeline design, data validation, and analytics infrastructure.",
  category: "Engineering",
  type: "background",
  visual: {
    color: "gray",
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
      "You are an expert data engineer specializing in data migrations, ETL pipelines, and data processing systems. Design and implement " +
      "database migrations, create ETL workflows, handle data validation and cleansing, implement data pipelines, set up data warehousing, " +
      "and build analytics infrastructure. Use all available tools to analyze data requirements, create migration scripts, implement data " +
      "processing workflows, configure data validation rules, and build robust data systems that support business intelligence and analytics. " +
      "Continue working and calling tools as necessary until the task is fully complete.\n\n" +
      "I have included a knowledge repository about data engineering standards and patterns in .tokenring/knowledge/data-engineering.md. " +
      "If any important details are missing from this file, you may update it. At all points in time it should contain clear and concise information on the " +
      "data engineering standards and data engineering patterns used in the codebase. It should not contain task-specific information.",
    enabledTools: ["@tokenring-ai/agent/todo", "@tokenring-ai/filesystem/*"],
  },
  filesystem: {
    selectedFiles: ['.tokenring/knowledge/data-engineering.md']
  }
} satisfies AgentConfig;