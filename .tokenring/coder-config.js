/* eslint-disable turbo/no-undeclared-env-vars */
import fs from "fs";
import path from "path";
import AutomatedBrainstormingSession from "./coding-agents/AutomatedBrainstormingSession.js";
import AutomatedDocumentationGeneration from "./coding-agents/AutomatedDocumentationGeneration.js";
import AutomatedRefactoringSession from "./coding-agents/AutomatedRefactoringSession.js";
import PirateCoder from "./coding-agents/PirateCoder.js";
import brainstormingAgent from "./coding-agents/brainstorming-agent.js";
import refactorAgent from "./coding-agents/refactoring-agent.js";

function getSubdirectories(srcPath) {
 if (!fs.existsSync(srcPath)) return [];
 return fs
 .readdirSync(srcPath)
 .filter((f) => fs.statSync(path.join(srcPath, f)).isDirectory())
 .map((f) => f);
}

function makeFileTreeEntry(pkgRoot, dir, resources) {
 const name = `fileTree/${dir}`;
 resources[name] = {
  type: "fileTree",
  description: `${pkgRoot}/${dir} File Tree`,
  items: [
   {
    path: `./${pkgRoot}/${dir}`,
    include: /\.(prisma|graphql|txt|js|jsx|md|json)$/,
   },
  ],
 };
}

function makeRepoMapEntry(pkgRoot, dir, resources) {
 const name = `repoMap/${dir}`;
 resources[name] = {
  type: "repoMap",
  description: `${pkgRoot}/${dir} Repo Map`,
  items: [
   {
    path: `./${pkgRoot}/${dir}`,
    include: /\.(prisma|graphql|txt|js|jsx|md|json)$/,
   },
  ],
 };
}

function makeWholeFileEntry(pkgRoot, dir, resources) {
 const name = `wholeFile/${dir}`;
 resources[name] = {
  type: "wholeFile",
  description: `${pkgRoot}/${dir} Source Files`,
  items: [
   {
    path: `./${pkgRoot}/${dir}`,
    include: /\.(prisma|graphql|txt|js|jsx|md|json)$/,
   },
  ],
 };
}

function makeTestingEntry(pkgRoot, dir, resources) {
 const packageFile = path.join(pkgRoot, dir, "package.json");
 try {
  if (!fs.existsSync(packageFile)) return null;

  const packageJson = JSON.parse(fs.readFileSync(packageFile));

  const scripts = packageJson.scripts;
  if (scripts?.test) {
   const name = `testing/${dir}/npm-test`;
   resources[name] = {
    type: "shell-testing",
    name,
    description: `Runs NPM Test`,
    command: "npm run test",
    workingDirectory: path.join(pkgRoot, dir),
   };
  }
  if (scripts?.lint) {
   const name = `testing/${dir}/lint`;
   resources[name] = {
    type: "shell-testing",
    name,
    description: "Verify & fix formatting and lint rules",
    command: "npm run eslint",
    workingDirectory: path.join(pkgRoot, dir),
   };
  }
 } catch (error) {
  console.error(`Error while reading ${packageFile}`, error);
  return null;
 }
}

const packageRoots = ["pkg"];
let dynamicCodebaseResources = {};
let dynamicRepoMapResources = {};
let dynamicTestingResources = {};

for (const pkgRoot of packageRoots) {
 const dirs = getSubdirectories(pkgRoot);
 for (const dir of dirs) {
  makeFileTreeEntry(pkgRoot, dir, dynamicCodebaseResources);
  makeRepoMapEntry(pkgRoot, dir, dynamicRepoMapResources);
  makeWholeFileEntry(pkgRoot, dir, dynamicCodebaseResources);
  makeTestingEntry(pkgRoot, dir, dynamicTestingResources);
 }
}


const agents = {
 AutomatedBrainstormingSession,
 AutomatedDocumentationGeneration,
 AutomatedRefactoringSession,
 PirateCoder,
 refactorAgent,
 brainstormingAgent,
};

/**
 * @type {import("../src/config.types.js").CoderConfig}
 */
export default {
 agents,
 chat: {
  defaultModel: "LocalLLama:glm/glm-air-4.5",
 },
 ai: {
  providers: {
   Anthropic: {
    provider: "anthropic",
    apiKey: process.env.ANTHROPIC_API_KEY,
   },
   Azure: {
    provider: "azure",
    apiKey: process.env.AZURE_API_KEY,
    baseURL: process.env.AZURE_API_ENDPOINT,
   },
   Cerebras: {
    provider: "cerebras",
    apiKey: process.env.CEREBRAS_API_KEY,
   },
   DeepSeek: {
    provider: "deepseek",
    apiKey: process.env.DEEPSEEK_API_KEY,
   },
   Google: {
    provider: "google",
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
   },
   Groq: {
    provider: "groq",
    apiKey: process.env.GROQ_API_KEY,
   },
   LLama: {
    provider: "openaiCompatible",
    apiKey: process.env.LLAMA_API_KEY,
    baseURL: 'https://api.llama.com/compat/v1',
   },
   OpenAI: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY
   },
   LlamaCPP: {
    provider: "openaiCompatible",
    baseURL: "http://192.168.15.20:11434",
    apiKey: "sk-ABCD1234567890",
   },
   LocalLLama: {
    provider: "openaiCompatible",
    baseURL: "http://192.168.15.25:11434/v1",
    apiKey: "sk-ABCD1234567890"
   },
   OpenRouter: {
    provider: "openrouter",
    apiKey: process.env.OPENROUTER_API_KEY
   },
   Perplexity: {
    provider: "perplexity",
    apiKey: process.env.PERPLEXITY_API_KEY,
   },
   Qwen: {
    provider: "openaiCompatible",
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1'
   },
   xAi: {
    provider: "xai",
    apiKey: process.env.XAI_API_KEY,
   },
  },
  websearch: {
   serper: {
    type: "serper",
    apiKey: process.env.SERPER_API_KEY,
   },
   scraperapi: {
    type: "scraperapi",
    apiKey: process.env.SCRAPERAPI_API_KEY,
   },
  },
  filesystem: {
   default: {
    selectedFiles: ["AGENTS.md"],
   },
   providers: {
    local: {
     type: "local",
     baseDirectory: path.resolve(import.meta.dirname, "../"),
     indexedFiles: [{path: "./"}],
     watchedFiles: [{path: "./", include: /.(js|md|jsx|sql|txt)$/}],
    }
   }
  },
 },
 /*webHost: {
 },*/
 codebase: {
  resources: {
   ...dynamicRepoMapResources,
   ...dynamicCodebaseResources,
   "fileTree/tr-coder": {
    type: "fileTree",
    description: `Coder App File Tree`,
    items: [
     {path: `./`, include: /\.(txt|js|jsx|md|json)$/, exclude: /\/pkg\//},
    ],
   },
  },
 },
 testing: {
  default: {
   resources: ["testing*"],
  },
  resources: {
   ...dynamicTestingResources,
   "testing/all/tsc": {
    type: "shell-testing",
    name: "testing/all/tsc",
    description: `Runs tsc on the repository`,
    command:
     "npx tsc --noEmit",
    workingDirectory: "./",
   },
  },
 },
};