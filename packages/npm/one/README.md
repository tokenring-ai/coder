# TokenRing One

TokenRing One is a local AI assistant for software development, research, content creation, and workflow automation. This npm package installs the `tokenring` command and runs the prebuilt native binary for your platform.

## Install

Run directly with npm:

```bash
npx @tokenring-ai/one
```

Or install globally:

```bash
npm install -g @tokenring-ai/one
tokenring
```

## Requirements

- macOS arm64, Linux x64, or Linux arm64
- At least one AI provider API key
- Git, if you want TokenRing One to operate on repositories

Set whichever provider keys you use:

```bash
export OPENAI_API_KEY=sk-...
export ANTHROPIC_API_KEY=sk-ant-...
export GOOGLE_GENERATIVE_AI_API_KEY=...
export GROQ_API_KEY=...
export OPENROUTER_API_KEY=...
```

## Usage

Start TokenRing One in the current directory:

```bash
tokenring
```

Start in a specific project:

```bash
tokenring --projectDirectory ./my-project
```

Run a one-shot prompt and exit when complete:

```bash
tokenring -p "Fix the failing tests"
```

Start the web interface:

```bash
tokenring --http 127.0.0.1:3000
```

Use ACP mode over stdin/stdout:

```bash
tokenring --acp --projectDirectory ./my-project
```

## Authentication

When serving the web UI, enable authentication with `--auth` and provide a password or bearer token:

```bash
TR_AUTH_PASSWORD=user:secure-password tokenring --http 127.0.0.1:3000 --auth
TR_AUTH_BEARER=user:secure-token tokenring --http 127.0.0.1:3000 --auth
```

## Supported Platforms

This package currently ships prebuilt binaries for:

- `darwin-arm64`
- `linux-x64`
- `linux-arm64`

Unsupported platforms exit with an explanatory error.

## Package Contents

The npm package contains:

- `tokenring.js`, the launcher script exposed as the `tokenring` command
- `bin/<platform>/tokenring`, the prebuilt TokenRing One binary
- native PortAudio libraries where required
- `frontend/`, the bundled web frontend used by `--http`

## Links

- Repository: https://github.com/tokenring-ai/one
- Monorepo: https://github.com/tokenring-ai/monorepo
- Packages: https://github.com/orgs/tokenring-ai/packages
