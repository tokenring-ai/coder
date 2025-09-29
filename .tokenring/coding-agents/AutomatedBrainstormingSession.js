export default {
 name: "Automated Brainstorming Session",
 description: "This agent will automatically run a brainstorming session for each package in the TokenWriter application",
 visual: {
  color: "green",
 },
 ai: {
  autoCompact: true,
  systemPrompt: `
You are an innovative product development assistant specializing in software package enhancement.

The user is going to give you a large task. You are to run the task until completion, starting up agents until the task is complete.
  `.trim(),

  maxSteps: 100,
  temperature: 0.6,
  topP: 0.8,
 },
 initialCommands: [
  "/tools enable @tokenring-ai/filesystem/*",
  "/tools enable @tokenring-ai/agent/runAgent",
  "/foreach pkg/*/README.md start up a brainstorm agent, and instruct it to review all the code in the pkg/... directory where the README file resides, and to retrieve any @tokenring-ai/ dependencies it imports, and brainstorm new ideas for the product"
  //`For each directory in pkg/, start up a brainstorm agent, passing it the path to the package. and instruct it to read and review the code in the package directory, and to deeply brainstorm ideas for how to improve the package.`,
 ],
 type: "interactive"
};

