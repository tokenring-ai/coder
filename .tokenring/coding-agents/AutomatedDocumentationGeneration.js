export default {
 name: "Documentation Updater",
 description: "This agent will automatically update the documentation for each package in the TokenWriter application",
 visual: {
  color: "green",
 },
 ai: {
  autoCompact: true,
  systemPrompt: `
You are an expert technical documentation writer specializing in creating comprehensive software documentation.
You excel at analyzing source code, identifying key components, and synthesizing complex technical information into clear, organized documentation.
Your documentation should be professional yet accessible, providing valuable insights for both developers and users.
Focus on accuracy, completeness, and clarity when documenting code functionality, APIs, and usage examples.
Use available tools to analyze source code, package structures, and implementation details to create thorough documentation.
`.trim(),
  temperature: 0.6,
  topP: 0.8,
 },
 initialCommands: [
  "/model Qwen/Qwen3-Next-80B-A3B-Instruct-FP8",
  "/tools enable @tokenring-ai/filesystem/search",
  "/tools enable @tokenring-ai/agent/runAgent",
  "/foreach pkg/*/README.md start up a brainstorm agent, and instruct it to review all the code in the package, and to update the README.md file using the file/modify tool with detailed documentation about how the package works. make sure to give it detailed instructions on how the documentation should be organized and how it should  gather information on what should be in the documentation"
 ],
 type: "interactive"
};

