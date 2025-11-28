# Complete Command Reference

This document provides a comprehensive reference for all available chat commands in the TokenRing Coder application. The commands are organized by category based on their functionality and the packages they belong to.

## Command Categories

### AI & Chat Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/tools` | List, enable, disable, or set enabled tools for the chat session | `/tools [enable\|disable\|set] <tool1> <tool2> ...` |
| `/model` | Set or show the target model for chat | `/model [model_name]` |
| `/compact` | Compact conversation context by summarizing prior messages | `/compact` |
| `/chat` | Send a message to the chat service | `/chat [message]` |
| `/ai` | Update AI configuration settings, manage features, or show context | `/ai settings key=value [key=value...]` |

### Agent Control Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/work` | Runs the agents work handler with the message | `/work [message]` |
| `/settings` | Show current chat settings | `/settings` |
| `/reset` | Clear chat state and/or memory and/or settings | `/reset [chat\|memory\|settings\|all]...` |
| `/hooks` | List registered hooks or enable/disable hook execution | `/hooks [list\|enable\|disable] [hookName]` |
| `/debug` | Toggle debug logging | `/debug [on\|off]` |

### System Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/help` | Show this help message | `/help` |
| `/exit` | Exit the current agent | `/exit` |
| `/quit` | Quit the current agent | `/quit` |
| `/edit` | Open your editor to write a prompt | `/edit [text]` |
| `/multi` | Opens an editor for multiline input | `/multi` |

### Scripting Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/var` | Define or assign variables | `/var $name = value\|llm("prompt")` |
| `/vars` | List all variables or show specific variable | `/vars [$name]` |
| `/list` | Define or assign lists | `/list @name = ["item1", "item2"]` |
| `/lists` | List all lists or show specific list | `/lists [@name]` |
| `/if` | Conditional execution | `/if $condition { commands } [else { commands }]` |
| `/for` | Iterate over lists | `/for $item in @list { commands }` |
| `/while` | Execute commands while condition is truthy | `/while $condition { commands }` |
| `/func` | Define functions | `/func [static\|llm\|js] name($param) => "text"` |
| `/funcs` | List all functions or show specific function | `/funcs [name]` |
| `/call` | Call a function and display output | `/call functionName("arg1", "arg2")` |
| `/echo` | Display text or variable value | `/echo <text\|$var>` |
| `/sleep` | Sleep for specified seconds | `/sleep <seconds\|$var>` |
| `/prompt` | Prompt user for input | `/prompt $var "message"` |
| `/confirm` | Prompt user for yes/no confirmation | `/confirm $var "message"` |
| `/script` | Run predefined chat command scripts | `/script [list\|run\|info]` |

### Git Operations
| Command | Description | Usage |
|---------|-------------|-------|
| `/git` | Git operations | `/git <commit\|rollback\|branch> [options]` |

### File Operations
| Command | Description | Usage |
|---------|-------------|-------|
| `/file` | Manage files in the chat session | `/file [action] [files...]` |

### Search & Discovery
| Command | Description | Usage |
|---------|-------------|-------|
| `/search` | Search for text across files in the project | `/search <query>` |

### Testing Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/test` | Run all or a specific test from any TestingService | `/test [test_name\|all]` |
| `/repair` | Run tests and automatically fix failing ones using AI | `/repair [--modify code\|test\|either] [test_name\|all]` |

### Queue Management
| Command | Description | Usage |
|---------|-------------|-------|
| `/queue` | Manage a queue of chat prompts | `/queue [add\|remove\|clear\|list\|run\|start\|next\|skip\|done]` |

### State Management
| Command | Description | Usage |
|---------|-------------|-------|
| `/memory` | Manage memory items | `/memory [list\|add\|clear\|remove\|set] [args...]` |
| `/checkpoint` | Create or restore conversation checkpoints | `/checkpoint [create\|restore\|list] [args...]` |
| `/history` | Browse agent checkpoints | `/history` |

### Voice & Audio
| Command | Description | Usage |
|---------|-------------|-------|
| `/voice` | Voice operations | `/voice [action] <text\|filename> [options]` |

### Development
| Command | Description | Usage |
|---------|-------------|-------|
| `/sandbox` | Sandbox container operations | `/sandbox [action]` |

### External Services
| Command | Description | Usage |
|---------|-------------|-------|
| `/websearch` | Web search operations | `/websearch [action] <query> [options]` |

### Workflow Control
| Command | Description | Usage |
|---------|-------------|-------|
| `/tasks` | Manage task list | `/tasks [list\|clear\|execute]` |

### Data Processing
| Command | Description | Usage |
|---------|-------------|-------|
| `/iterable` | Manage named iterables | `/iterable [define\|list\|show\|delete]` |
| `/foreach` | Run a prompt on each item in an iterable | `/foreach @<iterable> <prompt>` |

### Code Analysis
| Command | Description | Usage |
|---------|-------------|-------|
| `/codebase` | Manage codebase resources in the chat session | `/codebase [action] [resources...]` |

### Cloud Services
| Command | Description | Usage |
|---------|-------------|-------|
| `/aws` | AWS commands for authentication and status | `/aws status` |

## Detailed Command Information

### AI & Chat Commands

#### `/tools`
Manage tools available for the chat session.
- **Interactive mode**: Shows tree selection for tools grouped by package
- **Enable**: Enable specific tools
- **Disable**: Disable specific tools  
- **Set**: Set exactly which tools are enabled

#### `/model`
Set or display the AI model used for chat.
- **Interactive mode**: Shows tree selection of models grouped by provider
- **Direct mode**: Set specific model by name
- **Special values**: `auto`, `auto:reasoning`, `auto:frontier` for auto-selection

#### `/compact`
Reduce conversation context by summarizing prior messages to help with token usage.

#### `/chat`
Send a message to the AI chat service with current model and system prompt.

#### `/ai`
Configure AI settings and manage model features.
- **Settings**: Update configuration parameters
- **Features**: List, enable, or disable model features
- **Context**: Show context items that would be added to chat requests

### Agent Control Commands

#### `/work`
Invoke the agent's work handler with a specified message.

#### `/settings`
Display current agent settings for all configured items.

#### `/reset`
Clear various aspects of agent state.
- **Chat**: Reset conversation history
- **Memory**: Clear memory items
- **Settings**: Reset to defaults
- **All**: Reset everything

#### `/hooks`
Manage registered hooks for agent lifecycle events.

#### `/debug`
Toggle debug logging on/off.

### Scripting Commands

#### `/var` and `/vars`
Variable management for scripting.
- **Define**: Create or assign variables
- **List**: Show all or specific variables
- **Delete**: Remove variables

#### `/list` and `/lists`
List management for scripting.
- **Define**: Create lists with items or from variables/functions
- **List**: Show all or specific lists

#### Control Flow
- **`/if`**: Conditional execution with optional else blocks
- **`/for`**: Iterate over lists with item variables
- **`/while`**: Loop while condition is truthy

#### Functions
- **`/func`**: Define static, LLM, or JavaScript functions
- **`/funcs`**: List and manage functions
- **`/call`**: Execute functions and display results

#### I/O Operations
- **`/echo`**: Display text or variables
- **`/sleep`**: Pause execution
- **`/prompt`**: Get user input
- **`/confirm`**: Get yes/no confirmation

#### Scripts
- **`/script`**: Run predefined command scripts

### Git Operations

#### `/git`
Comprehensive Git operations.
- **Commit**: Save changes with optional message
- **Rollback**: Revert by number of commits
- **Branch**: List, create, switch, or delete branches

### File Operations

#### `/file`
Manage files in the chat session.
- **Select**: Interactive file selection
- **Add/Remove**: Manage file list
- **List**: Show current files
- **Clear**: Remove all files
- **Default**: Reset to configuration defaults

### Search & Discovery

#### `/search`
Search for text across all files in the project.

### Testing Commands

#### `/test`
Run tests from available TestingServices.
- **List**: Show available tests
- **Specific**: Run individual tests
- **All**: Run all tests

#### `/repair`
Run tests and automatically fix failures using AI.
- **Code**: Only fix underlying code
- **Test**: Only fix test code
- **Either**: Let AI decide approach

### Queue Management

#### `/queue`
Manage a queue of chat prompts for batch processing.
- **Add**: Add prompts to queue
- **Remove**: Remove by index
- **List**: Show all queued items
- **Start**: Begin queue processing
- **Next/Run**: Process next item
- **Skip**: Re-add to end
- **Done**: End processing

### State Management

#### `/memory`
Manage short-term memory items.
- **List**: Show all memory items
- **Add/Remove/Update**: Modify memory
- **Clear**: Remove all items

#### `/checkpoint` and `/history`
Save and restore conversation state.
- **Create**: Save current state
- **Restore**: Load previous state
- **List**: Browse available checkpoints

### Voice & Audio

#### `/voice`
Voice operations using audio services.
- **Record**: Record from microphone
- **Transcribe**: Convert speech to text
- **Speak**: Convert text to speech
- **Playback**: Play audio files
- **Provider**: Manage audio service providers

### Development Tools

#### `/sandbox`
Container-based development environment.
- **Create**: Start new containers
- **Exec**: Run commands in containers
- **Logs**: View container output
- **Stop/Remove**: Manage containers
- **Status**: Show active container info

### External Services

#### `/websearch`
Web search capabilities with multiple providers.
- **Search**: General web search
- **News**: Search news articles
- **Fetch**: Retrieve web page content
- **Deep**: Combined search and fetch
- **Provider**: Manage search service providers

### Workflow Control

#### `/tasks`
Manage task lists for agent workflows.
- **List**: Show all tasks with status
- **Clear**: Remove all tasks
- **Execute**: Run pending tasks

### Data Processing

#### `/iterable` and `/foreach`
Process collections of data.
- **Define**: Create named data collections
- **List/Show/Manage**: Browse iterables
- **Foreach**: Apply prompts to each item

### Code Analysis

#### `/codebase`
Manage code analysis resources.
- **Select**: Interactive resource selection
- **Enable/Disable**: Control available resources
- **List**: Show enabled resources
- **Repo-map**: Display repository structure

### Cloud Services

#### `/aws`
AWS integration for cloud operations.
- **Status**: Check authentication and account info

## Usage Tips

1. **Interactive Mode**: Many commands support interactive selection when called without arguments
2. **Help**: Use `/help` to see all available commands
3. **Tab Completion**: Commands often support tab completion for options
4. **Multi-line**: Use `/multi` for complex multi-line inputs
5. **Context**: Commands like `/ai context` show what information will be sent to AI

## Command Sources

These commands are implemented across multiple packages:
- **Chat Package**: `/tools`, `/model`, `/compact`, `/chat`, `/ai`
- **Agent Package**: `/work`, `/settings`, `/reset`, `/hooks`, `/debug`
- **CLI Package**: `/help`, `/exit`, `/quit`, `/edit`, `/multi`
- **Scripting Package**: All scripting commands (`/var`, `/list`, `/if`, etc.)
- **Testing Package**: `/test`, `/repair`
- **Queue Package**: `/queue`
- **Memory Package**: `/memory`
- **Filesystem Packages**: `/file`, `/search`
- **Git Package**: `/git`
- **Voice Package**: `/voice`
- **Sandbox Package**: `/sandbox`
- **Web Search Package**: `/websearch`
- **Tasks Package**: `/tasks`
- **Checkpoint Package**: `/checkpoint`, `/history`
- **Iterables Package**: `/iterable`, `/foreach`
- **Codebase Package**: `/codebase`
- **AWS Package**: `/aws`

Total: **47 commands** across **17 categories**