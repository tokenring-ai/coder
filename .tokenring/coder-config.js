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
let dynamicResources = {};
for (const pkgRoot of packageRoots) {
	const dirs = getSubdirectories(pkgRoot);
	for (const dir of dirs) {
		makeFileTreeEntry(pkgRoot, dir, dynamicResources);
		makeRepoMapEntry(pkgRoot, dir, dynamicResources);
		makeWholeFileEntry(pkgRoot, dir, dynamicResources);
		makeTestingEntry(pkgRoot, dir, dynamicResources);
	}
}

export default {
	defaults: {
		model: "kimi-k2-instruct", //gpt-4.1",
		resources: ["testing*"], //["fileTree*", "testing*"],
		selectedFiles: ["AGENTS.md"],
		persona: "code",
	},
 serper: {
  apiKey: process.env.SERPER_API_KEY,
 },
 scraperapi: {
  apiKey: process.env.SCRAPERAPI_API_KEY,
 },
	models: {
		Anthropic: {
			apiKey: process.env.ANTHROPIC_API_KEY,
			provider: "anthropic",
		},
		Cerebras: {
			apiKey: process.env.CEREBRAS_API_KEY,
			provider: "cerebras",
		},
		DeepSeek: {
			apiKey: process.env.DEEPSEEK_API_KEY,
			provider: "deepseek",
		},
		Google: {
			apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
			provider: "google",
		},
		Groq: {
			apiKey: process.env.GROQ_API_KEY,
			provider: "groq",
		},
		llama: {
			apiKey: process.env.LLAMA_API_KEY,
			provider: "llama",
		},
		OpenAI: {
			apiKey: process.env.OPENAI_API_KEY,
			provider: "openai",
		},
		LlamaCPP: {
			baseURL: "http://192.168.15.20:11434",
			apiKey: "sk-ABCD1234567890",
			provider: "openaiCompatible",
			generateModelSpec(modelInfo) {
				let { id: model } = modelInfo;
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
				return { type, capabilities };
			},
		},
		OpenRouter: {
			apiKey: process.env.OPENROUTER_API_KEY,
			provider: "openrouter",
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
			apiKey: process.env.PERPLEXITY_API_KEY,
			provider: "perplexity",
		},
		Qwen: {
			apiKey: process.env.DASHSCOPE_API_KEY,
			provider: "qwen",
		},
		xAi: {
			apiKey: process.env.XAI_API_KEY,
			provider: "xai",
		},
		OllamaCloud: {
			baseURL: process.env.OLLAMA_CLOUD_URL,
			provider: "ollama",
			generateModelSpec(modelInfo) {
				let { name, model, details } = modelInfo;
				name = name.replace(/:latest$/, "");
				name = name.replace(/^hf.co\/([^\/]*)\//, "");
				let type = "chat";
				let capabilities = {};
				if (model.match(/embed/i)) {
					type = "embedding";
					capabilities.alwaysHot = 1;
				} else if (
					model.match(/qwen[23]/i) ||
					details?.family?.match?.(/qwen3/i)
				) {
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
				return { type, capabilities };
			},
		},
		OllamaLan: {
			baseURL: process.env.OLLAMA_LAN_URL,
			provider: "ollama",
			generateModelSpec(modelInfo) {
				let { name, model, details } = modelInfo;
				name = name.replace(/:latest$/, "");
				name = name.replace(/^hf.co\/([^\/]*)\//, "");
				let type = "chat";
				let capabilities = {};
				if (model.match(/embed/i)) {
					type = "embedding";
					capabilities.alwaysHot = 1;
				} else if (
					model.match(/qwen[23]/i) ||
					details?.family?.match?.(/qwen3/i)
				) {
					Object.assign(capabilities, {
						reasoning: 1,
						tools: 1,
						intelligence: 1,
						speed: 1,
						contextLength: 128000,
						costPerMillionInputTokens: 0,
						costPerMillionOutputTokens: 0,
					});
				}
				return { type, capabilities };
			},
		},
		OllamaRunPod: {
			baseURL: "https://jw6zy2bs9u3spw-11434.proxy.runpod.net/api",
			provider: "ollama",
			generateModelSpec(modelInfo) {
				let { name, model, details } = modelInfo;
				name = name.replace(/:latest$/, "");
				name = name.replace(/^hf.co\/([^\/]*)\//, "");
				let type = "chat";
				let capabilities = {};
				if (model.match(/embed/i)) {
					type = "embedding";
					capabilities.alwaysHot = 1;
				} else if (
					model.match(/qwen[23]/i) ||
					details?.family?.match?.(/qwen3/i)
				) {
					Object.assign(capabilities, {
						tools: 1,
						contextLength: 16000,
						costPerMillionInputTokens: 0,
						costPerMillionOutputTokens: 0,
					});
				}
				return { type, capabilities };
			},
		},
		OllamaLocal: {
			baseURL: process.env.OLLAMA_LOCAL_URL,
			provider: "ollama",
			generateModelSpec(modelInfo) {
				let { name, model, details } = modelInfo;
				name = name.replace(/:latest$/, "");
				name = name.replace(/^hf.co\/([^\/]*)\//, "");
				let type = "chat";
				let capabilities = {};
				if (model.match(/embed/i)) {
					type = "embedding";
					capabilities.alwaysHot = 1;
				} else if (
					model.match(/qwen[23]/i) ||
					details?.family?.match?.(/qwen3/i)
				) {
					Object.assign(capabilities, {
						tools: 1,
						contextLength: 16000,
						costPerMillionInputTokens: 0,
						costPerMillionOutputTokens: 0,
					});
				}
				return { type, capabilities };
			},
		},
	},
	indexedFiles: [{ path: "./" }],
	watchedFiles: [{ path: "./", include: /.(js|md|jsx|sql|txt)$/ }],
	resources: {
		...dynamicResources,
		"fileTree/tr-coder": {
			type: "fileTree",
			description: `Coder App File Tree`,
			items: [
				{ path: `./`, include: /\.(txt|js|jsx|md|json)$/, exclude: /\/pkg\// },
			],
		},
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
};
