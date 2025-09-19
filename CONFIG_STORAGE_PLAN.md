# SQLite Application Config Storage Plan

## Overview
Implement a SQLite-based configuration storage system using a state mutation mechanism similar to the Agent class's AgentStateSlice pattern. This will allow persistent storage of application configuration with reactive updates.

## Architecture Components

### 1. ConfigStateSlice Interface
```typescript
interface ConfigStateSlice {
  name: string;
  reset: (what: ResetWhat[]) => void;
  serialize: () => object;
  deserialize: (data: object) => void;
}
```

### 2. Core Classes to Implement

#### ConfigService (TokenRingService)
- Manages configuration state slices
- Provides mutation methods similar to Agent class
- Handles SQLite persistence
- Emits events on config changes

#### SQLiteConfigStorage (ConfigProvider)
- Implements SQLite operations for config persistence
- Stores serialized config slices by name
- Provides CRUD operations for config data

#### ConfigStateSlices
- **ModelConfigState**: AI model configurations
- **FilesystemConfigState**: Filesystem provider settings  
- **WebSearchConfigState**: Web search provider settings
- **AgentConfigState**: Agent definitions and settings

### 3. Database Schema
```sql
CREATE TABLE Config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  data TEXT NOT NULL, -- JSON serialized config slice
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL
);
```

### 4. Implementation Files

#### `/pkg/config-storage/`
- `ConfigService.ts` - Main service class with wizard functionality
- `ConfigProvider.ts` - Abstract provider interface
- `SQLiteConfigStorage.ts` - SQLite implementation
- `ConfigurationWizard.ts` - Interactive setup flow
- `state/` - Config state slice implementations
  - `ModelConfigState.ts`
  - `FilesystemConfigState.ts` 
  - `WebSearchConfigState.ts`
  - `AgentConfigState.ts`

#### Service Interface Extensions
- Services implement `getConfigurationPrompts(): ConfigPrompt[]`
- Services implement `validateConfiguration(config): boolean`
- Chat command `/reconfigure` in CLI package

## Package Configuration Details

### @tokenring-ai/agent
- **Config**: Agent definitions, checkpoint settings
- **Prompts**: Agent type selection, persistence options
- **Auto-detect**: No env vars

### @tokenring-ai/ai-client
- **Config**: Model providers, default model, API keys
- **Prompts**: Provider selection, model preferences, temperature settings
- **Auto-detect**: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GROQ_API_KEY`, etc.

### @tokenring-ai/aws
- **Config**: AWS credentials, region, services to enable
- **Prompts**: Region selection, service preferences
- **Auto-detect**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`

### @tokenring-ai/cdn
- **Config**: CDN providers and settings
- **Prompts**: Provider selection, upload preferences
- **Auto-detect**: Provider-specific API keys

### @tokenring-ai/chrome
- **Config**: Browser automation settings, headless mode
- **Prompts**: Execution preferences, timeout settings
- **Auto-detect**: Chrome/Chromium installation

### @tokenring-ai/cli
- **Config**: REPL settings, command history
- **Prompts**: Interface preferences, history size
- **Auto-detect**: Terminal capabilities

### @tokenring-ai/code-watch
- **Config**: Watch patterns, agent types for triggers
- **Prompts**: File patterns to watch, trigger preferences
- **Auto-detect**: Git repository presence

### @tokenring-ai/codebase
- **Config**: Resource types, inclusion patterns
- **Prompts**: Resource selection, file patterns
- **Auto-detect**: Project structure analysis

### @tokenring-ai/database
- **Config**: Database connections, query limits
- **Prompts**: Connection details, security settings
- **Auto-detect**: Database URLs in env vars

### @tokenring-ai/docker
- **Config**: Docker host, TLS settings, default images
- **Prompts**: Host configuration, security preferences
- **Auto-detect**: `DOCKER_HOST`, Docker daemon availability

### @tokenring-ai/feedback
- **Config**: UI preferences, browser settings
- **Prompts**: Default browser, UI theme
- **Auto-detect**: Available browsers

### @tokenring-ai/file-index
- **Config**: Indexing patterns, search settings
- **Prompts**: File types to index, search preferences
- **Auto-detect**: Project file types

### @tokenring-ai/filesystem
- **Config**: Provider settings, mount points
- **Prompts**: Provider selection, directory mappings
- **Auto-detect**: Local filesystem access

### @tokenring-ai/git
- **Config**: Repository settings, commit preferences
- **Prompts**: Author info, commit message templates
- **Auto-detect**: Git configuration, repository status

### @tokenring-ai/javascript
- **Config**: Node.js settings, package managers
- **Prompts**: Runtime preferences, tool selection
- **Auto-detect**: `package.json`, Node.js version

### @tokenring-ai/kubernetes
- **Config**: Cluster connections, namespace preferences
- **Prompts**: Cluster selection, default namespace
- **Auto-detect**: `KUBECONFIG`, kubectl availability

### @tokenring-ai/local-filesystem
- **Config**: Base directories, permissions
- **Prompts**: Directory selection, access levels
- **Auto-detect**: File system permissions

### @tokenring-ai/memory
- **Config**: Memory limits, persistence settings
- **Prompts**: Memory size, cleanup preferences
- **Auto-detect**: Available system memory

### @tokenring-ai/mysql
- **Config**: Connection details, query settings
- **Prompts**: Host, credentials, database selection
- **Auto-detect**: `MYSQL_URL`, `DATABASE_URL`

### @tokenring-ai/queue
- **Config**: Queue settings, worker limits
- **Prompts**: Concurrency settings, retry policies
- **Auto-detect**: System resources

### @tokenring-ai/repo-map
- **Config**: Mapping preferences, file filters
- **Prompts**: Language selection, depth settings
- **Auto-detect**: Repository languages

### @tokenring-ai/s3
- **Config**: S3 credentials, bucket settings
- **Prompts**: Bucket selection, region preferences
- **Auto-detect**: AWS S3 credentials

### @tokenring-ai/sandbox
- **Config**: Execution limits, security settings
- **Prompts**: Timeout settings, resource limits
- **Auto-detect**: Container runtime availability

### @tokenring-ai/scraperapi
- **Config**: API credentials, request limits
- **Prompts**: Rate limiting, proxy preferences
- **Auto-detect**: `SCRAPERAPI_KEY`

### @tokenring-ai/serper
- **Config**: Search API settings, result limits
- **Prompts**: Search preferences, result count
- **Auto-detect**: `SERPER_API_KEY`

### @tokenring-ai/sqlite-storage
- **Config**: Database path, schema settings
- **Prompts**: Storage location, backup preferences
- **Auto-detect**: SQLite availability

### @tokenring-ai/testing
- **Config**: Test frameworks, execution settings
- **Prompts**: Framework selection, test patterns
- **Auto-detect**: Test files, framework configs

### @tokenring-ai/utility
- **Config**: Utility preferences, logging levels
- **Prompts**: Debug settings, output preferences
- **Auto-detect**: Development environment

### @tokenring-ai/websearch
- **Config**: Search provider settings, result limits
- **Prompts**: Provider selection, search preferences
- **Auto-detect**: Available search API keys

## Integration Points

### 1. Reconfigure Flag & Command
- `--reconfigure` flag triggers interactive configuration wizard
- Auto-detects ENV variables, then walks user through service setup
- `/reconfigure` chat command provides same functionality during runtime
- Each service presents configuration options to user

### 2. Provider Registration Architecture
- Providers register directly with their respective services
- Services maintain their own provider registries
- No centralized provider registry needed

### 3. Dynamic Config Application
- Config changes trigger service reconfiguration automatically
- Services implement `applyConfig(config)` method for hot-reload
- If no `applyConfig()`, service is removed and re-added with new config

## Implementation Steps

1. **Service-Specific Provider Registration**
   - Each service maintains its own provider registry
   - Providers register directly with target service
   - Services expose `registerProvider(name, provider)` method

2. **ConfigService with Interactive Setup**
   - Implement ConfigService with environment scanning
   - Interactive wizard triggered by `--reconfigure` flag or `/reconfigure` command
   - Scan env vars, then prompt user for each service configuration
   - Services implement `getConfigurationPrompts()` method

3. **Service Hot-Reload Interface**
   - Add `applyConfig(config)` method to services that support it
   - ConfigService handles service reconfiguration on state changes
   - Remove/re-add services that don't support hot-reload

4. **Interactive Configuration Flow**
   - ModelConfigState scans for `*_API_KEY` env vars, prompts for model selection
   - FilesystemConfigState shows available providers, prompts for setup
   - WebSearchConfigState detects keys, prompts for search provider preferences
   - Each service defines its own configuration prompts and validation

5. **Reactive Config Updates**
   - State mutations trigger service reconfiguration
   - Event emission for config change notifications
   - Automatic persistence to SQLite on mutations

## Benefits

- **Auto-Discovery**: Services auto-configure based on environment
- **Service-Owned Providers**: Each service manages its own providers
- **Hot-Reload**: Config changes apply immediately without restart
- **Persistence**: Config changes survive application restarts
- **Consistency**: Same state mutation pattern as Agent class
- **Interactive Setup**: `--reconfigure` guides user through complete configuration
- **Runtime Config**: `/reconfigure` command allows reconfiguration during chat

## Usage Example

```typescript
// Provider registration with respective services
filesystemService.registerProvider('local', LocalFileSystemProvider);
websearchService.registerProvider('serper', SerperWebSearchProvider);

// Interactive reconfiguration
if (reconfigure) {
  await configService.runConfigurationWizard();
}

// Service configuration interface
class AIService {
  getConfigurationPrompts(): ConfigPrompt[] {
    return [
      { type: 'select', name: 'defaultModel', message: 'Select default model', choices: [...] },
      { type: 'confirm', name: 'enableOpenAI', message: 'Enable OpenAI?', when: () => !!process.env.OPENAI_API_KEY }
    ];
  }
  
  applyConfig(config: AIConfig) {
    // Hot-reload configuration
  }
}

// Chat command usage
// User types: /reconfigure
// -> Triggers configService.runConfigurationWizard()
// -> Walks through each service's configuration prompts
```

This approach maintains consistency with the existing Agent architecture while providing persistent, reactive configuration management.