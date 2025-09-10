---
description: Repository Information Overview
alwaysApply: true
---

# TokenRing Coder Information

## Summary

TokenRing Coder is an interactive developer assistant tool designed to help developers work with codebases in a
conversational manner. It provides a chat interface where users can ask questions, issue commands, and interact with
source code, leveraging AI to assist with code edits, refactors, testing, and more.

## Structure

- **src/**: Main application source code and entry point
- **pkg/**: Modular packages organized as a monorepo workspace
- **docker/**: Docker configuration for containerized deployment
- **.github/**: GitHub workflows and CI/CD configuration
- **.tokenring/**: Configuration directory for the application

## Language & Runtime

**Language**: TypeScript/JavaScript
**Version**: ES2022 target
**Build System**: TypeScript compiler (tsc)
**Package Manager**: Bun

## Dependencies

**Main Dependencies**:

- Multiple internal packages (@tokenring-ai/*)
- @inquirer/prompts: Interactive command-line interface
- commander: Command-line argument parsing

**Development Dependencies**:

- @biomejs/biome: Code formatting and linting
- vitest: Testing framework
- husky: Git hooks management

## Build & Installation

```bash
# Initialize git submodules
git submodule update --init --recursive

# Install dependencies
bun install

# Build the project
bun run build

# Run the application
bun src/tr-coder.js --source ./path-to-codebase
```

## Docker

**Dockerfile**: docker/Dockerfile
**Base Image**: oven/bun:debian
**Configuration**: Copies repository to container, installs git, and runs the application
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
bun run test
```

## Project Architecture

The project follows a modular architecture with a monorepo structure:

- **Core Application**: Entry point in src/tr-coder.ts
- **Package Modules**: Functionality split into specialized packages in pkg/
- **Registry System**: Services, tools, and resources registered at runtime
- **Plugin Support**: Extensible design with plugin capabilities
- **Data Persistence**: SQLite database for chat history and session storage