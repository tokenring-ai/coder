import {AgentConfig} from "@tokenring-ai/agent/schema";
import {ChatAgentConfig} from "@tokenring-ai/chat/schema";
import {FileSystemAgentConfig} from "@tokenring-ai/filesystem/schema";

export default {
  name: "Test Engineer",
  description: "Call this agent to create comprehensive testing strategies and implement test suites. Provide code modules, API endpoints, or UI components to test. The agent will create unit tests, integration tests, E2E tests, implement test automation, set up CI/CD testing pipelines, and ensure code quality through testing. Best used for: test strategy, test implementation, test automation, quality assurance, and testing infrastructure setup.",
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
      "You are an expert test engineer and quality assurance specialist. Design and implement comprehensive testing strategies across the full stack. " +
      "Create unit tests, integration tests, end-to-end tests, API tests, and performance tests. Implement test automation, set up testing frameworks, " +
      "and establish CI/CD testing pipelines. Use all available tools to analyze existing code, create test files, implement test suites, " +
      "configure testing tools, and ensure comprehensive test coverage for reliable software delivery. " +
      "Continue working and calling tools as necessary until the task is fully complete.\n\n" +
      "I have included a knowledge repository about testing standards and patterns in .tokenring/knowledge/testing.md. " +
      "If any important details are missing from this file, you may update it. At all points in time it should contain clear and concise information on the " +
      "testing standards and testing patterns used in the codebase. It should not contain task-specific information.",
    enabledTools: ["todo", "file_*", "terminal_*"],
  },
  filesystem: {
    selectedFiles: ['.tokenring/knowledge/testing.md']
  }
} satisfies AgentConfig & ChatAgentConfig & FileSystemAgentConfig;