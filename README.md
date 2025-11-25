# TokenRing Coder

**An AI-powered coding assistant with a comprehensive 45-package ecosystem for local development**

TokenRing Coder is an interactive AI assistant designed to help developers with coding tasks like editing, refactoring, testing, and git operations. It runs locally on your machine and supports multiple AI providers while keeping your code secure. The modular ecosystem includes 45 specialized packages covering everything from audio processing to cloud services, communication platforms, and advanced development tools.

## ✨ Features

### 🤖 AI & Language Model Support
- **Multiple AI Providers**: OpenAI, Anthropic, Google, Groq, Cerebras, DeepSeek, and more
- **Unified AI Client**: Chat, embeddings, and images via Vercel AI SDK
- **Model Registry**: Dynamic model selection and configuration
- **Agent Orchestration**: Multi-agent workflows with specialized roles

### 💬 Communication & Collaboration
- **Slack Integration**: Bot functionality and workspace management
- **Telegram Integration**: Chat management and message handling
- **Human Feedback Tools**: File reviews, React component previews, and interactive Q&A
- **Real-time Communication**: WebSocket API for browser clients

### 🎵 Audio & Media Capabilities
- **Audio Framework**: Recording, playback, transcription, and text-to-speech
- **Linux Audio**: Platform-specific implementation using naudiodon2
- **Native Audio I/O**: PortAudio bindings for high-performance audio operations

### 🌐 Web & External Services
- **Web Search**: Multiple providers (Serper.dev, ScraperAPI, Chrome automation)
- **Wikipedia Integration**: Article search and content retrieval
- **Browser Automation**: Puppeteer scripts for web interaction
- **Web Scraping**: SERP results and page content fetching

### 🗄️ Database & Storage
- **Multi-Database Support**: MySQL, SQLite, PostgreSQL via Drizzle ORM
- **Database Abstraction**: SQL execution, schema inspection, and resource management
- **AWS S3 Integration**: Cloud storage and content delivery network
- **Checkpoint Persistence**: Agent state storage across sessions
- **Task Queuing**: Sequential processing with checkpoint preservation

### ☁️ Cloud & Infrastructure
- **AWS Integration**: STS/S3 clients with authentication
- **Docker Support**: Container management and sandbox execution
- **Kubernetes**: Resource discovery and management across namespaces
- **Sandbox Environment**: Isolated execution for security

### 🔧 Advanced Development Tools
- **Code Intelligence**: Semantic file indexing with Tree-sitter integration
- **Code Watch**: AI comment-triggered modification detection
- **JavaScript Tooling**: ESLint auto-fix, package management, script execution
- **Git Integration**: Commits, rollbacks, branch management with auto-commit
- **Testing Framework**: Agent testing with auto-repair hooks
- **File System**: Abstract filesystem with ignore patterns and dirty tracking

### 🚀 Workflow Automation
- **Scripting Language**: Variables, functions, LLM integration, and command sequences
- **Task Orchestration**: Multi-step workflows with user approval
- **Batch Processing**: Named iterables system with /foreach command
- **Memory Management**: Short-term memory and attention storage

### 🌍 Protocol Extensions
- **MCP Integration**: Model Context Protocol client for external server connectivity
- **Web Hosting**: Fastify-based service with pluggable resources
- **Frontend Interface**: Complete React frontend with CLI-style interaction

### 🎯 Specialized Agents
- **Interactive Agent**: Direct development assistance
- **Team Leadership**: Full-stack project orchestration
- **Development Specialists**: Frontend, backend, API, database design
- **Quality Assurance**: Testing, code review, security assessment
- **Infrastructure**: DevOps, performance, architecture design

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
git clone https://github.com/tokenring-ai/coder.git tokenring-coder
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

### Option 4: Web Interface

```bash
# Start with web frontend
bun run web

# Access at http://localhost:3000
# Features real-time agent communication via WebSocket
```

## 💡 Usage Examples

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

TokenRing Coder is built as a modular TypeScript monorepo with 45 specialized packages:

### Core Foundation
- **@tokenring-ai/app**: Base application framework with service management and plugin architecture
- **@tokenring-ai/agent**: Central orchestrator for AI agents with tools, commands, and state persistence
- **@tokenring-ai/utility**: Shared utilities (cache, logging, shell escape) used across packages

### AI & Language Models
- **@tokenring-ai/ai-client**: Unified AI client for chat/embeddings/images via Vercel AI SDK
- **@tokenring-ai/chat**: AI chat client with model configuration, tool management, and message history

### Storage & Database
- **@tokenring-ai/database**: Abstract database layer with resource management and SQL execution
- **@tokenring-ai/mysql**: MySQL integration with connection pooling and schema inspection
- **@tokenring-ai/drizzle-storage**: Multi-database storage using Drizzle ORM (SQLite, MySQL, PostgreSQL)
- **@tokenring-ai/checkpoint**: Checkpoint service for agent state persistence
- **@tokenring-ai/queue**: Task queuing with checkpoint preservation for sequential processing
- **@tokenring-ai/s3**: AWS S3 filesystem and CDN implementation
- **@tokenring-ai/cdn**: Abstract CDN service for content delivery networks

### Development Tools
- **@tokenring-ai/testing**: Agent testing framework with auto-repair hooks and shell command resources
- **@tokenring-ai/git**: Git operations with auto-commit functionality after tests
- **@tokenring-ai/javascript**: JavaScript development tools including ESLint, package management, and script execution
- **@tokenring-ai/codebase**: Codebase injection into agent context via memories and resources
- **@tokenring-ai/code-watch**: AI comment-triggered file modification detection and agent spawning
- **@tokenring-ai/file-index**: Semantic file search and indexing with Tree-sitter integration
- **@tokenring-ai/iterables**: Named iterables system for batch processing with /foreach command
- **@tokenring-ai/scripting**: Scripting language with variables, functions, and LLM integration
- **@tokenring-ai/tasks**: Task planning and multi-agent workflow orchestration

### Web & External Services
- **@tokenring-ai/websearch**: Abstract web search interface with pluggable providers
- **@tokenring-ai/serper**: Google search via Serper.dev API
- **@tokenring-ai/scraperapi**: Web scraping and SERP results via ScraperAPI
- **@tokenring-ai/chrome**: Puppeteer browser automation for web scraping and interaction
- **@tokenring-ai/wikipedia**: Wikipedia API integration for article search and content retrieval
- **@tokenring-ai/aws**: AWS integration with STS/S3 clients and authentication
- **@tokenring-ai/docker**: Docker container management with sandbox provider
- **@tokenring-ai/kubernetes**: Kubernetes resource discovery and management
- **@tokenring-ai/sandbox**: Abstract sandbox interface for isolated execution
- **@tokenring-ai/mcp**: Model Context Protocol client for external server integration

### Communication & Collaboration
- **@tokenring-ai/slack**: Slack bot integration for workspace communication
- **@tokenring-ai/telegram**: Telegram bot integration for chat and message handling
- **@tokenring-ai/feedback**: Human feedback tools for file reviews and React component previews

### Audio & Media
- **@tokenring-ai/audio**: Abstract audio framework for recording, playback, and speech processing
- **@tokenring-ai/linux-audio**: Linux-specific audio implementation using naudiodon2
- **@tokenring-ai/naudiodon3**: Native PortAudio bindings for audio I/O operations

### UI & Frontend
- **@tokenring-ai/cli**: REPL service with interactive prompts and command processing
- **@tokenring-ai/inquirer-command-prompt**: Command prompt with history and auto-completion
- **@tokenring-ai/inquirer-tree-selector**: Tree-based selection interface for hierarchical navigation
- **@tokenring-ai/web-host**: Fastify-based web hosting service for static files and APIs
- **@tokenring-ai/web-frontend**: Complete React frontend with CLI-style interface and agent management
- **@tokenring-ai/agent-api**: WebSocket API for real-time agent communication and browser client integration

### Filesystem & Storage
- **@tokenring-ai/filesystem**: Abstract filesystem with read/write/search operations and ignore filters
- **@tokenring-ai/local-filesystem**: Local disk filesystem implementation with file watching

## 🔄 Advanced Workflows

### Multi-Agent Task Orchestration

The `@tokenring-ai/tasks` package enables complex multi-agent workflows:

```typescript
const taskService = new TaskService(app);
await taskService.executeTask({
  description: "Implement e-commerce checkout system",
  steps: [
    { agent: "systemArchitect", action: "design architecture" },
    { agent: "backendDesign", action: "create API endpoints" },
    { agent: "frontendDesign", action: "build checkout UI" },
    { agent: "testEngineer", action: "write integration tests" },
    { agent: "devopsEngineer", action: "setup deployment pipeline" }
  ]
});
```

### Advanced Scripting and Automation

The `@tokenring-ai/scripting` package provides a powerful scripting language:

```typescript
// Variables and functions
> script
  var = apiUrl = "https://api.example.com"
  var = timeout = 5000
  func = fetchData(endpoint) {
    return fetch(${apiUrl}/${endpoint}, { timeout: ${timeout} })
  }
  
  // Conditional logic
  if (user.role === "admin") {
    grantAccess()
  }
  
  // Loops
  for (let i = 0; i < 10; i++) {
    log("Processing item ${i}")
  }
> end
```

### Database Integration and Migrations

Multi-database support with Drizzle ORM:

```typescript
// SQLite for development
const sqliteStorage = createSQLiteStorage('./dev.db')

// MySQL for production
const mysqlStorage = createMySQLStorage({
  host: 'localhost',
  user: 'admin',
  password: 'password',
  database: 'tokenring'
})

// PostgreSQL for cloud
const postgresStorage = createPostgresStorage({
  connectionString: 'postgresql://user:pass@host:port/db'
})
```

### Cloud and Infrastructure Management

Comprehensive cloud integration:

```typescript
// AWS S3 operations
await s3.uploadFile('build/', 'dist/', 'my-app-v1.0.0.zip')
await s3.createCDNDistribution('cdn.example.com')

// Docker container management
await docker.buildImage('Dockerfile', 'my-app:latest')
await docker.runContainer('my-app:latest', { port: 3000 })

// Kubernetes deployment
await k8s.deploy('deployment.yaml', 'production')
await k8s.scale('my-app', 3)
```

### Communication Platform Integration

Seamless team communication:

```typescript
// Slack notifications
await slack.postMessage('#dev-team', 'Deployment completed successfully')

// Telegram alerts
await telegram.sendGroup('dev-alerts', 'Critical issue detected in production')

// Human feedback collection
const feedback = await feedback.getFileReview('design-spec.pdf')
await feedback.previewReactComponent(<Dashboard />)
```

## ⚙️ Configuration

Configuration is stored in `.tokenring/coder-config.mjs` in your project:

```javascript
export default {
  // Default settings
  defaults: {
    agent: "teamLeader",
    model: "gpt-4o",
    webHost: {
      port: 3000,
      enableWebSocket: true
    }
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
    provider: "linux-audio",
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

## 🛠️ Development

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
bun run web

# Run specific package tests
cd pkg/database && bun test
cd pkg/ai-client && bun test
```

### Adding New Packages

```bash
# Create new package directory
mkdir -p pkg/my-new-package

# Initialize package structure
cd pkg/my-new-package
cat > package.json << EOF
{
  "name": "@tokenring-ai/my-new-package",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    "./*": "./*.ts"
  },
  "dependencies": {
    "@tokenring-ai/agent": "^0.1.0",
    "@tokenring-ai/utility": "^0.1.0"
  }
}
EOF

# Create main module
cat > index.ts << EOF
import { TokenRingPackage } from '@tokenring-ai/agent';

export const myNewPackage = new TokenRingPackage({
  name: 'my-new-package',
  version: '0.1.0',
  description: 'My new TokenRing package',
  tools: [],
  commands: [],
  services: []
});

export default myNewPackage;
EOF

# Create README
cat > README.md << EOF
# @tokenring-ai/my-new-package

Description of my new package.

## Installation

\`\`\`bash
bun add @tokenring-ai/my-new-package
\`\`\`

## Usage

\`\`\`typescript
import { myNewPackage } from '@tokenring-ai/my-new-package';
\`\`\`
EOF
```

### Development Workflow

1. **Setup Environment**: Install dependencies and configure environment variables
2. **Choose Development Mode**: CLI, web interface, or custom application
3. **Configure Agents**: Select appropriate agents for your workflow
4. **Use Development Tools**: Leverage code intelligence, testing, and debugging
5. **Integrate Services**: Connect databases, cloud services, and communication platforms
6. **Deploy and Monitor**: Use DevOps tools for deployment and monitoring

## 📦 Package Ecosystem Overview

The TokenRing Coder ecosystem consists of 45 specialized packages organized into functional categories:

### Core Foundation (3 packages)
- **app**: Application framework and service management
- **agent**: Central orchestrator for AI agents
- **utility**: Shared utilities and helper functions

### AI & Language Models (2 packages)
- **ai-client**: Unified AI client interface
- **chat**: AI chat configuration and tool management

### Storage & Database (7 packages)
- **database**: Abstract database layer
- **mysql**: MySQL integration
- **drizzle-storage**: Multi-database ORM support
- **checkpoint**: Agent state persistence
- **queue**: Task queuing system
- **s3**: AWS S3 integration
- **cdn**: Content delivery network abstraction

### Development Tools (9 packages)
- **testing**: Agent testing framework
- **git**: Version control integration
- **javascript**: JavaScript tooling
- **codebase**: Codebase context injection
- **code-watch**: File modification detection
- **file-index**: Semantic file search
- **iterables**: Batch processing system
- **scripting**: Scripting language
- **tasks**: Workflow orchestration

### Web & External Services (10 packages)
- **websearch**: Web search abstraction
- **serper**: Google search provider
- **scraperapi**: Web scraping service
- **chrome**: Browser automation
- **wikipedia**: Wikipedia integration
- **aws**: AWS cloud services
- **docker**: Container management
- **kubernetes**: K8s integration
- **sandbox**: Execution environment
- **mcp**: Protocol extensions

### Communication & Collaboration (3 packages)
- **slack**: Slack bot integration
- **telegram**: Telegram bot integration
- **feedback**: Human feedback tools

### Audio & Media (3 packages)
- **audio**: Audio processing framework
- **linux-audio**: Linux audio implementation
- **naudiodon3**: Native audio bindings

### UI & Frontend (6 packages)
- **cli**: Command line interface
- **inquirer-command-prompt**: Interactive prompts
- **inquirer-tree-selector**: Tree selection interface
- **web-host**: Web server foundation
- **web-frontend**: React frontend
- **agent-api**: WebSocket API

### Filesystem & Storage (2 packages)
- **filesystem**: Abstract filesystem interface
- **local-filesystem**: Local filesystem implementation

## 🤝 Contributing

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

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- **Documentation**: Comprehensive guides in the `docs/` directory
- **Package READMEs**: Detailed documentation for each package in `pkg/*/README.md`
- **Issues**: Report bugs and request features on GitHub
- **Community**: Join discussions in the repository discussions section
- **Examples**: Sample implementations in the `examples/` directory

## 🔗 Related Resources

- [PACKAGES.md](PACKAGES.md) - Complete package index and architecture documentation
- [docs/](docs/) - Detailed guides and tutorials
- [examples/](examples/) - Sample implementations and use cases
- [pkg/](pkg/) - Individual package documentation

---

**Ready to supercharge your coding workflow with AI? Explore the complete 45-package ecosystem and transform your development experience!** 🚀

*Built with ❤️ by the TokenRing AI team*