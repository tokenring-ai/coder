/**
 * Default Node JS configuration for TokenRing Coder
 * @type {Object} JSON-like configuration
 * @description Provides default settings for the files in the project
 */

export default {
	defaults: {
		agent: "teamLeader",
		resources: ["testing*"],
		selectedFiles: ["AGENTS.md"],
		model: "gpt-5",
	},
	models: {
		anthropic: {
			displayName: "Anthropic",
			apiKey: process.env.ANTHROPIC_API_KEY,
		},
		cerebras: {
			displayName: "Cerebras",
			apiKey: process.env.CEREBRAS_API_KEY,
		},
		deepseek: {
			displayName: "DeepSeek",
			apiKey: process.env.DEEPSEEK_API_KEY,
		},
		google: {
			displayName: "Google",
			apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
		},
		groq: {
			displayName: "Groq",
			apiKey: process.env.GROQ_API_KEY,
		},
		llama: {
			displayName: "llama",
			apiKey: process.env.LLAMA_API_KEY,
		},
		openai: {
			displayName: "OpenAI",
			apiKey: process.env.OPENAI_API_KEY,
		},
		openaiCompatible: {
			displayName: "Runpod",
			baseURL: "http://0.0.0.0:18000/v1",
			apiKey: "sk-ABCD1234567890",
			/**
			 * Generate model specification for Generic OpenAI compatible model interface
			 * The modelInfo object contains the info inside each data: [] item returned by the /models endpoint
			 * The only standard field is id, which is the model identifier, providers may return additional fields
			 * @param {Object} modelInfo
			 * @param {string} modelInfo.id - The model identifier
			 * @returns {{type: string, capabilities: Object}}
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
		openrouter: {
			displayName: "OpenRouter",
			apiKey: process.env.OPENROUTER_API_KEY,
			/**
			 * Filter function to determine capabilities of a model based on supported parameters
			 * @param {Object} model - The model object
			 * @param {string} model.id - The model identifier
			 * @param {string} model.name - The model name
			 * @param {number} model.created - Creation timestamp
			 * @param {string} model.description - Model description
			 * @param {Object} model.architecture - Model architecture information
			 * @param {string[]} model.architecture.input_modalities - Input modalities (e.g. "text", "image")
			 * @param {string[]} model.architecture.output_modalities - Output modalities (e.g. "text")
			 * @param {string} model.architecture.tokenizer - Tokenizer type
			 * @param {string} model.architecture.instruct_type - Instruction type
			 * @param {Object} model.top_provider - Provider information
			 * @param {boolean} model.top_provider.is_moderated - Whether content is moderated
			 * @param {number} model.top_provider.context_length - Maximum context length
			 * @param {number} model.top_provider.max_completion_tokens - Maximum completion tokens
			 * @param {Object} model.pricing - Pricing information
			 * @param {string} model.pricing.prompt - Cost per prompt token
			 * @param {string} model.pricing.completion - Cost per completion token
			 * @param {string} model.pricing.image - Cost per image
			 * @param {string} model.pricing.request - Cost per request
			 * @param {string} model.pricing.web_search - Cost for web search
			 * @param {string} model.pricing.internal_reasoning - Cost for internal reasoning
			 * @param {string} model.pricing.input_cache_read - Cost for input cache read
			 * @param {string} model.pricing.input_cache_write - Cost for input cache write
			 * @param {string} model.canonical_slug - Canonical model identifier
			 * @param {number} model.context_length - Maximum context length
			 * @param {string} model.hugging_face_id - HuggingFace model ID
			 * @param {Object} model.per_request_limits - Request limits
			 * @param {string[]} model.supported_parameters - List of supported parameters
			 *
			 * @returns {boolean}
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
		perplexity: {
			displayName: "Perplexity",
			apiKey: process.env.PERPLEXITY_API_KEY,
		},
		/* Not compatible with Vercel AI SDK 5 yet; use through OpenRouter or openaiCompatible endpoint
  qwen: {
   displayName: "Qwen",
   apiKey: process.env.DASHSCOPE_API_KEY,
  },*/
		xai: {
			displayName: "xAi",
			apiKey: process.env.XAI_API_KEY,
		},
		ollama: {
			displayName: "Ollama",
			baseURL: process.env.OLLAMA_URL,
			/**
			 * Generate model specification for Ollama models
			 * @param {Object} modelInfo - The model information object
			 * @param {string} modelInfo.name - The name of the model
			 * @param {string} modelInfo.model - The model identifier
			 * @param {{ family: string; format: string; families: string[] }} modelInfo.details - Additional model details
			 * @returns {{type: string, capabilities: Object}} Model specification
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
			items: [{ path: `./`, include: /\.(txt|js|jsx|md|json)$/ }],
		},
	},
};
