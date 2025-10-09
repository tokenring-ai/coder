/**
 * Default Node JS configuration for TokenRing Coder
 * @type {Object} JSON-like configuration
 * @description Provides default settings for the files in the project
 */

export default {
	ai: {
		defaultModel: "LocalLLama:openai/gpt-oss-120b",
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
			LLama: {
				provider: "openaiCompatible",
				apiKey: process.env.LLAMA_API_KEY,
				baseURL: "https://api.llama.com/compat/v1",
			},
			OpenAI: {
				provider: "openai",
				apiKey: process.env.OPENAI_API_KEY,
			},
			LlamaCPP: {
				provider: "openaiCompatible",
				baseURL: "http://192.168.15.20:11434",
			},
			LocalLLama: {
				provider: "openaiCompatible",
				baseURL: "http://192.168.15.25:11434/v1",
			},
			OpenRouter: {
				provider: "openrouter",
				apiKey: process.env.OPENROUTER_API_KEY,
			},
			Perplexity: {
				provider: "perplexity",
				apiKey: process.env.PERPLEXITY_API_KEY,
			},
			Qwen: {
				provider: "openaiCompatible",
				apiKey: process.env.DASHSCOPE_API_KEY,
				baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
			},
			xAi: {
				provider: "xai",
				apiKey: process.env.XAI_API_KEY,
			},
		},
	},

	indexedFiles: [{ path: "./" }],
	watchedFiles: [{ path: "./", include: /.(js|md|jsx|sql|txt)$/ }],
	resources: {
		fileTree: {
			type: "fileTree",
			description: `App File Tree`,
			items: [{ path: `./`, include: /\.(txt|js|jsx|md|json)$/ }],
		},
	},
};
