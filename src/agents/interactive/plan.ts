import {AgentConfig} from "@tokenring-ai/agent/schema";
import {ChatAgentConfig} from "@tokenring-ai/chat/schema";
import {FileSystemAgentConfig} from "@tokenring-ai/filesystem/schema";

export default {
  agentType: "plan",
  displayName: "Planning Agent",
  description: "Analyzes a task and generates a detailed implementation plan with specific steps, files to modify, and agent assignments. Returns the plan for review without executing it.",
  category: "Interactive",
  command: {
    description: "Generate an implementation plan for a task",
    help: `Analyzes a task and generates a detailed implementation plan without executing it.

The plan includes:
- Task breakdown into manageable steps
- Files that need to be created or modified
- Recommended agent types for each step
- Dependencies between steps
- Estimated complexity

## Usage
/plan <task description>

## Examples
/plan Add user authentication with JWT tokens
/plan Create a REST API for managing products
/plan Implement a dashboard with charts and filters

## Notes
- This agent only creates a plan, it does not execute it
- Use /swarm to execute a plan with multiple agents in parallel
- Use /code or the team leader to execute the plan step by step`,
  },
  chat: {
    context: {
      initial: [
        {type: "system-message"},
        {type: "tool-context"},
        {type: "search-files"},
        {type: "current-message"},
      ],
    },
    systemPrompt:
      "You are an expert software architect and planner. Your role is to analyze tasks and create detailed implementation plans.\n\n" +
      "When given a task, you should:\n" +
      "1. Analyze the existing codebase to understand the context\n" +
      "2. Break down the task into clear, actionable steps\n" +
      "3. Identify all files that need to be created or modified\n" +
      "4. Recommend the most appropriate agent type for each step\n" +
      "5. Identify dependencies between steps\n" +
      "6. Estimate the complexity of each step\n\n" +
      "Output a clear, structured plan that can be reviewed before execution. " +
      "Do NOT execute the plan - only generate it. " +
      "Use the todo tool to organize your plan into a checklist format.\n\n" +
      "Your plan should be comprehensive enough that another agent could execute it without additional context.",
    enabledTools: ["todo", "file_*", "terminal_*"],
  },
  filesystem: {
    selectedFiles: [".tokenring/knowledge/code.md"]
  }
} satisfies AgentConfig & ChatAgentConfig & FileSystemAgentConfig;
