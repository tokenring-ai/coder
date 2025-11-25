---
description: TokenRing Coder - AI-powered coding assistant with modular architecture
alwaysApply: true
---

# TokenRing Coder Information

## Summary

TokenRing Coder is an advanced AI-powered coding assistant built on a modular monorepo architecture. It provides a conversational interface where developers can interact with their codebase through specialized AI agents, execute development tasks, and leverage a comprehensive ecosystem of tools and integrations.

## Structure

This is a **45-package monorepo** organized with the following structure:

- **src/**: Main application source code and entry point
  - `tr-coder.ts`: Main application entry point
  - `agents/`: Specialized AI agent implementations
    - `background/`: Domain-specific agents (team leader, system architect, etc.)
    - `interactive/`: Interactive agents for direct code manipulation
- **pkg/**: 45 modular packages organized as a monorepo workspace
  - Core packages: `@tokenring-ai/app`, `@tokenring-ai/agent`, `@tokenring-ai/ai-client`
  - Tooling packages: `@tokenring-ai/filesystem`, `@tokenring-ai/git`, `@tokenring-ai/codebase`
  - Integration packages: `@tokenring-ai/slack`, `@tokenring-ai/telegram`, `@tokenring-ai/web-frontend`
  - Service packages: `@tokenring-ai/chat`, `@tokenring-ai/database`, `@tokenring-ai/memory`
  - Specialized packages: `@tokenring-ai/docker`, `@tokenring-ai/kubernetes`, `@tokenring-ai/aws`
- **docker/**: Docker configuration for containerized deployment
- **.github/**: GitHub workflows and CI/CD configuration
- **.tokenring/**: Configuration directory for the application

## Language & Runtime

**Language**: TypeScript/JavaScript
**Version**: ES2022 target
**Build System**: TypeScript compiler (tsc)
**Package Manager**: Bun
**Architecture**: Monorepo with workspace support

## Dependencies

### Internal Packages (45 total)
All functionality is organized into internal `@tokenring-ai/*` packages:

**Core Platform**:
- `@tokenring-ai/app`: Core application framework and plugin system
- `@tokenring-ai/agent`: Agent management and lifecycle services
- `@tokenring-ai/ai-client`: AI client integration
- `@tokenring-ai/chat`: Chat service and communication

**Development Tools**:
- `@tokenring-ai/filesystem`: File system operations
- `@tokenring-ai/git`: Git integration
- `@tokenring-ai/codebase`: Codebase analysis and manipulation
- `@tokenring-ai/testing`: Testing framework integration
- `@tokenring-ai/code-watch`: File watching and change detection

**Communication & Integration**:
- `@tokenring-ai/slack`: Slack integration
- `@tokenring-ai/telegram`: Telegram integration
- `@tokenring-ai/web-frontend`: Web frontend interface
- `@tokenring-ai/web-host`: Web hosting capabilities
- `@tokenring-ai/cli`: Command-line interface

**Cloud & Infrastructure**:
- `@tokenring-ai/aws`: AWS integration
- `@tokenring-ai/docker`: Docker integration
- `@tokenring-ai/kubernetes`: Kubernetes integration
- `@tokenring-ai/s3`: S3 storage integration

**Data & Storage**:
- `@tokenring-ai/database`: Database abstraction
- `@tokenring-ai/drizzle-storage`: Drizzle ORM integration
- `@tokenring-ai/mysql`: MySQL integration
- `@tokenring-ai/memory`: Memory management
- `@tokenring-ai/checkpoint`: Checkpoint and persistence

**AI & Services**:
- `@tokenring-ai/audio`: Audio processing
- `@tokenring-ai/mcp`: Model Context Protocol integration
- `@tokenring-ai/websearch`: Web search capabilities
- `@tokenring-ai/scraperapi`: Web scraping
- `@tokenring-ai/serper`: Search API integration

**Utilities**:
- `@tokenring-ai/utility`: General utilities
- `@tokenring-ai/tasks`: Task management
- `@tokenring-ai/queue`: Queue management
- `@tokenring-ai/scripting`: Scripting capabilities
- `@tokenring-ai/feedback`: Feedback systems

**Specialized Tools**:
- `@tokenring-ai/javascript`: JavaScript/TypeScript tooling
- `@tokenring-ai/linux-audio`: Linux audio processing
- `@tokenring-ai/naudiodon3`: Audio processing
- `@tokenring-ai/sandbox`: Code sandboxing
- `@tokenring-ai/cdn`: CDN integration
- `@tokenring-ai/local-filesystem`: Local file system
- `@tokenring-ai/file-index`: File indexing
- `@tokenring-ai/feedback`: User feedback
- `@tokenring-ai/inquirer-command-prompt`: Command prompts
- `@tokenring-ai/inquirer-tree-selector`: Tree selection

### External Dependencies
**Main Dependencies**:
- `@ai-sdk/mcp`: Model Context Protocol integration
- `@inquirer/prompts`: Interactive command-line interface
- `commander`: Command-line argument parsing

**Development Dependencies**:
- `@biomejs/biome`: Code formatting and linting
- `vitest`: Testing framework
- `husky`: Git hooks management
- `typescript`: TypeScript compiler
- `zod`: Schema validation

## Build & Installation

```bash
# Install dependencies using Bun (monorepo workspace support)
bun install

# Build all packages and the main application
bun run build

# Run tests across all packages
bun run test

# Run the application
bun src/tr-coder.js --source ./path-to-codebase
```

### Development Setup
```bash
# Initialize git submodules (if needed)
git submodule update --init --recursive

# Install development dependencies
bun install

# Build the entire monorepo
bun run build

# Run all tests
bun run test

# Run the application with source directory
bun src/tr-coder.js --source ./my-project
```

## Docker

**Dockerfile**: docker/Dockerfile
**Base Image**: oven/bun:debian
**Configuration**: Copies repository to container, installs git and build tools, runs the application
**Build Command**:

```bash
docker build -t tokenring-ai/coder:latest -f docker/Dockerfile .
```

**Run Command**:

```bash
docker run -ti --net host -v ./:/repo:rw tokenring-ai/coder:latest
```

## Testing

**Framework**: Vitest
**Test Location**: pkg/*/test directories
**Configuration**: Individual vitest.config.js/ts files in package directories
**Run Command**:

```bash
# Run all tests
bun run test

# Run tests with watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage
```

## Specialized Agents

The platform includes a comprehensive set of specialized AI agents:

### Interactive Agents
- **interactiveCodeAgent**: Direct code manipulation and execution assistant
- Provides real-time code editing and file system operations

### Background Agents (Domain Experts)
- **teamLeader**: Project coordination and team management
- **systemArchitect**: System design and architecture planning
- **fullStackDeveloper**: Full-stack development assistance
- **frontendDesign**: Frontend design and UI/UX development
- **backendDesign**: Backend architecture and API design
- **databaseDesign**: Database schema and design
- **apiDesigner**: API design and specification
- **authDesign**: Authentication and authorization design
- **businessLogicEngineer**: Business logic implementation
- **dataEngineer**: Data processing and ETL
- **integrationEngineer**: System integration
- **devopsEngineer**: DevOps and deployment
- **testEngineer**: Testing strategy and implementation
- **performanceEngineer**: Performance optimization
- **securityReview**: Security analysis and review
- **codeQualityEngineer**: Code quality and best practices
- **documentationEngineer**: Documentation generation
- **productManager**: Product management and requirements
- **productDesignEngineer**: Product design
- **uiUxDesigner**: UI/UX design
- **linuxAudio**: Linux audio processing

## Project Architecture

The project follows a sophisticated modular architecture with a monorepo structure:

### Core Architecture
- **Plugin System**: Extensible architecture with plugin support
- **Service Registry**: Runtime service registration and discovery
- **Agent Framework**: Comprehensive agent management system
- **Configuration Management**: Flexible configuration with validation

### Key Components
- **TokenRingApp**: Main application orchestrator
- **PluginManager**: Plugin lifecycle management
- **AgentManager**: Agent registration and execution
- **Service Layer**: Modular service architecture
- **Tool System**: Extensible tool integration

### Data Flow
1. **Configuration**: Load and validate application configuration
2. **Service Registration**: Register core and plugin services
3. **Agent Activation**: Initialize and configure specialized agents
4. **Tool Integration**: Enable agent-specific tooling
5. **Runtime Execution**: Handle user interactions and task execution

### Extensibility
- **Plugin Architecture**: Easy addition of new functionality
- **Agent Framework**: Custom agent development
- **Tool System**: Tool integration and management
- **Service Layer**: Modular service composition

## Advanced Features

### Multi-Agent Collaboration
- Agents can collaborate on complex tasks
- Task planning and execution coordination
- Cross-agent communication and knowledge sharing

### Tool Integration
- Comprehensive tool ecosystem
- Plugin-based tool architecture
- Safe tool execution with sandboxing

### Communication Channels
- Multiple interface options (CLI, Slack, Telegram, Web)
- Unified chat interface across platforms
- Real-time interaction and feedback

### Data Persistence
- SQLite database for chat history
- Checkpoint system for task persistence
- File system integration for code management

This architecture provides a robust, scalable foundation for AI-powered development assistance with extensive customization and extension capabilities.