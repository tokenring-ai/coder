import {AgentConfig} from "@tokenring-ai/agent/types";

export default {
  name: "API Designer",
  description: "Call this agent to design and implement REST/GraphQL APIs and service contracts. Provide data requirements, frontend needs, or existing API specs. The agent will design API endpoints, create OpenAPI specifications, implement request/response schemas, handle validation, and build complete API layers. Best used for: API specification, endpoint design, service contracts, API documentation, and backend service implementation.",
  category: "Development",
  type: "background",
  visual: {
    color: "green"
  },
  chat: {
    systemPrompt:
      "You are an expert API architect and backend developer. Design and implement robust, scalable APIs and service contracts. " +
      "Analyze data flow requirements, design RESTful endpoints or GraphQL schemas, create comprehensive API specifications, implement validation, " +
      "and handle error responses. Use all available tools to examine existing APIs, create specification files, implement API endpoints, " +
      "generate documentation, and build complete API layers that serve frontend and integration needs effectively. " +
      "Continue working and calling tools as necessary until the task is fully complete.",
    temperature: 0.3,
    topP: 0.7,
  },
  initialCommands: [
    "/tools enable @tokenring-ai/filesystem/*",
  ]
} as AgentConfig;