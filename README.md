# TokenRing Coder

**An AI-powered coding assistant with a comprehensive 46-package ecosystem for local development**

TokenRing Coder is an interactive AI assistant designed to help developers with coding tasks like editing, refactoring, testing, and git operations. It runs locally on your machine and supports multiple AI providers while keeping your code secure. The modular ecosystem includes 46 specialized packages covering everything from audio processing to cloud services, communication platforms, and advanced development tools.

## Features

### AI and Language Model Support
- **Multiple AI Providers**: OpenAI, Anthropic, Google, Groq, Cerebras, DeepSeek, and more
- **Unified AI Client**: Chat, embeddings, and images via Vercel AI SDK
- **Model Registry**: Dynamic model selection and configuration
- **Agent Orchestration**: Multi-agent workflows with specialized roles

### Communication and Collaboration
- **Escalation Service**: Multi-provider support with group broadcasting and communication channels
- **Slack Integration**: Bot functionality and workspace management
- **Telegram Integration**: Chat management and message handling
- **Human Feedback Tools**: File reviews, React component previews, and interactive Q&A
- **Real-time Communication**: WebSocket API for browser clients

### Audio and Media Capabilities
- **Audio Framework**: Recording, playback, transcription, and text-to-speech
- **Linux Audio**: Platform-specific implementation using naudiodon3
- **Native Audio I/O**: PortAudio bindings for high-performance audio operations

### Web and External Services
- **Web Search**: Multiple providers (Serper.dev, ScraperAPI, Chrome automation)
- **Research Tools**: Wikipedia integration and web research capabilities
- **Browser Automation**: Puppeteer scripts for web interaction
- **Web Scraping**: SERP results and page content fetching

### Database and Storage
- **Multi-Database Support**: MySQL, SQLite, PostgreSQL via Drizzle ORM
- **Database Abstraction**: SQL execution, schema inspection, and resource management
- **Checkpoint Persistence**: Agent state storage across sessions
- **Task Queuing**: Sequential processing with checkpoint preservation
- **Memory Management**: Short-term memory and attention storage

### Cloud and Infrastructure
- **AWS Integration**: STS/S3 clients with authentication
- **S3 Storage**: Cloud filesystem and CDN providers for AWS S3
- **Docker Support**: Container management and sandbox execution
- **Kubernetes**: Resource discovery and management across namespaces
- **Sandbox Environment**: Isolated execution for security

### Advanced Development Tools
- **Code Intelligence**: Semantic file indexing with Tree-sitter integration
- **Code Watch**: AI comment-triggered modification detection
- **JavaScript Tooling**: ESLint auto-fix, package management, script execution
- **Git Integration**: Commits, rollbacks, branch management with auto-commit
- **Testing Framework**: Agent testing with auto-repair hooks
- **File System**: Abstract filesystem with ignore patterns and dirty tracking

### Workflow Automation
- **Scripting Language**: Variables, functions, LLM integration, and command sequences
- **Task Orchestration**: Multi-step workflows with user approval
- **Batch Processing**: Named iterables system with /foreach command
- **Workflow Engine**: Advanced task planning and execution
- **Scheduler**: Task scheduling and automation

### Protocol Extensions
- **MCP Integration**: Model Context Protocol client for external server connectivity
- **Web Hosting**: Fastify-based service with pluggable resources
- **Frontend Interface**: Complete React frontend with CLI-style interaction
- **RPC**: Remote procedure call infrastructure

### Terminal and POSIX Support
- **Terminal Service**: Interactive terminal sessions with output collection
- **POSIX System**: POSIX-compliant file system and terminal providers

### Specialized Agents
TokenRing Coder includes 27 specialized AI agents organized into two categories:

**Interactive Agents (5)**
- **Coding Agent** - A general code assistant that directly executes development tasks
- **Team Leader** - Orchestrates full-stack projects, coordinates specialists, manages workflow
- **Planning Agent** - Creates detailed project plans and task breakdowns
- **Swarm Agent** - Coordinates multiple agents working in parallel on complex tasks
- **Research Agent** - Conducts research and gathers information from multiple sources

**Background Specialists (22)**

*Planning & Management (3)*
- **Product Manager** - Creates PRDs, defines user stories, plans feature roadmaps
- **Product Design Engineer** - Product enhancement and comprehensive PRD creation
- **System Architect** - Designs system architectures and selects technology stacks

*Development (6)*
- **Full Stack Developer** - Implements complete features across frontend and backend
- **Frontend Designer** - Creates React/Vue components, responsive layouts, state management
- **Backend Designer** - Implements server-side logic, business rules, data processing
- **API Designer** - Designs REST/GraphQL APIs, creates OpenAPI specifications
- **Database Designer** - Designs schemas, implements migrations, optimizes queries
- **Code Symbol Locator** - Finds and analyzes code symbols and references

*Engineering (4)*
- **Business Logic Engineer** - Implements workflows, rules engines, automation systems
- **Data Engineer** - Creates ETL pipelines, data migrations, processing workflows
- **Integration Engineer** - Implements third-party integrations, APIs, webhooks
- **Auth Designer** - Designs authentication/authorization systems, OAuth/OIDC

*Quality Operations (5)*
- **Test Engineer** - Creates unit/integration/E2E tests, test automation
- **Code Quality Engineer** - Code reviews, refactoring, standards enforcement
- **Security Review** - Security assessments, vulnerability remediation, OWASP compliance
- **Performance Engineer** - Performance optimization, caching, monitoring, scalability
- **DevOps Engineer** - CI/CD pipelines, Docker configs, infrastructure setup

*Design & Documentation (4)*
- **UI/UX Designer** - Creates wireframes, design systems, user flows
- **Documentation Engineer** - Technical documentation, API docs, user guides
- **Accessibility Engineer** - Ensures accessibility compliance and WCAG standards
- **SEO Engineer** - Search engine optimization, meta tags, and search visibility

## Quick Start

### Environment Variables

At least one AI provider key is required:

```bash
export OPENAI_API_KEY=sk-...              # OpenAI
export ANTHROPIC_API_KEY=sk-ant-...      # Anthropic
export GOOGLE_GENERATIVE_AI_API_KEY=...  # Google Gemini
export GROQ_API_KEY=gsk_...              # Groq
export CEREBRAS_API_KEY=...              # Cerebras
export DEEPSEEK_API_KEY=...              # DeepSeek
export XAI_API_KEY=...                   # xAI
export OPENROUTER_API_KEY=...            # OpenRouter

# Optional: web search
export SERPER_API_KEY=...
```

### Option 1: Run with npx (Recommended)

The package is published to npm with the `next` tag on every version release:

```bash
npx @tokenring-ai/coder@next

# Run against a specific directory
npx @tokenring-ai/coder@next --projectDirectory ./your-project
```

### Option 2: Run with bun (from source)

```bash
git clone https://github.com/tokenring-ai/monorepo.git
cd monorepo
git submodule update --init --recursive
bun install

bun run coder
```

### Option 3: Run with Docker

```bash
docker pull ghcr.io/tokenring-ai/coder:latest

docker run -ti --rm \
  -v ./your-project:/repo:rw \
  -e OPENAI_API_KEY \
  ghcr.io/tokenring-ai/coder:latest
```

### Option 4: Web Interface

```bash
# Start with HTTP server and web frontend
bun run coder --http 127.0.0.1:3000

# Access at http://localhost:3000
# Features real-time agent communication via WebSocket
```

### Option 5: Custom UI

```bash
# Run with custom UI (opentui, ink, or none)
bun run coder --ui opentui  # Interactive CLI with OpenTUI (default)
bun run coder --ui ink      # Interactive CLI with ink
bun run coder --ui none     # Background mode without UI
```

### Option 6: HTTP Server

```bash
# Start with HTTP server for remote access
bun run coder --http 127.0.0.1:3000

# Or with authentication
bun run coder --http 127.0.0.1:3000 --httpPassword user:password
bun run coder --http 127.0.0.1:3000 --httpBearer user:bearer-token
```

## Command Line Options

```bash
tr-coder [options] [prompt]
```

### Options

- `--ui <opentui|ink|none>`: Select the UI to use (default: `opentui`)
- `--projectDirectory <path>`: Working directory (default: cwd)
- `--dataDirectory <path>`: Data directory for session database, knowledge, etc. (default: `<projectDirectory>/.tokenring`)
- `--agent <type>`: Agent type to start with (default: `code`)
- `--acp`: Start in ACP mode over stdin/stdout
- `--http [host:port]`: Start an HTTP server (default host: `127.0.0.1`, random port)
- `--httpPassword <user:password>`: Basic auth for the web UI
- `--httpBearer <user:bearer>`: Bearer token auth for the web UI
- `-p`: Shutdown when the initial prompt is done

### Examples

```bash
# Interactive mode (default)
tr-coder

# Run against a specific directory
tr-coder --projectDirectory ./my-app

# Start with a specific agent
tr-coder --agent leader

# Run a one-shot prompt and exit
tr-coder -p "Fix the bug in app.ts"

# Start with a prompt using the team leader agent
tr-coder --agent leader "Create a new React component"

# Start HTTP server with web UI
tr-coder --http 127.0.0.1:3000

# ACP mode (stdin/stdout)
tr-coder --acp --projectDirectory ./my-app

# Headless mode
tr-coder --ui none
```

## Architecture

TokenRing Coder is built as a modular TypeScript monorepo with 46 specialized packages:

### Core Foundation (3 packages)
- **@tokenring-ai/app**: Base application framework with service management and plugin architecture
- **@tokenring-ai/agent**: Central orchestrator for AI agents with tools, commands, and state persistence
- **@tokenring-ai/utility**: Shared utilities (cache, logging, shell escape) used across packages

### AI and Language Models (2 packages)
- **@tokenring-ai/ai-client**: Unified AI client for chat/embeddings/images via Vercel AI SDK
- **@tokenring-ai/chat**: AI chat client with model configuration, tool management, and message history

### Storage and Database (6 packages)
- **@tokenring-ai/database**: Abstract database layer with resource management and SQL execution
- **@tokenring-ai/mysql**: MySQL integration with connection pooling and schema inspection
- **@tokenring-ai/drizzle-storage**: Multi-database storage using Drizzle ORM (SQLite, MySQL, PostgreSQL)
- **@tokenring-ai/checkpoint**: Checkpoint service for agent state persistence
- **@tokenring-ai/queue**: Task queuing with checkpoint preservation for sequential processing
- **@tokenring-ai/memory**: Agent memory management and attention storage

### Development Tools (8 packages)
- **@tokenring-ai/testing**: Agent testing framework with auto-repair hooks and shell command resources
- **@tokenring-ai/git**: Git operations with auto-commit functionality
- **@tokenring-ai/javascript**: JavaScript development tools including ESLint, package management, and script execution
- **@tokenring-ai/codebase**: Codebase injection into agent context via memories and resources
- **@tokenring-ai/code-watch**: AI comment-triggered file modification detection and agent spawning
- **@tokenring-ai/file-index**: Semantic file search and indexing with Tree-sitter integration
- **@tokenring-ai/scripting**: Scripting language with variables, functions, and LLM integration
- **@tokenring-ai/tasks**: Task planning and multi-agent workflow orchestration

### Web and External Services (11 packages)
- **@tokenring-ai/websearch**: Abstract web search interface with pluggable providers
- **@tokenring-ai/serper**: Google search via Serper.dev API
- **@tokenring-ai/scraperapi**: Web scraping and SERP results via ScraperAPI
- **@tokenring-ai/chrome**: Puppeteer browser automation for web scraping and interaction
- **@tokenring-ai/aws**: AWS integration with STS/S3 clients and authentication
- **@tokenring-ai/s3**: S3 filesystem and CDN providers for cloud storage and content delivery
- **@tokenring-ai/docker**: Docker container management with sandbox provider
- **@tokenring-ai/kubernetes**: Kubernetes resource discovery and management
- **@tokenring-ai/sandbox**: Abstract sandbox interface for isolated execution
- **@tokenring-ai/mcp**: Model Context Protocol client for external server integration
- **@tokenring-ai/web-host**: Fastify-based web hosting service for static files and APIs

### Communication and Collaboration (4 packages)
- **@tokenring-ai/escalation**: Escalation service with multi-provider support and group broadcasting
- **@tokenring-ai/slack**: Slack bot integration for workspace communication
- **@tokenring-ai/telegram**: Telegram bot integration for chat and message handling
- **@tokenring-ai/feedback**: Human feedback tools for file reviews and React component previews

### Audio and Media (2 packages)
- **@tokenring-ai/audio**: Abstract audio framework for recording, playback, and speech processing
- **@tokenring-ai/linux-audio**: Linux-specific audio implementation using naudiodon3

### UI and Frontend (3 packages)
- **@tokenring-ai/cli**: REPL service with interactive prompts and command processing
- **@tokenring-ai/chat-frontend**: React-based web interface for TokenRing agents with CLI-style chat
- **@tokenring-ai/cli-ink**: Ink-based CLI implementation

### Filesystem and Storage (3 packages)
- **@tokenring-ai/filesystem**: Abstract filesystem with read/write/search operations and ignore filters
- **@tokenring-ai/local-filesystem**: Local disk filesystem implementation with file watching
- **@tokenring-ai/posix-system**: POSIX-compliant file system and terminal providers

### Thinking and Workflow (4 packages)
- **@tokenring-ai/thinking**: Advanced reasoning and planning capabilities
- **@tokenring-ai/workflow**: Workflow engine for complex task execution
- **@tokenring-ai/scheduler**: Task scheduling and automation
- **@tokenring-ai/vault**: Secure storage for sensitive data

### Research (1 package)
- **@tokenring-ai/research**: Research tools and capabilities

### Terminal (1 package)
- **@tokenring-ai/terminal**: Terminal service with session management and output collection

### RPC (1 package)
- **@tokenring-ai/rpc**: Remote procedure call infrastructure

## Configuration

Configuration is loaded from `.tokenring/coder-config.mjs` in your working directory. The file uses the same schema as the plugin config. A minimal example:

```javascript
export default {
  ai: {
    autoConfigure: true, // auto-detect providers from env vars
  },
  filesystem: {
    providers: {
      local: { type: "posix" }
    }
  }
};
```

### Default AI Models

The app tries models in this order, using the first available:

```
llamacpp:*                    Local LlamaCpp
zai:glm-5                   zAI
openrouter:openrouter/auto    OpenRouter auto-routing
openai:gpt-5-mini             OpenAI
anthropic:claude-4.5-haiku    Anthropic
google:gemini-3-flash-preview Google
xai:grok-code-fast-1          xAI
deepseek:deepseek-chat        DeepSeek
qwen:qwen3-coder-flash        Qwen
*                             Any available model
```

## Docker Usage

### Using Pre-built Image from GHCR

```bash
docker pull ghcr.io/tokenring-ai/coder:latest

# Run with your project mounted
docker run -ti --rm \
  -v ./your-project:/repo:rw \
  -e OPENAI_API_KEY \
  -e ANTHROPIC_API_KEY \
  ghcr.io/tokenring-ai/coder:latest

# Run with web interface
docker run -ti --rm \
  -p 3000:3000 \
  -v ./your-project:/repo:rw \
  -e OPENAI_API_KEY \
  ghcr.io/tokenring-ai/coder:latest \
  --http 0.0.0.0:3000
```

### Building Custom Image

```dockerfile
FROM ghcr.io/tokenring-ai/coder:latest

# Install additional dependencies
RUN apt-get update && apt-get install -y \
    portaudio19-dev \
    libpq-dev \
    mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Add custom configuration
COPY .tokenring/coder-config.mjs /root/.tokenring/coder-config.mjs

# Expose web interface
EXPOSE 3000
```

### Docker Compose Setup

```yaml
version: '3.8'
services:
  tokenring-coder:
    image: ghcr.io/tokenring-ai/coder:latest
    container_name: tokenring-coder
    ports:
      - "3000:3000"
    volumes:
      - ./your-project:/repo:rw
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    command: ["--http", "0.0.0.0:3000"]
```

## Development

### Building the Project

```bash
bun install
bun run build      # type-check
bun run test       # run tests
bun run coder      # run locally
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run build` | Build the tr-coder binary |
| `bun run coder` | Run coder with source from current directory |
| `bun run build-container` | Build Docker container |
| `bun run test` | Run all tests |
| `bun run test:watch` | Run tests in watch mode |
| `bun run test:coverage` | Run tests with coverage |

### Package Ecosystem Overview

The TokenRing Coder ecosystem consists of 46 specialized packages organized into functional categories:

#### Core Foundation (3 packages)
- **app**: Application framework and service management
- **agent**: Central orchestrator for AI agents
- **utility**: Shared utilities and helper functions

#### AI and Language Models (2 packages)
- **ai-client**: Unified AI client interface
- **chat**: AI chat configuration and tool management

#### Storage and Database (6 packages)
- **database**: Abstract database layer
- **mysql**: MySQL integration
- **drizzle-storage**: Multi-database ORM support
- **checkpoint**: Agent state persistence
- **queue**: Task queuing system
- **memory**: Memory management and attention storage

#### Development Tools (8 packages)
- **testing**: Agent testing framework
- **git**: Version control integration
- **javascript**: JavaScript tooling
- **codebase**: Codebase context injection
- **code-watch**: File modification detection
- **file-index**: Semantic file search
- **scripting**: Scripting language
- **tasks**: Workflow orchestration

#### Web and External Services (11 packages)
- **websearch**: Web search abstraction
- **serper**: Google search provider
- **scraperapi**: Web scraping service
- **chrome**: Browser automation
- **aws**: AWS cloud services
- **s3**: S3 filesystem and CDN providers
- **docker**: Container management
- **kubernetes**: K8s integration
- **sandbox**: Execution environment
- **mcp**: Protocol extensions
- **web-host**: Web hosting service

#### Communication and Collaboration (4 packages)
- **escalation**: Escalation service with communication channels
- **slack**: Slack bot integration
- **telegram**: Telegram bot integration
- **feedback**: Human feedback tools

#### Audio and Media (2 packages)
- **audio**: Audio processing framework
- **linux-audio**: Linux audio implementation

#### UI and Frontend (3 packages)
- **cli**: Command line interface
- **chat-frontend**: React web interface for chat
- **cli-ink**: Ink-based CLI implementation

#### Filesystem and Storage (3 packages)
- **filesystem**: Abstract filesystem interface
- **local-filesystem**: Local filesystem implementation
- **posix-system**: POSIX system utilities

#### Thinking and Workflow (4 packages)
- **thinking**: Advanced reasoning and planning
- **workflow**: Workflow engine for complex tasks
- **scheduler**: Task scheduling and automation
- **vault**: Secure storage

#### Research (1 package)
- **research**: Research tools and capabilities

#### Terminal (1 package)
- **terminal**: Terminal service with session management

#### RPC (1 package)
- **rpc**: Remote procedure call infrastructure

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards
4. Add tests for new functionality
5. Run `bun run biome` to format code
6. Update documentation as needed
7. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use consistent naming conventions
- Write comprehensive tests
- Document all public APIs
- Respect semantic versioning
- Keep packages focused and modular

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Ready to supercharge your coding workflow with AI? Explore the complete 46-package ecosystem and transform your development experience!**
