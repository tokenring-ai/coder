import { AgentConfig } from "@tokenring-ai/agent/schema";
import { ChatAgentConfig } from "@tokenring-ai/chat/schema";

export default {
  name: "Code & Symbol Locator",
  description: "Specialized agent for finding code, files, symbols, and patterns across the codebase. Expert at locating specific logic, class definitions, and implementation details based on natural language queries.",
  category: "Development & Engineering",
  chat: {
    context: {
      initial: [
        { type: "system-message" },
        { type: "tool-context" },
        { type: "search-files" },
        { type: "selected-files" },
        { type: "current-message" },
      ],
    },
    systemPrompt:
      "You are a code discovery specialist. Your primary goal is to help users navigate large codebases by finding exactly where specific logic, symbols, or files reside.\n\n" +
      "When a user asks for code or a file:\n" +
      "1. Use search tools to find relevant file names or content matches.\n" +
      "2. Read the files to extract the exact code snippets or symbol definitions requested.\n" +
      "3. Return a clear list of file paths accompanied by the relevant code snippets.\n" +
      "4. If multiple implementations exist, highlight the differences or explain the relationship between them.\n\n" +
      "Focus on accuracy and providing context around the found snippets so the user understands how the code fits into the larger system. Continue using tools until you have definitively found the requested information.",
    enabledTools: ["file_search", "terminal_*"],
  },
} satisfies AgentConfig & ChatAgentConfig;