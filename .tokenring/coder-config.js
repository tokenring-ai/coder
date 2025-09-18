/* eslint-disable turbo/no-undeclared-env-vars */
import fs from "fs";
import path from "path";
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
  const tests = {};
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

/**
 * @type {import("../src/config.types.js").CoderConfig}
 */
export default {
 defaults: {
  persona: "code",
  model: "openrouter/sonoma-sky-alpha"
 },
 models: {
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
  /* Not compatible with Vercel AI SDK 5 yet; use through OpenRouter or openaiCompatible endpoint
  llama: {
   provider: "llama",
   apiKey: process.env.LLAMA_API_KEY,
  },*/
  OpenAI: {
   provider: "openai",
   apiKey: process.env.OPENAI_API_KEY,
  },
  LlamaCPP: {
   provider: "openaiCompatible",
   baseURL: "http://192.168.15.20:11434",
   apiKey: "sk-ABCD1234567890",
   generateModelSpec(modelInfo) {
    let {id: model} = modelInfo;
    model = model.replace(/:latest$/, "");
    model = model.replace(/^hf.co\/([^\/]*)\//, "");
    let type = "chat";
    let capabilities = {};
    if (model.match(/embed/i)) {
     type = "embedding";
     capabilities.alwaysHot = 1;
    } else if (model.match(/qwen[23]/i)) {
     Object.assign(capabilities, {
      reasoning: 2,
      tools: 2,
      intelligence: 2,
      speed: 2,
      contextLength: 128000,
      costPerMillionInputTokens: 0,
      costPerMillionOutputTokens: 0,
     });
    }
    return {type, capabilities};
   },
  },
  LocalLLama: {
   provider: "openaiCompatible",
   baseURL: "http://192.168.15.25:11434",
   apiKey: "sk-ABCD1234567890",
   generateModelSpec(modelInfo) {
    let {id: model} = modelInfo;
    model = model.replace(/:latest$/, "");
    model = model.replace(/^hf.co\/([^\/]*)\//, "");
    let type = "chat";
    let capabilities = {};
    if (model.match(/embed/i)) {
     type = "embedding";
     capabilities.alwaysHot = 1;
    } else if (model.match(/qwen[23]/i)) {
     Object.assign(capabilities, {
      reasoning: 2,
      tools: 2,
      intelligence: 2,
      speed: 2,
      contextLength: 128000,
      costPerMillionInputTokens: 0,
      costPerMillionOutputTokens: 0,
     });
    }
    return {type, capabilities};
   },
  },
  OpenRouter: {
   provider: "openrouter",
   apiKey: process.env.OPENROUTER_API_KEY,
   modelFilter: (model) => {
    if (!model.supported_parameters?.includes("tools")) {
     return false;
    } else if (/openai|anthropic|xai|perplexity|cerebras/.test(model.id)) {
     return false;
    }
    return true;
   },
  },
  Perplexity: {
   provider: "perplexity",
   apiKey: process.env.PERPLEXITY_API_KEY,
  },
  /* Not compatible with Vercel AI SDK 5 yet; use through OpenRouter or openaiCompatible endpoint
		qwen: {
			provider: "qwen",
			apiKey: process.env.DASHSCOPE_API_KEY,
		},*/
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
    baseDirectory: path.resolve(import.meta.dirname,"../"),
    indexedFiles: [{path: "./"}],
    watchedFiles: [{path: "./", include: /.(js|md|jsx|sql|txt)$/}],
   }
  }
 },
 codebase: {
  resources: {
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
 repoMap: {
  resources: {
   ...dynamicRepoMapResources,
  },
 },
 testing: {
  default: {
   resources: ["testing*"],
  },
  resources: {
   ...dynamicTestingResources,
   "testing/all/biome": {
    type: "shell-testing",
    name: "testing/all/biome",
    description: `Runs biome on the repository`,
    command: "npx @biomejs/biome format --write\n",
    workingDirectory: "./",
   },
   "testing/all/tsc": {
    type: "shell-testing",
    name: "testing/all/tsc",
    description: `Runs tsc on the repository`,
    command:
     "npx tsc --noEmit --allowJs -t esnext -m nodenext --checkJs src/tr-coder.js",
    workingDirectory: "./",
   },
  },
 },
 agents: {
  codeThink: {
   name: "Code Deep Think Agent",
   description: "A deep thinking code assistant that helps with development tasks",
   visual: {
    color: "green",
   },
   ai: {
    systemPrompt:
     "You are a deep thinking developer assistant in an interactive chat, with access to a variety of tools to safely update the users " +
     "codebase and execute tasks the user has requested. \n" +
     "You will see a variety of message, showing the requests the users has made over time, and a final prompt from the user, with a task " +
     "they would like you to complete or continue. Review the users prompt and prior information, and think deeply about it. " +
     "Then output the tag <think>, and output all of your thought about what the user is telling you to do, and what information you might need to " +
     "complete the task, ending your thoughts with the text </think>" +
     "Then call any tools you need to complete the task, and tell the user whether the task is complete, or whether their are items remaining to complete",
    temperature: 0.2,
    topP: 0.1,
   },
   initialCommands: [
    "/tools enable @tokenring-ai/filesystem/*",
   ]
  }
 }
};