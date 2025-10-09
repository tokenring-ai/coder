# TokenRing Coder

**An AI-powered coding assistant that works with your codebase locally**

TokenRing Coder is an interactive AI assistant designed to help developers with coding tasks like editing, refactoring,
testing, and git operations. It runs locally on your machine and supports multiple AI providers while keeping your code
secure.

## ✨ Features

- 🤖 **Multiple AI Providers**: OpenAI, Anthropic, Google, Groq, Cerebras, DeepSeek, and more
- 💬 **Interactive Chat**: Natural language conversations about your code
- 🔧 **Code Operations**: Edit, refactor, test, and commit code changes
- 🌐 **Web Search**: Integrated search capabilities for research and documentation
- 🐳 **Docker Support**: Containerized execution environments
- ☁️ **Cloud Integration**: AWS, S3, and other cloud services
- 🎯 **Specialized Agents**: Different AI agents for specific tasks (frontend, backend, testing, etc.)
- 💾 **Persistent Sessions**: Chat history and checkpoints saved locally
- 🔒 **Local & Secure**: Your code stays on your machine

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- Git

### Installation

1. **Clone and setup:**
   ```bash
   git clone https://github.com/your-org/tokenring-coder.git
   cd tokenring-coder
   git submodule update --init --recursive
   bun install
   ```

2. **Initialize your project:**
   ```bash
   bun src/tr-coder.ts --source ./your-project --initialize
   ```
   This creates a `.tokenring/` directory with configuration files.

3. **Set up API keys:**
   ```bash
   export OPENAI_API_KEY="your-key-here"
   export ANTHROPIC_API_KEY="your-key-here"
   # Add other provider keys as needed
   ```

4. **Start coding with AI:**
   ```bash
   bun src/tr-coder.ts --source ./your-project
   ```

## 💡 Usage Examples

### Basic Chat

```
> Help me refactor this function to be more readable
> Add error handling to the user authentication code
> Write unit tests for the payment processing module
```

### Commands

```
/help          # Show available commands
/model         # Switch AI models
/commit        # Commit changes with AI-generated message
/reset         # Reset conversation
/tools enable  # Enable specific tools
```

### Specialized Agents

```
> @teamLeader Create a new user dashboard feature
> @testEngineer Add comprehensive tests for the API
> @securityReview Check this code for vulnerabilities
```

## 🏗️ Architecture

TokenRing Coder is built as a modular TypeScript monorepo with these core components:

- **Agent System**: Orchestrates AI interactions and tool usage
- **AI Client**: Unified interface for multiple AI providers
- **File System**: Safe file operations with ignore patterns
- **Tools & Commands**: Extensible functionality for development tasks
- **Web Search**: Research capabilities via multiple providers
- **Cloud Integration**: AWS, Docker, and other cloud services

## ⚙️ Configuration

Configuration is stored in `.tokenring/coder-config.mjs` in your project:

```javascript
export default {
  defaults: {
    agent: "teamLeader",
    model: "gpt-4o"
  },
  models: {
    openai: {
      displayName: "OpenAI",
      apiKey: process.env.OPENAI_API_KEY
    },
    anthropic: {
      displayName: "Anthropic", 
      apiKey: process.env.ANTHROPIC_API_KEY
    }
  }
};
```

## 🐳 Docker Usage

```bash
# Build
docker build -t tokenring-coder .

# Run with your project mounted
docker run -ti --net host \
  -v ./your-project:/repo:rw \
  -e OPENAI_API_KEY \
  -e ANTHROPIC_API_KEY \
  tokenring-coder
```

## 🛠️ Development

```bash
# Build the project
bun run build

# Run tests
bun run test

# Format code
bun run biome

# Start development server
bun run coder
```

## 📦 Available Packages

The monorepo includes specialized packages for different functionality:

- **Core**: `agent`, `ai-client`, `cli`, `filesystem`
- **Development**: `git`, `javascript`, `testing`, `code-watch`
- **Cloud**: `aws`, `docker`, `kubernetes`, `s3`
- **Web**: `chrome`, `websearch`, `serper`, `scraperapi`
- **Data**: `database`, `mysql`, `sqlite-storage`
- **Audio**: `audio`, `linux-audio`
- **Other**: `memory`, `queue`, `sandbox`, `mcp`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Run `bun run biome` to format
6. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- Check the [documentation](docs/) for detailed guides
- Review package-specific READMEs in `pkg/*/README.md`
- Open an issue for bugs or feature requests

---

**Ready to supercharge your coding workflow with AI? Get started today!** 🚀