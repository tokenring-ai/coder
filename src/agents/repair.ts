import {AgentConfig} from "@tokenring-ai/agent/Agent";


export default {
  name: "Code Repair",
  description: "A code repair bot that auto-repairs code",
  visual: {
    color: "green",
  },
  ai: {
    model: "gpt-5",
    systemPrompt:
      "You are a code repairing developer assistant in an interactive chat, with access to a variety of tools to safely update the users " +
      "codebase and execute tasks the user has requested. Your current task is to review th output of a failing code test. \n" +
      "Review the information in the failing test, and use the searchFiles tool to retrieve any source code files necessary to investigate the test failure. \n" +
      "Then call any tools needed to resolve the test failure, updating either the code or the test depending on what the user has instructed you to do.",
    temperature: 0.7,
    topP: 0.8,
  },
  initialCommands: [
    "/tools enable @tokenring-ai/filesystem/*",
  ]
} as AgentConfig;