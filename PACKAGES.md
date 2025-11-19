# Token Ring Coder Package Index

## Overview

The Token Ring Coder monorepo hosts the development of the Token Ring Coder Application, an interactive AI-powered
developer assistant. This framework enables conversational interaction with codebases, supporting tasks like code
editing, refactoring, testing, git operations, and integrations with external services (e.g., AWS, Docker, web search).
Built as a TypeScript monorepo using Bun, it provides pluggable packages under the `@tokenring-ai/*` scope for modular
AI agent functionality. Key features include persistent chat sessions in SQLite, command-based workflows, plugin
extensibility, and sandboxed execution. The ecosystem targets developers seeking AI-assisted coding in a secure, local
environment (version 0.1.0, early-stage).

## Package List

| Name                                  | Version | Description                                                                                                                       | Dependencies (Key)                                                                                                               | Main APIs/Exports                                                                                                                   | Role/Integrations                                                                                       |
|---------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| @tokenring-ai/agent                   | 0.1.0   | Core component for creating, managing, and orchestrating AI agents with tools, commands, hooks, and state persistence.            | @tokenring-ai/utility, eventemitter3, glob-gitignore, uuid; Peer: @tokenring-ai/ai-client                                        | Agent, AgentTeam, ContextStorage, HistoryStorage, types.ts, events                                                                  | Central orchestrator; integrates with all packages via registries for tools/commands/services.          |
| @tokenring-ai/ai-client               | 0.1.0   | Unified AI client for chat/embeddings/images via Vercel AI SDK, with model registry and request builders.                         | ai, @ai-sdk/* (openai/anthropic/google/groq/etc.), @tokenring-ai/agent, axios, lodash-es, zod                                    | ModelRegistry, AIChatClient, createChatRequest, runChat, AIService                                                                  | LLM core; integrates with all agent packages for AI calls.                                              |
| @tokenring-ai/audio                   | 0.1.0   | Abstract audio framework for recording, playback, transcription, and text-to-speech synthesis.                                    | @tokenring-ai/agent, zod                                                                                                         | AudioProvider (abstract), AudioService, /voice command, record/transcribe/speak/playback tools                                      | Audio abstraction; extended by @tokenring-ai/linux-audio for platform-specific impl.                    |
| @tokenring-ai/aws                     | 0.1.0   | AWS integration with STS/S3 clients, authentication, and bucket listing tool/command.                                             | @aws-sdk/client-s3, @aws-sdk/client-sts, @tokenring-ai/agent, @tokenring-ai/filesystem, node-fetch, zod                          | AWSService, listS3Buckets tool, /aws command                                                                                        | Cloud integration; uses agent tools for S3 ops.                                                         |
| @tokenring-ai/cdn                     | 0.1.0   | Abstract CDN service for uploading/managing files in content delivery networks.                                                   | None specified                                                                                                                   | CDNService (abstract), upload/delete tools                                                                                          | Base for CDN integrations; extended by @tokenring-ai/s3 for AWS S3.                                     |
| @tokenring-ai/checkpoint              | 0.1.0   | Checkpoint service for storing Agent Checkpoints with a storage provider.                                                         | @tokenring-ai/agent                                                                                                              | CheckpointService, AgentCheckpointProvider (abstract)                                                                               | State persistence abstraction; used by @tokenring-ai/sqlite-storage.                                    |
| @tokenring-ai/chrome                  | 0.1.0   | Puppeteer tool for browser automation scripts, capturing logs and results.                                                        | @tokenring-ai/agent, puppeteer                                                                                                   | ChromeWebSearchProvider, runPuppeteerScript tool                                                                                    | Web automation; integrates with agent tools for scripting.                                              |
| @tokenring-ai/cli                     | 0.1.0   | REPL service for interactive CLI with agent selection, event processing, and commands (/help, /edit, etc.).                       | @tokenring-ai/agent, @tokenring-ai/ai-client, @tokenring-ai/utility, @inquirer/prompts, chalk, ora, execa, open                  | REPLService, REPLInput utils, chatCommands (help/exit/multi/edit)                                                                   | Terminal UI; powers main CLI app, integrates all agent packages.                                        |
| @tokenring-ai/codebase                | 0.1.0   | Service for injecting codebase structure/files into agent context via memories and resources.                                     | @tokenring-ai/agent, @tokenring-ai/filesystem, @tokenring-ai/utility                                                             | CodeBaseService, FileTreeResource, WholeFileResource, RepoMapResource, /codebaseResources command                                   | Code awareness; integrates with agent memories and filesystem.                                          |
| @tokenring-ai/code-watch              | 0.1.0   | File watcher that detects AI comment triggers (e.g., # AI!) and spawns agents for code mods/questions.                            | @tokenring-ai/ai-client, @tokenring-ai/agent, @tokenring-ai/filesystem                                                           | CodeWatchService                                                                                                                    | Dev workflow; integrates with agent team and filesystem watching.                                       |
| @tokenring-ai/database                | 0.1.0   | Abstract database layer with resource management, SQL execution, schema inspection tools.                                         | @tokenring-ai/agent                                                                                                              | DatabaseService, DatabaseProvider (abstract), SqlIterableProvider, listDatabases/executeSql/showSchema tools                        | DB abstraction; extended by mysql; integrates with agent tools.                                         |
| @tokenring-ai/docker                  | 0.1.0   | Docker integration via CLI for container/image management, with sandbox provider.                                                 | @tokenring-ai/agent, @tokenring-ai/filesystem, @tokenring-ai/sandbox, @tokenring-ai/utility, execa, glob-gitignore, zod          | DockerService, DockerSandboxProvider, dockerRun/buildImage/list* tools                                                              | Containerization; extends sandbox; integrates with agent filesystem.                                    |
| @tokenring-ai/feedback                | 0.1.0   | Tools for human feedback: ask questions, review files (text/MD/HTML/JSON), preview React components in browser.                   | @tokenring-ai/agent, @tokenring-ai/filesystem, esbuild, express, marked, open, react, zod                                        | askHuman, getFileFeedback, reactFeedback tools                                                                                      | Human-in-loop; integrates with agent for UI interactions and file ops.                                  |
| @tokenring-ai/file-index              | 0.1.0   | File indexing/search with semantic chunking (Tree-sitter symbols, sentencex), ephemeral provider.                                 | @tokenring-ai/agent, @tokenring-ai/filesystem, chokidar, gpt-tokenizer, sentencex, tree-sitter*                                  | FileIndexProvider (abstract), EphemeralFileIndexProvider, FileIndexService, hybridSearch tool, /search command                      | Codebase search; integrates with agent memories and filesystem watching.                                |
| @tokenring-ai/filesystem              | 0.1.0   | Abstract filesystem with ops (read/write/search/glob), ignore filters, tools/commands, dirty tracking.                            | @tokenring-ai/ai-client, @tokenring-ai/agent, ignore, path-browserify                                                            | FileSystemService, FileSystemProvider (abstract), file/modify/search/patch tools, terminal/runShellCommand, /file /foreach commands | Core FS abstraction; extended by local-filesystem/s3; used by all file-interacting pkgs.                |
| @tokenring-ai/git                     | 0.1.0   | Git integration for commits, rollbacks, branch management, with auto-commit hook after tests.                                     | @tokenring-ai/ai-client, @tokenring-ai/agent, @tokenring-ai/filesystem, @tokenring-ai/testing, @tokenring-ai/utility, execa, zod | GitService, commit/rollback/branch tools, /git command, autoCommit hook                                                             | Version control; integrates with agent testing and ai-client for messages.                              |
| @tokenring-ai/inquirer-command-prompt | 2.0.0   | Interactive command prompt for Node.js CLI with history, auto-completion, and multi-line support using Inquirer.                  | @inquirer/core, @inquirer/type, chalk, fs-extra, lodash                                                                          | createPrompt (default), HistoryHandler, FileBackedHistory, EphemeralHistory                                                         | UI component; used in @tokenring-ai/cli for input handling.                                             |
| @tokenring-ai/inquirer-tree-selector  | 2.0.0   | Tree selector prompt for Inquirer.js, supporting single/multiple selections with lazy-loading.                                    | @inquirer/core, @inquirer/figures, @inquirer/type, chalk                                                                         | treeSelector, Item type, PromptConfig                                                                                               | UI component; integrates with cli for hierarchical selections (e.g., file trees).                       |
| @tokenring-ai/iterables               | 0.1.0   | Pluggable system for defining and using named iterables with /foreach command for batch processing.                               | @tokenring-ai/agent                                                                                                              | IterableService, IterableProvider (abstract), /iterable command, glob provider                                                      | Batch processing; integrates with filesystem for glob patterns and custom providers.                    |
| @tokenring-ai/javascript              | 0.1.0   | JS dev tools: ESLint auto-fix, npm/yarn/pnpm package install/remove, JS script execution.                                         | @tokenring-ai/agent, @tokenring-ai/filesystem, eslint, execa, jiti, jscodeshift, zod                                             | eslint, installPackages, removePackages, runJavaScriptScript tools                                                                  | Code tooling; integrates with agent filesystem for JS workflows.                                        |
| @tokenring-ai/kubernetes              | 0.1.0   | Kubernetes client for resource discovery/listing across namespaces, with agent tool.                                              | @tokenring-ai/agent, @kubernetes/client-node, zod                                                                                | KubernetesService, listKubernetesApiResources tool                                                                                  | Infra integration; tools for agent to query K8s clusters.                                               |
| @tokenring-ai/linux-audio             | 0.1.0   | Linux-specific audio implementation using naudiodon2 for recording, playback, transcription, and TTS.                             | @tokenring-ai/audio, naudiodon2, wav, OpenAI SDK                                                                                 | LinuxAudioProvider                                                                                                                  | Platform audio; extends @tokenring-ai/audio for Linux systems.                                          |
| @tokenring-ai/local-filesystem        | 0.1.0   | Concrete FS implementation for local disk ops, extending FileSystemService with chokidar watching.                                | @tokenring-ai/filesystem, chokidar, execa, fs-extra, glob                                                                        | LocalFileSystemService                                                                                                              | FS backend; used by agent filesystem service for local projects.                                        |
| @tokenring-ai/mcp                     | 0.1.0   | MCP (Model Context Protocol) client for connecting agents with MCP servers via stdio/SSE/HTTP transports.                         | @tokenring-ai/agent, @modelcontextprotocol/sdk                                                                                   | MCPService, stdio/SSE/HTTP transports                                                                                               | Protocol integration; enables external tool/resource access via MCP.                                    |
| @tokenring-ai/memory                  | 0.1.0   | Short-term memory/attention storage for agents, with tools/commands for adding/retrieving items.                                  | @tokenring-ai/agent, @tokenring-ai/utility, zod                                                                                  | ShortTermMemoryService, tools (add-memory/add-goal/add-focus), /memory /attention commands                                          | Agent context; integrates with chatRequestBuilder for memory injection.                                 |
| @tokenring-ai/mysql                   | 0.1.0   | MySQL database integration extending DatabaseProvider for connection pooling, SQL execution, and schema inspection.               | @tokenring-ai/database, mysql2                                                                                                   | MySQLProvider, executeSql, showSchema                                                                                               | DB backend; integrates with agent database service for queries/schemas.                                 |
| @tokenring-ai/naudiodon3              | 2.5.0   | Node Stream bindings for PortAudio, providing native audio I/O capabilities.                                                      | PortAudio (native)                                                                                                               | AudioIO, AudioInput, AudioOutput streams                                                                                            | Native audio; used by @tokenring-ai/linux-audio for audio operations.                                   |
| @tokenring-ai/queue                   | 0.1.0   | In-memory queue for work items (chat prompts/tasks) with checkpoint preservation for sequential processing.                       | @tokenring-ai/ai-client, @tokenring-ai/agent, @tokenring-ai/history                                                              | WorkQueueService, /queue command, addTaskToQueue tool                                                                               | Task batching; integrates with agent for deferred execution and checkpoints.                            |
| @tokenring-ai/s3                      | 0.1.0   | AWS S3 integration implementing FileSystemProvider and CDNProvider for bucket-based file ops and content delivery.                | @tokenring-ai/agent, @aws-sdk/client-s3; Peer: @tokenring-ai/cdn, @tokenring-ai/filesystem                                       | S3FileSystemProvider, S3CDNProvider                                                                                                 | Storage/CDN backend; integrates with agent filesystem and cdn services.                                 |
| @tokenring-ai/sandbox                 | 0.1.0   | Abstract sandbox interface for isolated container management (e.g., Docker), with service for providers and agent tools/commands. | @tokenring-ai/agent, zod                                                                                                         | SandboxProvider (abstract), SandboxService, tools (createContainer, executeCommand), /sandbox command                               | Enables secure execution; extended by @tokenring-ai/docker for concrete impl.                           |
| @tokenring-ai/scraperapi              | 0.1.0   | ScraperAPI integration for web scraping, Google SERP/news, extending WebSearchProvider.                                           | @tokenring-ai/websearch, @tokenring-ai/utility                                                                                   | ScraperAPIWebSearchProvider, searchWeb, searchNews, fetchPage                                                                       | Web search/scraping; integrates with agent websearch service.                                           |
| @tokenring-ai/scripting               | 0.1.0   | Scripting language with variables, functions, LLM integration, and predefined command sequences.                                  | @tokenring-ai/agent                                                                                                              | ScriptingService, /script /var /func /call /list /for /if /while commands                                                           | Workflow automation; enables reusable command sequences and dynamic scripting.                          |
| @tokenring-ai/serper                  | 0.1.0   | Serper.dev API integration for Google web/news search, extending WebSearchProvider.                                               | @tokenring-ai/websearch                                                                                                          | SerperWebSearchProvider, searchWeb, searchNews, fetchPage                                                                           | Web search; alternative to scraperapi in websearch registry.                                            |
| @tokenring-ai/sqlite-storage          | 0.1.0   | SQLite-based storage for agent checkpoints, implementing AgentCheckpointProvider.                                                 | @tokenring-ai/ai-client, @tokenring-ai/history, bun:sqlite                                                                       | SQLiteAgentStateStorage, initializeLocalDatabase                                                                                    | Persistence; integrates with agent for state saving/restoration.                                        |
| @tokenring-ai/tasks                   | 0.1.0   | Task planning and execution with multi-step workflows, user approval, and agent dispatch.                                         | @tokenring-ai/agent, @tokenring-ai/utility, zod                                                                                  | TaskService, /tasks command, tasks/add tool                                                                                         | Workflow orchestration; enables complex multi-agent task coordination.                                  |
| @tokenring-ai/testing                 | 0.1.0   | Testing framework for agents with resources (e.g., shell commands), service for execution, auto-repair hooks.                     | @tokenring-ai/agent, @tokenring-ai/filesystem, @tokenring-ai/utility, @tokenring-ai/ai-client, @tokenring-ai/queue               | TestingService, TestingResource (abstract), ShellCommandTestingResource, /test /repair commands, autoTest/autoRepair hooks          | Ensures code integrity; integrates with agent lifecycle and ai-client for repairs.                      |
| @tokenring-ai/utility                 | 0.1.0   | General-purpose helpers: promise abandonment, in-memory cache, log formatting, pretty strings, shell escaping.                    | None                                                                                                                             | abandon, Cache, formatLogMessages, infoLine/successLine/etc., shellEscape                                                           | Shared utils; used across packages (e.g., agent, filesystem) for caching/logging.                       |
| @tokenring-ai/websearch               | 0.1.0   | Abstract web search interface with pluggable providers, tools for search/news/page fetch, and chat commands.                      | @tokenring-ai/agent, zod                                                                                                         | WebSearchProvider (abstract), WebSearchService, tools (searchWeb, searchNews, fetchPage), /websearch command                        | Web integration base; extended by @tokenring-ai/serper, @tokenring-ai/scraperapi, @tokenring-ai/chrome. |
| @tokenring-ai/wikipedia               | 0.1.0   | Wikipedia API integration for searching articles and fetching page content, with agent tools and service.                         | @tokenring-ai/agent, @tokenring-ai/utility, zod                                                                                  | WikipediaService, tools (search, getPage), /wikipedia command                                                                       | Knowledge retrieval; tools integrate with agent for wiki queries.                                       |

## Categories

### Core

- **@tokenring-ai/agent**: Agent orchestration and state management.
- **@tokenring-ai/ai-client**: AI model registry and chat/embeddings.
- **@tokenring-ai/utility**: Shared utilities (cache, logging, shell escape).
- **@tokenring-ai/filesystem**: Abstract filesystem operations.
- **@tokenring-ai/memory**: Short-term memory and attention storage.
- **@tokenring-ai/queue**: Task queuing with checkpoints.
- **@tokenring-ai/checkpoint**: Checkpoint service abstraction.

### Storage & Database

- **@tokenring-ai/database**: Abstract DB layer.
- **@tokenring-ai/mysql**: MySQL integration.
- **@tokenring-ai/sqlite-storage**: SQLite for checkpoints.
- **@tokenring-ai/s3**: S3 filesystem/CDN.
- **@tokenring-ai/cdn**: Abstract CDN service.

### Development Tools

- **@tokenring-ai/testing**: Agent testing and auto-repair.
- **@tokenring-ai/git**: Git operations and auto-commit.
- **@tokenring-ai/javascript**: ESLint, package management, JS execution.
- **@tokenring-ai/codebase**: Codebase injection into context.
- **@tokenring-ai/code-watch**: AI comment-triggered modifications.
- **@tokenring-ai/file-index**: Semantic file search and indexing.
- **@tokenring-ai/iterables**: Named iterables for batch processing.
- **@tokenring-ai/scripting**: Scripting language with variables and functions.
- **@tokenring-ai/tasks**: Task planning and multi-agent orchestration.

### Integrations & External Services

- **@tokenring-ai/websearch**: Abstract web search.
- **@tokenring-ai/serper**: Google search via Serper.
- **@tokenring-ai/scraperapi**: Web scraping/SERP.
- **@tokenring-ai/wikipedia**: Wikipedia API.
- **@tokenring-ai/chrome**: Puppeteer browser automation.
- **@tokenring-ai/aws**: AWS STS/S3 clients.
- **@tokenring-ai/docker**: Docker container management.
- **@tokenring-ai/kubernetes**: K8s resource discovery.
- **@tokenring-ai/sandbox**: Abstract sandbox (extended by docker).
- **@tokenring-ai/mcp**: Model Context Protocol client.

### Audio & Media

- **@tokenring-ai/audio**: Abstract audio framework.
- **@tokenring-ai/linux-audio**: Linux audio implementation.
- **@tokenring-ai/naudiodon3**: Native audio I/O bindings.

### UI & CLI

- **@tokenring-ai/cli**: REPL and interactive prompts.
- **@tokenring-ai/inquirer-command-prompt**: Command prompt with history.
- **@tokenring-ai/inquirer-tree-selector**: Tree-based selections.
- **@tokenring-ai/feedback**: Human feedback tools (questions, file previews, React UI).
- **@tokenring-ai/local-filesystem**: Local FS implementation.

## Cross-Package Interactions

The ecosystem is agent-centric: `@tokenring-ai/agent` is the hub, registering tools/commands/services from other
packages via registries. For example:

- **Agent Workflow**: Agent uses `@tokenring-ai/ai-client` for LLM calls, `@tokenring-ai/filesystem` (with
  `@tokenring-ai/local-filesystem`) for file ops, `@tokenring-ai/memory` for context, and `@tokenring-ai/queue` for
  batching.
- **Dev Pipeline**: `@tokenring-ai/code-watch` detects changes → triggers agent with `@tokenring-ai/javascript` (
  ESLint) + `@tokenring-ai/testing` (run tests) → auto-commit via `@tokenring-ai/git` if passing.
- **Search/Integrations**: `@tokenring-ai/websearch` (with `@tokenring-ai/serper`, `@tokenring-ai/scraperapi`, or
  `@tokenring-ai/chrome`) feeds results to agent; `@tokenring-ai/file-index` searches codebase internally.
- **Infra/Storage**: `@tokenring-ai/sandbox` (via `@tokenring-ai/docker`) for isolated exec; `@tokenring-ai/database` (
  with `@tokenring-ai/mysql`) for queries; `@tokenring-ai/aws` for cloud ops; `@tokenring-ai/checkpoint` (with
  `@tokenring-ai/sqlite-storage`) for state persistence.
- **UI Flow**: `@tokenring-ai/cli` runs REPL with `@tokenring-ai/inquirer-*` prompts; `@tokenring-ai/feedback` for human
  reviews.
- **Workflow Automation**: `@tokenring-ai/scripting` enables reusable command sequences with variables/functions;
  `@tokenring-ai/tasks` orchestrates multi-agent workflows with approval; `@tokenring-ai/iterables` provides batch
  processing via `/foreach`.
- **Audio Integration**: `@tokenring-ai/audio` provides abstract interface; `@tokenring-ai/linux-audio` implements
  platform-specific recording/playback using `@tokenring-ai/naudiodon3` for native I/O.
- **Protocol Extensions**: `@tokenring-ai/mcp` connects to external MCP servers, automatically registering their
  tools/resources with agents.

Interconnections form a graph: Core (agent/ai-client/filesystem) → Dev Tools (git/testing) → Integrations (
websearch/docker) → UI (cli/feedback). Diagram (text-based):

```
AgentTeam (agent)
├── AI Calls (ai-client)
├── FS Ops (filesystem + local-filesystem/s3)
├── Memory/Queue (memory/queue)
├── Tools: git, testing, javascript, docker, websearch (serper/scraperapi)
├── Services: database (mysql), sandbox, aws, kubernetes
└── UI: cli (inquirer-*) + feedback
```

## Quick Start

See the root [README.md](README.md) for monorepo setup and running the Coder CLI.

Example using multiple packages (agent + filesystem + ai-client + git):

```typescript
import { AgentTeam } from '@tokenring-ai/agent';
import { LocalFileSystemService } from '@tokenring-ai/local-filesystem';
import { ModelRegistry } from '@tokenring-ai/ai-client';
import { GitService } from '@tokenring-ai/git';

const team = new AgentTeam();
team.addService(new LocalFileSystemService({ rootDirectory: './project' }));
const registry = new ModelRegistry();
await registry.initializeModels({ openai: { /* config */ } });
team.addService(registry);
team.addService(new GitService());

const agent = await team.createAgent('coder');
await agent.handleInput({ message: 'Add a hello world function to main.ts and commit it.' });
// Agent: Uses filesystem to edit, ai-client for reasoning, git for commit.
```

## Maintenance Notes

- **Updating READMEs**: Edit individual `pkg/*/README.md` files directly. Use consistent structure (Overview,
  Installation, Core Components, Usage, API, Dependencies). Run `npm run biome` in root for formatting.
- **Adding New Packages**: Create `pkg/new-pkg/` with `package.json` (name: `@tokenring-ai/new-pkg`, version: "0.1.0",
  type: "module", exports: { "./*": "./*.ts" }), `index.ts` exporting `TokenRingPackage` (with tools/commands if
  applicable), and `README.md`. Add to root `package.json` workspaces if needed. Build/test via root scripts. Register
  in agent via `team.addPackages([newPkg.packageInfo])`.
- **Versioning**: Use semantic versioning (^0.1.0 for early releases). Update `package.json` and propagate changes via
  `bun install`.
- **Testing**: Run per-pkg tests (`npm test` in pkg/) or root-wide (`npm run test`). Add Vitest suites for new features.
- **Docs Sync**: After changes, regenerate indexes like this PACKAGES.md using tools (e.g., file_search + analysis
  script).