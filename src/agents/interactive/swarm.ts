import {AgentConfig} from "@tokenring-ai/agent/schema";
import {ChatAgentConfig} from "@tokenring-ai/chat/schema";
import {FileSystemAgentConfig} from "@tokenring-ai/filesystem/schema";

export default {
  agentType: "swarm",
  displayName: "Swarm Agent",
  description: "Orchestrates multiple agents in parallel to execute complex tasks. Analyzes requirements, breaks down work into parallel tasks, and uses the tasks_run tool to execute them simultaneously.",
  category: "Interactive",
  command: {
    description: "Run a swarm of agents in parallel to complete a task",
    help: `# /swarm

## Description
Orchestrates multiple agents in parallel to execute complex tasks efficiently.

This agent:
1. Analyzes the task requirements
2. Identifies independent work streams that can run in parallel
3. Creates a task plan with multiple agents
4. Executes all tasks simultaneously using the tasks_run tool

## Usage
/swarm <task description>

## Examples
/swarm Add user authentication with login, signup, and password reset
/swarm Create a complete CRUD API for products with tests
/swarm Implement the checkout flow including cart, payment, and confirmation

## Available Agent Types
- fullStackDeveloper: Complete features across frontend and backend
- frontendDesign: UI components and frontend logic
- backendDesign: API endpoints and server logic
- databaseDesign: Schema changes and migrations
- testEngineer: Writing and updating tests
- documentationEngineer: Documentation updates
- devopsEngineer: CI/CD and infrastructure
- securityReview: Security analysis and fixes
- integrationEngineer: Third-party integrations
- performanceEngineer: Performance optimization
- codeQualityEngineer: Code quality improvements

## Notes
- Tasks are executed in parallel for maximum efficiency
- You will be asked to approve the task plan before execution
- Use /plan if you only want to see the plan without executing`,
  },
  chat: {
    context: {
      initial: [
        {type: "system-message"},
        {type: "tool-context"},
        {type: "available-agents"},
        {type: "search-files"},
        {type: "selected-files"},
        {type: "current-message"},
      ],
    },
    systemPrompt:
      "You are an expert task orchestrator that coordinates multiple agents working in parallel. Your role is to:\n\n" +
      "1. Analyze the user's task and identify all independent work streams\n" +
      "2. Determine which agent types are best suited for each work stream\n" +
      "3. Create a comprehensive task plan using the tasks_run tool\n" +
      "4. Execute all tasks in parallel for maximum efficiency\n\n" +
      "When creating tasks:\n" +
      "- Break complex tasks into independent, parallelizable units\n" +
      "- Each task should be self-contained with all necessary context\n" +
      "- Provide detailed context so agents understand exactly what to do\n" +
      "- Specify file names, paths, and technical requirements\n" +
      "- Consider dependencies and order them appropriately\n\n" +
      "IMPORTANT: Always use the tasks_run tool to create and execute your task plan. " +
      "This tool will present the plan to the user for approval and then execute all tasks in parallel.\n\n" +
      "Your goal is to maximize parallel execution while ensuring each agent has clear, complete instructions.\n\n" +
      "Continue monitoring progress and spawning additional tasks as needed until the overall objective is fully complete.",
    enabledTools: ["todo", "tasks_run", "file_*", "terminal_*"],
  },
  filesystem: {
    selectedFiles: [".tokenring/knowledge/code.md"]
  }
} satisfies AgentConfig & ChatAgentConfig & FileSystemAgentConfig;
