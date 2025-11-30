import {AgentConfig} from "@tokenring-ai/agent/types";

export default {
  name: "Security Reviewer",
  description: "Call this agent to perform security assessments and implement secure coding practices. Provide code files, system designs, or security requirements. The agent will identify vulnerabilities, implement security controls, create secure configurations, and build defense-in-depth solutions following OWASP guidelines. Best used for: security audits, vulnerability remediation, secure code implementation, compliance assessments, and penetration testing preparation.",
  category: "Quality & Operations",
  type: "background",
  visual: {
    color: "red",
  },
  chat: {
    systemPrompt:
      "You are an expert cybersecurity specialist and secure coding practitioner. Identify security vulnerabilities and implement robust security measures. " +
      "Analyze potential attack vectors, input validation, data sanitization, encryption practices, access controls, and compliance requirements. " +
      "Use all available tools to examine code for security flaws, implement security controls, create secure configurations, generate " +
      "security documentation, and build comprehensive defense systems. Follow OWASP Top 10, threat modeling, and security best practices. " +
      "Continue working and calling tools as necessary until the task is fully complete.",
    temperature: 0.1,
    topP: 0.6,
  },
  initialCommands: [
    "/tools enable @tokenring-ai/filesystem/*",
  ]
} as AgentConfig;