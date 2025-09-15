# Token Ring AI Monorepo

## Overview

The Token Ring AI monorepo hosts the development of the Token Ring Coder Application, an interactive AI-powered developer assistant. This framework enables conversational interaction with codebases, supporting tasks like code editing, refactoring, testing, git operations, and integrations with external services (e.g., AWS, Docker, web search). Built as a TypeScript monorepo using Bun, it provides pluggable packages under the `@tokenring-ai/*` scope for modular AI agent functionality. Key features include persistent chat sessions in SQLite, command-based workflows, plugin extensibility, and sandboxed execution. The ecosystem targets developers seeking AI-assisted coding in a secure, local environment (version 0.1.0, early-stage).

## Monorepo Structure

- **src/**: Core application source, including the main entry point `tr-coder.js` for the CLI REPL.
- **pkg/**: Workspace packages for modular components (e.g., `@tokenring-ai/agent`, `@tokenring-ai/ai-client`). Each package has its own `package.json`, source in `index.ts`, and optional tests/docs.
- **docker/**: Dockerfile and configs for containerized deployment (base: oven/bun:debian).
- **.github/**: CI/CD workflows (e.g., for building/testing).
- **Root configs**: `package.json` (workspaces, scripts), `tsconfig.json` (ES2022, strict mode), `biome.json` (linting/formatting), `.gitmodules` (submodules for external deps like inquirer packages).
- **docs**: `AGENTS.md` (project overview), existing `README.md` (Coder app details).
- Other: `.tokenring/` (per-project config/DB), `node_modules/` (hoisted via workspaces).

Packages integrate via scoped imports (e.g., `import { Agent } from '@tokenring-ai/agent';`), with the root app wiring them into the Coder CLI.

## Installation/Setup

### Prerequisites
- Bun (package manager/runtime)
- Git (with submodules support)
- Node.js-compatible env for deps (e.g., for testing)

### Cloning and Setup
1. Clone the repo:
   ```
   git clone <repo-url>
   cd tokenring-ai-monorepo
   ```
2. Initialize submodules (required for external packages like inquirer variants):
   ```
   git submodule update --init --recursive
   ```
3. Install dependencies (uses Bun workspaces for hoisting):
   ```
   bun install
   ```
4. (Optional) Initialize a project with Token Ring config:
   ```
   bun src/tr-coder.js --source ./your-codebase --initialize
   ```
   This creates `.tokenring/coder-config.js` and SQLite DB for chat history.

### Environment Setup
Set API keys for integrations (e.g., AI providers, AWS):
- Export vars like `OPENAI_API_KEY`, `AWS_ACCESS_KEY_ID` (passed to Docker via `-e`).
- For AI clients: Configure via `@tokenring-ai/ai-client` (supports OpenAI, Anthropic, Groq, etc.).

### Docker Setup
1. Build image:
   ```
   docker build -t tokenring-ai/coder:latest -f docker/Dockerfile .
   ```
2. Run (mounts codebase, passes env):
   ```
   docker run -ti --net host -v ./:/repo:rw $(env | grep '_KEY' | sed 's/^/-e /') tokenring-ai/coder:latest
   ```

## Core Packages and Integration

The monorepo uses workspaces for loosely coupled packages. Core packages form the agent framework; integrations extend tools/resources. Agents compose tools from multiple packages (e.g., an agent using `filesystem` for reads, `git` for commits, `ai-client` for LLM calls).

### Core Packages
| Package | Description | Key Exports/Usage |
|---------|-------------|-------------------|
| `@tokenring-ai/agent` | Central agent orchestration with event emitters, UUIDs, glob-gitignore. | `Agent` class; integrates tools via registries. Used in CLI for chat sessions. |
| `@tokenring-ai/ai-client` | Multi-provider AI SDK wrapper (OpenAI, Anthropic, Groq, etc., via `@ai-sdk/*`). | LLM calls, streaming; e.g., `generateText({ model: 'gpt-4o' })`. Ties to agent for reasoning. |
| `@tokenring-ai/filesystem` | Abstract FS ops (read/write/search) with ignore patterns. | `FileSystem` interface; extended by `local-filesystem` for local ops. |
| `@tokenring-ai/cli` | CLI utilities with inquirer prompts, ink for TUI, execa for shell. | Command parsing; powers `tr-coder` REPL with history/autocomplete. |
| `@tokenring-ai/memory` | In-memory storage for agent state/context. | Session persistence; integrates with `queue` for batched prompts. |
| `@tokenring-ai/queue` | Task queuing for sequential AI operations. | `Queue` class; used for multi-step workflows like code gen + test. |

### Integration Packages
These provide domain-specific tools/resources, registered to agents:
- **Cloud/Infra**: `@tokenring-ai/aws` (S3/STF clients), `@tokenring-ai/docker` (container exec), `@tokenring-ai/kubernetes` (K8s client), `@tokenring-ai/s3` (S3 FS impl).
- **Dev Tools**: `@tokenring-ai/git` (commit/rollback via execa), `@tokenring-ai/javascript` (ESLint, jscodeshift for JS ops), `@tokenring-ai/testing` (Vitest integration), `@tokenring-ai/code-watch` (chokidar for change detection).
- **Data/DB**: `@tokenring-ai/database` (abstract DB), `@tokenring-ai/mysql` (MySQL2 connector), `@tokenring-ai/sqlite-storage` (local DB for history).
- **Web/Search**: `@tokenring-ai/chrome` (Puppeteer automation), `@tokenring-ai/websearch` (abstract), `@tokenring-ai/serper` (Google search), `@tokenring-ai/scraperapi` (web scraping), `@tokenring-ai/wikipedia` (wiki queries).
- **Other**: `@tokenring-ai/codebase` (repo scanning), `@tokenring-ai/file-index` (vector search with tree-sitter), `@tokenring-ai/feedback` (UI for sessions with React/Express), `@tokenring-ai/sandbox` (isolated exec via Zod validation).

Cross-package example: An agent in CLI uses `ai-client` for chat, `filesystem` + `local-filesystem` for code access, `git` for changes, `testing` for validation. See pkg/ READMEs for details (e.g., pkg/agent/README.md).

## Usage Examples

1. **Running the Coder CLI** (full agent workflow):
   ```
   bun src/tr-coder.js --source ./my-project
   ```
   - Chat: "Refactor this function in src/main.ts" → AI edits via `filesystem` + `javascript`.
   - Command: `/commit` → Uses `git` to commit with AI message.
   - Queue: `/queue add "Run tests"` → Batches via `queue` + `testing`.

2. **Building the Monorepo**:
   ```
   bun run build  # Compiles root + workspaces
   bun run test   # Runs Vitest across pkgs
   ```

3. **Custom Agent Integration** (in a script):
   ```typescript
   import { Agent } from '@tokenring-ai/agent';
   import { OpenAI } from '@tokenring-ai/ai-client';
   import { LocalFileSystem } from '@tokenring-ai/local-filesystem';

   const agent = new Agent({ provider: new OpenAI() });
   agent.addTool(new LocalFileSystem('./project'));
   const response = await agent.run('List files');
   console.log(response);
   ```

## Configuration Options

- **Root `package.json`**: Workspaces (`pkg/*`), scripts (e.g., `build:ts` for TSC, `biome` for linting), deps hoisted.
- **tsconfig.json**: ES2022 target, NodeNext resolution, strict TS, includes `src/**/*` + `types/`, excludes tests/dist/pkg tests.
- **biome.json**: Linting/formatting (tabs, double quotes), applies to `src/**/*.js` + `pkg/**/*.js` (excl. some inquirer pkgs).
- **Env Vars**: AI keys (e.g., `ANTHROPIC_API_KEY`), AWS creds, Serper API for search. Per-project: `.tokenring/coder-config.js` for plugins/tests.
- **Yarn/Bun Workspaces**: Hoists root deps; submodules for non-npm pkgs (e.g., inquirer forks).

## Build/Development Workflow

1. **Build**: `bun run build` (TSC on root + workspaces via `tsc -p tsconfig.tson` in pkgs).
2. **Test**: `bun run test` (Vitest; per-pkg configs, coverage via `@vitest/coverage-v8`).
3. **Lint/Format**: `bun run biome` (fixes via Biome); ESLint in some pkgs.
4. **Typecheck**: `bun run typecheck` (TSC no-emit).
5. **Contribute**:
   - Add pkg: Create `pkg/new-pkg/` with `package.json` (name `@tokenring-ai/new-pkg`, exports `./index.ts`), add to root deps if needed.
   - PR: Fork, update submodules, run `bun install`, build/test, submit to main.
   - Hooks: Husky for pre-commit (Biome lint).

Known limitations: Early v0.1.0; submodules may need manual sync; binary deps (e.g., tree-sitter) require build tools.

## API/Exports Overview

Root exports via bin `tr-coder` (CLI). Packages use `exports: { ".": "./index.ts", "./*": "./*.ts" }` for tree-shaking. Import scoped: `import { Tool } from '@tokenring-ai/agent/tools';`. Main root entry: `dist/tr-coder.js`. No direct root API; use packages or CLI.

## Dependencies

- **Root Runtime**: `@inquirer/prompts` (CLI UI), all `@tokenring-ai/*` (internal, version 0.1.0).
- **Dev**: `@biomejs/biome` (lint), `vitest` (test), `husky` (hooks), `typescript` (in pkgs).
- **Hoisting**: Workspaces hoist common deps (e.g., `zod`, `execa`); submodules for custom (e.g., `@tokenring-ai/inquirer-command-prompt`).
- Update: `bun run update-all-dependencies-latest` (via submodules).

## Contributing/Notes

- **Guidelines**: Follow TS strict, Biome rules. Add tests for new pkgs/tools. Document in pkg/ README.md. Reference `AGENTS.md` for architecture.
- **License**: MIT (see LICENSE).
- **Future Plans**: Full CI/CD, more integrations (e.g., GitHub), stable v1.0 with plugin marketplace.
- **Known Issues**: Submodule sync required pre-install; Docker needs env passthrough for keys. For pkg-specific docs, see individual READMEs (e.g., pkg/ai-client/README.md).

This monorepo powers AI-driven development; extend via packages for custom agents.