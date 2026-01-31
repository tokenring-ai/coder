# TokenRing Coder

**An AI-powered coding assistant with a comprehensive 44-package ecosystem for local development**

TokenRing Coder is an interactive AI assistant designed to help developers with coding tasks like editing, refactoring, testing, and git operations. It runs locally on your machine and supports multiple AI providers while keeping your code secure. The modular ecosystem includes 44 specialized packages covering everything from audio processing to cloud services, communication platforms, and advanced development tools.

## Features

### AI and Language Model Support
- **Multiple AI Providers**: OpenAI, Anthropic, Google, Groq, Cerebras, DeepSeek, and more
- **Unified AI Client**: Chat, embeddings, and images via Vercel AI SDK
- **Model Registry**: Dynamic model selection and configuration
- **Agent Orchestration**: Multi-agent workflows with specialized roles

### Communication and Collaboration
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
- **AWS S3 Integration**: Cloud storage and content delivery network
- **Checkpoint Persistence**: Agent state storage across sessions
- **Task Queuing**: Sequential processing with checkpoint preservation

### Cloud and Infrastructure
- **AWS Integration**: STS/S3 clients with authentication
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
- **Memory Management**: Short-term memory and attention storage
- **Workflow Engine**: Advanced task planning and execution

### Protocol Extensions
- **MCP Integration**: Model Context Protocol client for external server connectivity
- **Web Hosting**: Fastify-based service with pluggable resources
- **Frontend Interface**: Complete React frontend with CLI-style interaction

### Specialized Agents
TokenRing Coder includes 23 specialized AI agents organized into two categories:

**Interactive Agents (2)**
- **Coding Agent** - A general code assistant that directly executes development tasks
- **Team Leader** - Orchestrates full-stack projects, coordinates specialists, manages workflow

**Background Specialists (21)**
- **Product Manager** - Creates PRDs, defines user stories, plans feature roadmaps
- **Product Design Engineer** - Product enhancement and comprehensive PRD creation
- **System Architect** - Designs system architectures and selects technology stacks
- **Full Stack Developer** - Implements complete features across frontend and backend
- **Frontend Designer** - Creates React/Vue components, responsive layouts, state management
- **Backend Designer** - Implements server-side logic, business rules, data processing
- **API Designer** - Designs REST/GraphQL APIs, creates OpenAPI specifications
- **Database Designer** - Designs schemas, implements migrations, optimizes queries
- **Business Logic Engineer** - Implements workflows, rules engines, automation systems
- **Data Engineer** - Creates ETL pipelines, data migrations, processing workflows
- **Integration Engineer** - Implements third-party integrations, APIs, webhooks
- **Auth Designer** - Designs authentication/authorization systems, OAuth/OIDC
- **Test Engineer** - Creates unit/integration/E2E tests, test automation
- **Code Quality Engineer** - Code reviews, refactoring, standards enforcement
- **Security Review** - Security assessments, vulnerability remediation, OWASP compliance
- **Performance Engineer** - Performance optimization, caching, monitoring, scalability
- **DevOps Engineer** - CI/CD pipelines, Docker configs, infrastructure setup
- **UI/UX Designer** - Creates wireframes, design systems, user flows
- **Documentation Engineer** - Technical documentation, API docs, user guides
- **Accessibility Engineer** - Ensures accessibility compliance and WCAG standards
- **SEO Engineer** - Search engine optimization, meta tags, and search visibility

## Quick Start

### Option 1: Run with bun (Recommended)

```bash
# Clone and setup
git clone https://github.com/tokenring-ai/monorepo.git
cd monorepo
bun install

# Initialize your project
bun run coder --source ./your-project --initialize

# Set up API keys
export OPENAI_API_KEY="your-key-here"
export ANTHROPIC_API_KEY="your-key-here"

# Start coding with AI
bun run coder --source ./your-project
```

### Option 2: Run with npx

```bash
# Initialize your project
npx @tokenring-ai/coder --source ./your-project --initialize

# Set up API keys
export OPENAI_API_KEY="your-key-here"
export ANTHROPIC_API_KEY="your-key-here"

# Start coding with AI
npx @tokenring-ai/coder --source ./your-project
```

### Option 3: Run with Docker

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

### Option 4: Web Interface

```bash
# Start with web frontend
bun run coder --web

# Access at http://localhost:3000
# Features real-time agent communication via WebSocket
```

### Option 5: Custom UI

```bash
# Run with custom UI (inquirer, ink, or none)
bun run coder --ui inquirer  # Interactive CLI with inquirer
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

## Usage Examples

### Basic Chat

```
> Help me refactor this function to be more readable
> Add error handling to the user authentication code
> Write unit tests for the payment processing module
```

### Advanced Multi-Agent Workflows

```
> @teamLeader Create a new user dashboard feature with React frontend and Node.js backend
> @frontendDesign Implement responsive components with state management
> @backendDesign Create REST API endpoints with authentication
> @testEngineer Add comprehensive tests for the new feature
> @devopsEngineer Set up CI/CD pipeline and deployment configuration
```

### Communication Platform Integration

```
> Post this update to our Slack channel #development
> Send a notification to Telegram group about the deployment
> Ask for human feedback on the new UI design
```

### Advanced Scripting and Automation

```
> script
  var = projectVersion = "1.2.0"
  func = updateVersion() {
    replaceInFile("package.json", /"version": "[^"]+"/, `"version": "${var}"`)
    commit("Update version to ${var}")
  }
  call updateVersion()
> end

> foreach file in "src/**/*.ts" do
  eslint --fix ${file}
  test ${file}
> end
```

### Database and Cloud Operations

```
> Connect to MySQL database and create users table
> Upload static assets to S3 CDN
> Deploy container to Kubernetes cluster
> Run backup script and store checkpoint in database
```

### Audio and Media Processing

```
> Record audio meeting notes and transcribe to text
> Convert documentation to speech for accessibility
> Process audio files for podcast production
```

## Command Reference

TokenRing Coder provides 47 commands organized into 17 categories:

### AI and Chat Commands
| Command | Description |
|---------|-------------|
| `/tools` | List, enable, disable, or set enabled tools |
| `/model` | Set or show the target model for chat |
| `/compact` | Compact conversation context by summarizing |
| `/chat` | Send a message to the chat service |
| `/ai` | Update AI configuration settings |

### Agent Control Commands
| Command | Description |
|---------|-------------|
| `/work` | Runs the agent's work handler |
| `/settings` | Show current chat settings |
| `/reset` | Clear chat state and/or memory |
| `/hooks` | List or manage registered hooks |
| `/debug` | Toggle debug logging |

### System Commands
| Command | Description |
|---------|-------------|
| `/help` | Show help message |
| `/exit` | Exit the current agent |
| `/edit` | Open editor to write a prompt |
| `/multi` | Opens an editor for multiline input |
| `/quit` | Quit the current agent |

### Scripting Commands
| Command | Description |
|---------|-------------|
| `/var` | Define or assign variables |
| `/vars` | List all variables |
| `/list` | Define or assign lists |
| `/lists` | List all lists |
| `/if` | Conditional execution |
| `/for` | Iterate over lists |
| `/while` | Execute commands while condition is truthy |
| `/func` | Define functions |
| `/funcs` | List all functions |
| `/call` | Call a function |
| `/echo` | Display text or variable value |
| `/sleep` | Sleep for specified seconds |
| `/prompt` | Prompt user for input |
| `/confirm` | Prompt user for yes/no confirmation |
| `/script` | Run predefined chat command scripts |

### Git Operations
| Command | Description |
|---------|-------------|
| `/git` | Git operations (commit, rollback, branch) |

### File Operations
| Command | Description |
|---------|-------------|
| `/file` | Manage files in the chat session |

### Search and Discovery
| Command | Description |
|---------|-------------|
| `/search` | Search for text across files in the project |

### Testing Commands
| Command | Description |
|---------|-------------|
| `/test` | Run all or specific tests |
| `/repair` | Run tests and automatically fix failing ones |

### Queue Management
| Command | Description |
|---------|-------------|
| `/queue` | Manage a queue of chat prompts |

### State Management
| Command | Description |
|---------|-------------|
| `/memory` | Manage memory items |
| `/checkpoint` | Create or restore conversation checkpoints |
| `/history` | Browse agent checkpoints |

### Voice and Audio
| Command | Description |
|---------|-------------|
| `/voice` | Voice operations (record, transcribe, speak, playback) |

### Development
| Command | Description |
|---------|-------------|
| `/sandbox` | Sandbox container operations |

### External Services
| Command | Description |
|---------|-------------|
| `/websearch` | Web search operations |

### Workflow Control
| Command | Description |
|---------|-------------|
| `/tasks` | Manage task list |

### Data Processing
| Command | Description |
|---------|-------------|
| `/iterable` | Manage named iterables |
| `/foreach` | Run a prompt on each item in an iterable |

### Code Analysis
| Command | Description |
|---------|-------------|
| `/codebase` | Manage codebase resources in the chat session |

### Cloud Services
| Command | Description |
|---------|-------------|
| `/aws` | AWS commands for authentication and status |

## Architecture

TokenRing Coder is built as a modular TypeScript monorepo with 44 specialized packages:

### Core Foundation (3 packages)
- **@tokenring-ai/app**: Base application framework with service management and plugin architecture
- **@tokenring-ai/agent**: Central orchestrator for AI agents with tools, commands, and state persistence
- **@tokenring-ai/utility**: Shared utilities (cache, logging, shell escape) used across packages

### AI and Language Models (2 packages)
- **@tokenring-ai/ai-client**: Unified AI client for chat/embeddings/images via Vercel AI SDK
- **@tokenring-ai/chat**: AI chat client with model configuration, tool management, and message history

### Storage and Database (7 packages)
- **@tokenring-ai/database**: Abstract database layer with resource management and SQL execution
- **@tokenring-ai/mysql**: MySQL integration with connection pooling and schema inspection
- **@tokenring-ai/drizzle-storage**: Multi-database storage using Drizzle ORM (SQLite, MySQL, PostgreSQL)
- **@tokenring-ai/checkpoint**: Checkpoint service for agent state persistence
- **@tokenring-ai/queue**: Task queuing with checkpoint preservation for sequential processing
- **@tokenring-ai/s3**: AWS S3 filesystem and CDN implementation
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

### Web and External Services (9 packages)
- **@tokenring-ai/websearch**: Abstract web search interface with pluggable providers
- **@tokenring-ai/serper**: Google search via Serper.dev API
- **@tokenring-ai/scraperapi**: Web scraping and SERP results via ScraperAPI
- **@tokenring-ai/chrome**: Puppeteer browser automation for web scraping and interaction
- **@tokenring-ai/aws**: AWS integration with STS/S3 clients and authentication
- **@tokenring-ai/docker**: Docker container management with sandbox provider
- **@tokenring-ai/kubernetes**: Kubernetes resource discovery and management
- **@tokenring-ai/sandbox**: Abstract sandbox interface for isolated execution
- **@tokenring-ai/mcp**: Model Context Protocol client for external server integration

### Communication and Collaboration (3 packages)
- **@tokenring-ai/slack**: Slack bot integration for workspace communication
- **@tokenring-ai/telegram**: Telegram bot integration for chat and message handling
- **@tokenring-ai/feedback**: Human feedback tools for file reviews and React component previews

### Audio and Media (2 packages)
- **@tokenring-ai/audio**: Abstract audio framework for recording, playback, and speech processing
- **@tokenring-ai/linux-audio**: Linux-specific audio implementation using naudiodon3

### UI and Frontend (4 packages)
- **@tokenring-ai/cli**: REPL service with interactive prompts and command processing
- **@tokenring-ai/cli-ink**: Ink-based CLI implementation
- **@tokenring-ai/web-host**: Fastify-based web hosting service for static files and APIs
- **@tokenring-ai/chat-frontend**: React frontend for chat interface

### Filesystem and Storage (2 packages)
- **@tokenring-ai/filesystem**: Abstract filesystem with read/write/search operations and ignore filters
- **@tokenring-ai/local-filesystem**: Local disk filesystem implementation with file watching

### Thinking and Workflow (2 packages)
- **@tokenring-ai/thinking**: Advanced reasoning and planning capabilities
- **@tokenring-ai/workflow**: Workflow engine for complex task execution

### Research and Vault (1 package)
- **@tokenring-ai/research**: Research tools and capabilities
- **@tokenring-ai/vault**: Secure storage for sensitive data

### Scheduler (1 package)
- **@tokenring-ai/scheduler**: Task scheduling and automation

### RPC (1 package)
- **@tokenring-ai/rpc**: Remote procedure call infrastructure

## Configuration

Configuration is stored in `.tokenring/coder-config.mjs` in your project:

```javascript
export default {
  // Default settings
  defaults: {
    agent: "interactiveCodeAgent",
    model: "openai:gpt-4o",
    webHost: {
      port: 3000,
      enableWebSocket: true
    },
    ui: "inquirer" // or "ink" or "none"
  },

  // AI model configurations
  models: {
    openai: {
      displayName: "OpenAI",
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.openai.com/v1"
    },
    anthropic: {
      displayName: "Anthropic",
      apiKey: process.env.ANTHROPIC_API_KEY,
      baseURL: "https://api.anthropic.com"
    },
    groq: {
      displayName: "Groq",
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1"
    }
  },

  // Database connections
  storage: {
    type: "drizzle",
    providers: {
      sqlite: {
        file: "./data/tokenring.db"
      },
      mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      }
    }
  },

  // Cloud services
  cloud: {
    aws: {
      region: "us-east-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    s3: {
      bucket: "my-app-assets",
      cdnDomain: "cdn.myapp.com"
    }
  },

  // Communication platforms
  communication: {
    slack: {
      botToken: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET
    },
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN
    }
  },

  // Audio settings
  audio: {
    provider: "linux",
    sampleRate: 44100,
    channels: 2
  },

  // Development tools
  tools: {
    eslint: {
      config: ".eslintrc.js",
      autoFix: true
    },
    testing: {
      framework: "vitest",
      coverage: true
    }
  },

  // Agent configuration
  agents: {
    interactiveCodeAgent: {
      name: "Coding Agent",
      description: "A general code assistant that directly executes development tasks"
    },
    teamLeader: {
      name: "Multi-Agent Project Planner",
      description: "Use this agent to orchestrate full-stack development projects"
    }
  }
};
```

## Docker Usage

### Using Pre-built Image from GHCR

```bash
# Pull latest image
docker pull ghcr.io/tokenring-ai/tokenring-coder:latest

# Run with your project mounted
docker run -ti --rm \
  -v ./your-project:/repo:rw \
  -v ~/.tokenring:/root/.tokenring:ro \
  -e OPENAI_API_KEY \
  -e ANTHROPIC_API_KEY \
  -e AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY \
  -e SLACK_BOT_TOKEN \
  -e TELEGRAM_BOT_TOKEN \
  ghcr.io/tokenring-ai/tokenring-coder:latest \
  --source /repo

# Run with web interface
docker run -ti --rm \
  -p 3000:3000 \
  -v ./your-project:/repo:rw \
  ghcr.io/tokenring-ai/tokenring-coder:latest \
  --web
```

### Building Custom Image

```dockerfile
FROM ghcr.io/tokenring-ai/tokenring-coder:latest

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
    image: ghcr.io/tokenring-ai/tokenring-coder:latest
    container_name: tokenring-coder
    ports:
      - "3000:3000"
    volumes:
      - ./your-project:/repo:rw
      - ~/.tokenring:/root/.tokenring:ro
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN}
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
    networks:
      - tokenring-network

  # Optional: MySQL database
  mysql:
    image: mysql:8.0
    container_name: tokenring-mysql
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=tokenring
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - tokenring-network

  # Optional: Redis for caching
  redis:
    image: redis:7-alpine
    container_name: tokenring-redis
    volumes:
      - redis-data:/data
    networks:
      - tokenring-network

volumes:
  mysql-data:
  redis-data:

networks:
  tokenring-network:
    driver: bridge
```

## Development

### Building the Project

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run tests
bun run test

# Format code
bun run biome

# Lint code
bun run lint

# Type check
bun run type-check

# Start development server
bun run coder

# Start web interface
bun run coder --web

# Run specific package tests
cd pkg/database && bun test
cd pkg/ai-client && bun test
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

## Package Ecosystem Overview

The TokenRing Coder ecosystem consists of 44 specialized packages organized into functional categories:

### Core Foundation (3 packages)
- **app**: Application framework and service management
- **agent**: Central orchestrator for AI agents
- **utility**: Shared utilities and helper functions

### AI and Language Models (2 packages)
- **ai-client**: Unified AI client interface
- **chat**: AI chat configuration and tool management

### Storage and Database (7 packages)
- **database**: Abstract database layer
- **mysql**: MySQL integration
- **drizzle-storage**: Multi-database ORM support
- **checkpoint**: Agent state persistence
- **queue**: Task queuing system
- **s3**: AWS S3 integration
- **memory**: Memory management and attention storage

### Development Tools (8 packages)
- **testing**: Agent testing framework
- **git**: Version control integration
- **javascript**: JavaScript tooling
- **codebase**: Codebase context injection
- **code-watch**: File modification detection
- **file-index**: Semantic file search
- **scripting**: Scripting language
- **tasks**: Workflow orchestration

### Web and External Services (9 packages)
- **websearch**: Web search abstraction
- **serper**: Google search provider
- **scraperapi**: Web scraping service
- **chrome**: Browser automation
- **aws**: AWS cloud services
- **docker**: Container management
- **kubernetes**: K8s integration
- **sandbox**: Execution environment
- **mcp**: Protocol extensions

### Communication and Collaboration (3 packages)
- **slack**: Slack bot integration
- **telegram**: Telegram bot integration
- **feedback**: Human feedback tools

### Audio and Media (2 packages)
- **audio**: Audio processing framework
- **linux-audio**: Linux audio implementation

### UI and Frontend (4 packages)
- **cli**: Command line interface
- **cli-ink**: Ink-based CLI implementation
- **web-host**: Web server foundation
- **chat-frontend**: Chat interface frontend

### Filesystem and Storage (2 packages)
- **filesystem**: Abstract filesystem interface
- **local-filesystem**: Local filesystem implementation

### Thinking and Workflow (2 packages)
- **thinking**: Advanced reasoning and planning capabilities
- **workflow**: Workflow engine for complex task execution

### Research and Vault (1 package)
- **research**: Research tools and capabilities
- **vault**: Secure storage for sensitive data

### Scheduler (1 package)
- **scheduler**: Task scheduling and automation

### RPC (1 package)
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

**Ready to supercharge your coding workflow with AI? Explore the complete 44-package ecosystem and transform your development experience!**