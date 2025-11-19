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

### Option 1: Run with npx (Easiest)

```bash
# Initialize your project
npx @tokenring-ai/coder --source ./your-project --initialize

# Set up API keys
export OPENAI_API_KEY="your-key-here"
export ANTHROPIC_API_KEY="your-key-here"

# Start coding with AI
npx @tokenring-ai/coder --source ./your-project
```

### Option 2: Run with Docker

```bash
# Pull from GitHub Container Registry
docker pull ghcr.io/tokenring-ai/tokenring-coder:latest

# Initialize your project
docker run -ti --rm \
  -v ./your-project:/repo:rw \
  ghcr.io/tokenring-ai/tokenring-coder:latest \
  --source /repo --initialize

# Start coding with AI
docker run -ti --rm \
  -v ./your-project:/repo:rw \
  -e OPENAI_API_KEY \
  -e ANTHROPIC_API_KEY \
  ghcr.io/tokenring-ai/tokenring-coder:latest \
  --source /repo
```

### Option 3: Clone and Build from Source

```bash
# Clone and setup
git clone https://github.com/tokenring-ai/tokenring-coder.git
cd tokenring-coder
git submodule update --init --recursive
bun install

# Initialize your project
bun src/tr-coder.ts --source ./your-project --initialize

# Set up API keys
export OPENAI_API_KEY="your-key-here"
export ANTHROPIC_API_KEY="your-key-here"

# Start coding with AI
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

## 🤖 Available Agents

TokenRing Coder includes specialized AI agents for different development tasks:

### Interactive Agent

- **interactiveCodeAgent** - Interactive code assistant for direct development tasks

### Planning & Management

- **teamLeader** - Orchestrates full-stack projects, coordinates specialists, manages workflow
- **productManager** - Creates PRDs, defines user stories, plans feature roadmaps
- **productDesignEngineer** - Product enhancement and comprehensive PRD creation
- **systemArchitect** - Designs system architectures and selects technology stacks

### Development Specialists

- **fullStackDeveloper** - Implements complete features across frontend and backend
- **frontendDesign** - Creates React/Vue components, responsive layouts, state management
- **backendDesign** - Implements server-side logic, business rules, data processing
- **apiDesigner** - Designs REST/GraphQL APIs, creates OpenAPI specifications
- **databaseDesign** - Designs schemas, implements migrations, optimizes queries

### Engineering Specialists

- **businessLogicEngineer** - Implements workflows, rules engines, automation systems
- **dataEngineer** - Creates ETL pipelines, data migrations, processing workflows
- **integrationEngineer** - Implements third-party integrations, APIs, webhooks
- **authDesign** - Designs authentication/authorization systems, OAuth/OIDC

### Quality & Operations

- **testEngineer** - Creates unit/integration/E2E tests, test automation
- **codeQualityEngineer** - Code reviews, refactoring, standards enforcement
- **securityReview** - Security assessments, vulnerability remediation, OWASP compliance
- **performanceEngineer** - Performance optimization, caching, monitoring, scalability
- **devopsEngineer** - CI/CD pipelines, Docker configs, infrastructure setup

### Design & Documentation

- **uiUxDesigner** - Creates wireframes, design systems, user flows
- **documentationEngineer** - Technical documentation, API docs, user guides

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

### Using Pre-built Image from GHCR

```bash
# Pull latest image
docker pull ghcr.io/tokenring-ai/tokenring-coder:latest

# Run with your project mounted
docker run -ti --rm \
  -v ./your-project:/repo:rw \
  -e OPENAI_API_KEY \
  -e ANTHROPIC_API_KEY \
  ghcr.io/tokenring-ai/tokenring-coder:latest \
  --source /repo
```

### Building from Source

```bash
# Build
docker build -t tokenring-coder -f docker/Dockerfile .

# Run with your project mounted
docker run -ti --rm \
  -v ./your-project:/repo:rw \
  -e OPENAI_API_KEY \
  -e ANTHROPIC_API_KEY \
  tokenring-coder \
  --source /repo
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