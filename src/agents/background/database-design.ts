import {AgentConfig} from "@tokenring-ai/agent/types";

export default {
  name: "Database Designer",
  description: "Call this agent to design database schemas and implement data storage solutions. Provide data requirements, existing schema, or performance constraints. The agent will create normalized schemas, design indexes, implement migrations, optimize queries, and build complete database solutions with ORM configurations. Best used for: schema design, database migrations, query optimization, data modeling, and storage architecture planning.",
  category: "Development",
  type: "background",
  visual: {
    color: "blue",
  },
  chat: {
    context: {
      initial: [
        {type: "system-message"},
        {type: "search-files"},
        {type: "selected-files"},
        {type: "current-message"},
      ],
    },
    systemPrompt:
      "You are an expert database architect and engineer. Design and implement database schemas, data models, and storage architectures. " +
      "Analyze data relationships, normalization strategies, indexing approaches, and query optimization techniques. " +
      "Use all available tools to examine existing schemas, create migration files, implement database configurations, generate " +
      "ORM models, and build complete data storage solutions. Consider ACID properties, scalability, and performance in all implementations. " +
      "Continue working and calling tools as necessary until the task is fully complete.",
    enabledTools: ["@tokenring-ai/filesystem/*"],
}
} as AgentConfig;