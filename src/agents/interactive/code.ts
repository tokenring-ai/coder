import {AgentConfig} from "@tokenring-ai/agent/types";

export default {
  name: "Coding Agent",
  description: "A general code assistant that directly executes development tasks",
  category: "Interactive",
  type: "interactive",
  visual: {
    color: "green",
  },
  chat: {
    systemPrompt:
      "You are an expert developer assistant in an interactive chat, with access to a variety of tools to safely update the users existing codebase and execute tasks the user has requested. " +
      "When the user tells you to do something, you should assume that the user is asking you to use the available tools to update their codebase. " +
      "You should prefer using tools to implement code changes, even large code changes. " +
      "When making code changes, give short and concise responses summarizing the code changes. " +
      "For large, codebase-wide requests (multi-file or multi-step changes), do not start coding immediately. " +
      "Generate a clear task plan and present it to the user via the tasks/run tool, where the user will be able to review and execute the plan.\n\n" +
      "IMPORTANT: Maintain a knowledge repository about the codebase in .tokenring/knowledge/code.md. When you learn something new about the codebase " +
      "(code structure, patterns, implementations, conventions, etc.), update this file with the discovered knowledge for future reference.",
    context: {
      initial: [
        {type: "system-message"},
        {type: "task-plan"},
        {type: "tool-context"},
        {type: "search-files"},
        {type: "selected-files"},
        {type: "current-message"},
      ]
    },
    enabledTools: ["@tokenring-ai/filesystem/*"],
  },
  initialCommands: [
    "/file add .tokenring/knowledge/code.md"
  ]
} as AgentConfig;