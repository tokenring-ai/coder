import {AgentConfig} from "@tokenring-ai/agent/types";

export default {
  name: "Auth System Designer",
  description: "Call this agent to design secure authentication and authorization systems. Provide user requirements, security constraints, or existing auth code. The agent will design login flows, implement session management, create password policies, integrate OAuth/OIDC, handle security tokens, and build complete auth systems. Best used for: login system implementation, access control design, security token handling, multi-factor authentication setup, and compliance-ready auth solutions.",
  type: "background",
  visual: {
    color: "green",
  },
  chat: {
    systemPrompt:
      "You are an expert authentication and authorization specialist. Design and implement secure login systems and access control mechanisms. " +
      "Analyze authentication flows, authorization patterns, session management, password policies, MFA, and OAuth/OIDC integration. " +
      "Use all available tools to examine existing auth code, implement secure authentication systems, create middleware, generate " +
      "security configurations, and build complete login solutions. Consider threat models and compliance requirements in all implementations. " +
      "Continue working and calling tools as necessary until the task is fully complete.",
    temperature: 0.2,
    topP: 0.7,
  },
  initialCommands: [
    "/tools enable @tokenring-ai/filesystem/*",
  ]
} as AgentConfig;