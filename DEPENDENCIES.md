# Token Ring AI Dependency Graph

## Overview

The Token Ring AI monorepo consists of 45 internal packages under `@tokenring-ai/*`, forming a modular ecosystem for AI
agents, tools, and integrations. Dependencies are managed via Yarn workspaces (configured in the root `package.json`),
enabling efficient builds and dependency hoisting. Total unique internal dependencies: ~200+ edges, with core packages
like `agent`, `ai-client`, `filesystem`, and `utility` serving as foundational hubs. External dependencies include AI
SDKs (e.g., `@ai-sdk/openai`), utilities (e.g., `zod`, `execa`), and providers (e.g., `@aws-sdk/client-s3`). No major
conflicts noted, with shared libs like `zod` and `execa` version-pinned for consistency.

## Package Dependencies Table

| Package | Key Deps (Internal) | Key Deps (External) | Role |
|---------|-------------------|-------------------|------|
| agent | utility, app | eventemitter3, glob-gitignore, uuid | Core: Agent orchestration |
| app | utility | - | Core: Base app class |
| ai-client | agent, utility | @ai-sdk/*, ai, axios, ollama-ai-provider, zod | Core: AI client & models |
| chat | agent, utility, chat | async, @types/async | Core: AI chat client |
| audio | agent, utility | zod | Core: Audio processing |
| aws | filesystem | @aws-sdk/client-s3, @aws-sdk/client-sts, node-fetch, zod | Integration: AWS auth/S3 |
| cdn | agent, utility | uuid | Core: CDN abstraction |
| checkpoint | agent, utility | - | Core: Checkpoint service |
| chrome | agent, websearch | puppeteer, turndown | Integration: Chrome automation |
| cli | agent, utility, inquirer-command-prompt, inquirer-tree-selector | @inquirer/prompts, execa, chalk, ora, open | Tools: CLI interface |
| codebase | filesystem, utility | code-chopper, zod | Tools: Codebase service |
| code-watch | agent, ai-client, filesystem | ignore | Tools: Code watching |
| database | agent, utility | - | Core: DB abstraction |
| docker | agent, filesystem, sandbox, utility | execa, glob-gitignore | Integration: Docker |
| drizzle-storage | chat | drizzle-orm, mysql2, postgres | Integration: Drizzle storage |
| feedback | agent, filesystem | esbuild, express, marked, react, react-dom | Tools: Feedback UI |
| file-index | agent, filesystem, utility | chokidar, commander, glob-gitignore, gpt-tokenizer, mysql2, sentencex, sqlite-vec, tree-sitter, fs-extra | Tools: File indexing |
| filesystem | agent, ai-client, utility | ignore, path-browserify | Core: FS abstraction |
| git | agent, ai-client, filesystem, testing, utility | execa | Tools: Git integration |
| inquirer-command-prompt | - | @inquirer/core, @inquirer/type, chalk, fs-extra, lodash | Tools: Command prompt |
| inquirer-tree-selector | - | @inquirer/core, @inquirer/figures, @inquirer/type, chalk | Tools: Tree selector |
| iterables | agent, chat, utility | - | Core: Iterable management |
| javascript | agent, filesystem | eslint, execa, jiti, jscodeshift | Tools: JS integration |
| kubernetes | agent | @kubernetes/client-node, next-auth, react-syntax-highlighter, vite | Integration: K8s resources |
| linux-audio | agent, audio, chat, naudiodon3 | wav, @types/wav, zod | Integration: Linux audio |
| local-filesystem | agent, filesystem | chokidar, execa, fs-extra, glob, glob-gitignore | Integration: Local FS |
| mcp | agent | @modelcontextprotocol/sdk, ai, zod | Integration: MCP client |
| memory | agent, utility | - | Core: Memory management |
| mysql | database | mysql2 | Integration: MySQL DB |
| naudiodon3 | - | bindings | Integration: PortAudio bindings |
| queue | agent, chat | - | Core: Work queue |
| s3 | agent | @aws-sdk/client-s3 | Integration: AWS S3 FS/CDN |
| sandbox | agent | zod | Core: Sandbox interface |
| scraperapi | agent, ai-client, websearch, utility | - | Integration: ScraperAPI |
| scripting | agent, utility | - | Tools: Scripting package |
| slack | agent, chat | @slack/bolt, @slack/web-api | Integration: Slack |
| tasks | agent, utility | uuid | Core: Task management |
| telegram | agent, chat | node-telegram-bot-api | Integration: Telegram |
| testing | agent, filesystem, queue, utility | glob-gitignore | Tools: Testing framework |
| utility | agent | - | Core: Utilities |
| web-frontend | agent, web-host | fastify, @fastify/static | Tools: React frontend |
| web-host | agent, utility | fastify, @fastify/websocket, @fastify/static | Tools: Fastify web host |
| websearch | agent, utility | zod | Core: Web search abstraction |
| wikipedia | agent, chat, utility | zod | Integration: Wikipedia API |

*Notes*: Internal deps are `@tokenring-ai/*` packages. External are third-party. Roles: Core (foundational), Tools (utilities/services), Integrations (external APIs/DBs).

## Integration Graph

```mermaid
graph TD
    agent[agent] --> utility[utility]
    agent --> app[app]
    app --> utility
    ai-client[ai-client] --> agent
    ai-client --> utility
    chat[chat] --> agent
    chat --> utility
    chat --> chat[chat]
    audio[audio] --> agent
    audio --> utility
    aws[aws] --> filesystem[filesystem]
    cdn[cdn] --> agent
    cdn --> utility
    checkpoint[checkpoint] --> agent
    checkpoint --> utility
    chrome[chrome] --> agent
    chrome --> websearch[websearch]
    cli[cli] --> agent
    cli --> utility
    cli --> inquirer-command-prompt[inquirer-command-prompt]
    cli --> inquirer-tree-selector[inquirer-tree-selector]
    codebase[codebase] --> filesystem
    codebase --> utility
    code-watch[code-watch] --> agent
    code-watch --> ai-client
    code-watch --> filesystem
    database[database] --> agent
    database --> utility
    docker[docker] --> agent
    docker --> filesystem
    docker --> sandbox[sandbox]
    docker --> utility
    drizzle-storage[drizzle-storage] --> chat
    feedback[feedback] --> agent
    feedback --> filesystem
    file-index[file-index] --> agent
    file-index --> filesystem
    file-index --> utility
    filesystem[filesystem] --> agent
    filesystem --> ai-client
    filesystem --> utility
    git[git] --> agent
    git --> ai-client
    git --> filesystem
    git --> testing[testing]
    git --> utility
    inquirer-command-prompt[inquirer-command-prompt] --> 
    inquirer-tree-selector[inquirer-tree-selector] --> 
    iterables[iterables] --> agent
    iterables --> chat
    iterables --> utility
    javascript[javascript] --> agent
    javascript --> filesystem
    kubernetes[kubernetes] --> agent
    linux-audio[linux-audio] --> agent
    linux-audio --> audio[audio]
    linux-audio --> chat
    linux-audio --> naudiodon3[naudiodon3]
    local-filesystem[local-filesystem] --> agent
    local-filesystem --> filesystem
    mcp[mcp] --> agent
    memory[memory] --> agent
    memory --> utility
    mysql[mysql] --> database[database]
    naudiodon3[naudiodon3] --> 
    queue[queue] --> agent
    queue --> chat
    s3[s3] --> agent
    sandbox[sandbox] --> agent
    scraperapi[scraperapi] --> agent
    scraperapi --> ai-client
    scraperapi --> websearch
    scraperapi --> utility
    scripting[scripting] --> agent
    scripting --> utility
    slack[slack] --> agent
    slack --> chat
    tasks[tasks] --> agent
    tasks --> utility
    telegram[telegram] --> agent
    telegram --> chat
    testing[testing] --> agent
    testing --> filesystem
    testing --> queue
    testing --> utility
    utility[utility] --> agent
    web-frontend[web-frontend] --> agent
    web-frontend --> web-host[web-host]
    web-host[web-host] --> agent
    web-host --> utility
    websearch[websearch] --> agent
    websearch --> utility
    wikipedia[wikipedia] --> agent
    wikipedia --> chat
    wikipedia --> utility

    classDef core fill:#e1f5fe
    classDef tools fill:#f3e5f5
    classDef integrations fill:#e8f5e8
    class agent,ai-client,filesystem,utility,database,websearch,sandbox,queue,memory,app,chat,codebase,code-watch,iterables,scripting,tasks core
    cli,feedback,file-index,javascript,kubernetes,linux-audio,testing,web-frontend,web-host tools
    aws,cdn,checkpoint,chrome,docker,drizzle-storage,inquirer-command-prompt,inquirer-tree-selector,mcp,mysql,naudiodon3,s3,scraperapi,serper,slack,telegram,wikipedia integrations
```

*Legend*: Solid edges = production deps; Dashed = peer deps. Core (blue), Tools (purple), Integrations (green).

## Hoisting & Conflicts

Yarn workspaces hoist common deps (e.g., `zod@4.1.13`, `execa@9.6.0`, `fastify@5.6.2`) to root `node_modules`, minimizing duplication. Potential conflicts:

- **AI SDKs**: `@ai-sdk/*` versions aligned (e.g., ^2.0.x for OpenAI); audit for breaking changes.
- **Shared utilities**: `zod`, `execa`, `fastify` versions consistent across packages.
- **Tree-sitter**: Language-specific (JS/Python/CPP) – no conflicts, but bundle size increases.
- **React ecosystem**: `react@19.2.0`, `react-dom@19.2.0` pinned for frontend packages.
- **No duplicate installs observed**; run `yarn why <pkg>` to verify. Lockfile (`yarn.lock`) ensures reproducibility.

## Workspace Structure

The project uses Yarn workspaces with the following structure:

```json
{
  "workspaces": [
    "pkg/*",
    "pkg/web-frontend/frontend"
  ],
  "nohoist": []
}
```

This configuration allows:
- All packages in `pkg/` to be managed as workspaces
- The frontend sub-package (`pkg/web-frontend/frontend`) to be included
- Dependency hoisting for common packages
- Clean separation between internal and external dependencies

## Key Dependency Patterns

1. **Core Foundation**: `agent` and `utility` are the most depended-upon packages
2. **AI Stack**: `ai-client` provides unified access to multiple AI providers
3. **File System**: `filesystem` serves as the abstraction layer for all file operations
4. **Web Services**: `web-host` and `web-frontend` provide web interface capabilities
5. **Tooling**: `testing`, `javascript`, `git` provide development and runtime tooling
6. **Integrations**: Platform-specific integrations (AWS, Docker, K8s, etc.)

## Recommendations

- **Audit Regularly**: Use `yarn audit` for vulnerabilities, especially in external deps like AWS SDK or Puppeteer
- **Lockfile Management**: Commit `yarn.lock` to repo; regenerate with `yarn install` after dep changes
- **Version Pinning**: Pin internal deps (e.g., `0.1.0`) to avoid breaking changes
- **Bundle Analysis**: Tools like `webpack-bundle-analyzer` for external deps; consider tree-shaking for Tree-sitter
- **Migration Path**: For upgrades (e.g., AI SDK v3), update models/ in `ai-client` first, then propagate
- **Dependency Visualization**: Use `yarn why` to understand dependency chains and identify circular dependencies