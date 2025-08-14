/**
 * Default configuration template for the coder application
 * @type {Object} JSON-like configuration
 * @description Provides default settings for AI model, instructions, tools, and file registries
 */

export default {
	defaults: {
		model: "kimi-k2-instruct",
		resources: ["testing*"],
		selectedFiles: [],
		persona: "code",
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
		RunPod: {
			baseURL: "http://0.0.0.0:18000/v1",
			apiKey: "sk-ABCD1234567890",
			provider: "vllm",
			/**
			 * @param {any} modelInfo
			 */
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
			/**
			 * @param {any} model
			 */
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
		Ollama: {
			baseURL: process.env.OLLAMA_URL,
			provider: "ollama",
			/**
			 * @param {any} modelInfo
			 */
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
	},
	indexedFiles: [{ path: "./" }],
	watchedFiles: [{ path: "./", include: /.(js|md|jsx|sql|txt)$/ }],
	resources: {
		fileTree: {
			type: "fileTree",
			description: `App File Tree`,
			items: [
				{ path: `./`, include: /\.(txt|js|jsx|md|json)$/, exclude: /\/pkg\// },
			],
		},
	},
};
