#!/usr/bin/env node

import {ACPConfigSchema} from "@tokenring-ai/acp";
import TokenRingApp, {PluginManager} from "@tokenring-ai/app";
import buildTokenRingAppConfig from "@tokenring-ai/app/buildTokenRingAppConfig";
import type {AudioServiceConfigSchema} from "@tokenring-ai/audio";
import type {ChatServiceConfigSchema} from "@tokenring-ai/chat/schema";
import type {CLIConfigSchema} from "@tokenring-ai/cli";
import type {DrizzleStorageConfigSchema} from "@tokenring-ai/drizzle-storage/schema";
import type {FileSystemConfigSchema} from "@tokenring-ai/filesystem/schema";
import type {TerminalConfigSchema} from "@tokenring-ai/terminal/schema";
import formatLogMessages from "@tokenring-ai/utility/string/formatLogMessage";
import type {WebHostConfigSchema} from "@tokenring-ai/web-host/schema";
import chalk from "chalk";
import {Command} from "commander";
import fs from "fs";
import path from "path";
import {z} from "zod";
import packageInfo from '../package.json' with {type: 'json'};
import agents from "./agents/index.ts";
import bannerNarrow from "./banner.narrow.txt" with {type: "text"};
import bannerWide from "./banner.wide.txt" with {type: "text"};
import bannerCompact from "./banner.compact.txt" with {type: "text"};
import {configSchema, plugins} from "./plugins.ts";
import os from 'os';

// Interface definitions
interface CommandOptions {
  projectDirectory: string;
  dataDirectory: string;
  acp: boolean;
  http?: string;
  httpPassword?: string;
  httpBearer?: string;
  ui: "opentui" | "ink" | "none";
  agent: string;
  p: boolean;
  args: string[];
}

// Create a new Commander program
const program = new Command();

program
  .name("tr-coder")
  .description("TokenRing Coder - AI-powered coding assistant")
  .version(packageInfo.version)
  .option("--ui <opentui|ink|none>", "Select the UI to use for the application", "opentui")
  .option("--projectDirectory <path>", "Path to the working directory to work in (default: cwd)", ".")
  .option("--dataDirectory <path>", "Path to the data directory to use to store data (knowledge, session database, etc.) (default: <projectDirectory>/.tokenring)", "")
  .option("--acp", "Start the app in ACP mode over stdin/stdout")
  .option("--http [host:port]", "Starts an HTTP server for interacting with the application, by default listening on 127.0.0.1 and a random port, unless host and port are specified")
  .option("--httpPassword <user:password>", "Username and password for authentication with the webui (default: No auth required)")
  .option("--httpBearer <user:bearer>", "Username and bearer token for authentication with the webui (default: No auth required)")
  .option("--agent <type>", "Agent type to start with", "code")
  .option("-p", "Enable shutdown when done")
  .allowExcessArguments(true)
  .addHelpText(
    "after",
    `
Examples:
  tr-coder
  tr-coder --projectDirectory ./my-app --dataDirectory ./my-data
  tr-coder --acp --projectDirectory ./my-app
  tr-coder --agent leader "Create a new React component"
  tr-coder -p "Fix the bug in app.ts"
`,
  )
  .action(runApp)
  .parse();

async function runApp({projectDirectory, dataDirectory, acp, ui, http, httpPassword, httpBearer, agent, p}: CommandOptions): Promise<void> {
  const args = program.args;
  try {
    if (acp && args.length > 0) {
      throw new Error("ACP mode does not support positional startup prompts");
    }

    projectDirectory = path.resolve(projectDirectory);
    dataDirectory = path.resolve(dataDirectory || path.join(projectDirectory, "/.tokenring"));
    const configDirectory = path.join(os.homedir(),"/.tokenring");
    if (! fs.existsSync(configDirectory)) {
      fs.mkdirSync(configDirectory, {recursive: true});
    }

    let auth: z.infer<typeof WebHostConfigSchema>["auth"] = undefined;
    if (httpPassword) {
      const [username, password] = httpPassword.split(":");
      ((auth ??= {users: {}}).users[username] ??= {}).password = password;
    }
    if (httpBearer) {
      const [username, bearerToken] = httpBearer.split(":");
      ((auth ??= {users: {}}).users[username] ??= {}).bearerToken = bearerToken;
    }

    const [listenHost, listenPortStr] = http?.split?.(":") ?? ['127.0.0.1', ''];
    let listenPort = listenPortStr ? parseInt(listenPortStr) : undefined;
    if (listenPort && isNaN(listenPort)) {
      console.error(`Invalid port number: ${listenPort}`);
      process.exit(1);
    }


    // TODO: Figure out a more elegant way to bundle SPA apps into a Single Executable
    let packageDirectory = path.resolve(import.meta.dirname, "../");
    if (packageDirectory.startsWith("/$bunfs")) {
      packageDirectory = path.resolve(process.execPath, "../");
    }



    const defaultConfig = {
      app: {
        configSchema,
        configFileName: 'coder-config',
        dataDirectory,
      },
      checkpoint: {
        app: {
          projectDirectory,
        },
      },
      chatFrontend: {
        spaDirectory: path.resolve(packageDirectory,"frontend/chat")
      },
      chat: {
        defaultModels: [
          'llamacpp:*',
          'zai:glm-5',
          'openrouter:openrouter/auto',
          'openai:gpt-5-mini',
          'anthropic:claude-4.5-haiku',
          'google:gemini-3-flash-preview',
          'xai:grok-code-fast-1',
          'deepseek:deepseek-chat',
          'qwen:qwen3-coder-flash',
          '*'
        ]
      } as z.input<typeof ChatServiceConfigSchema>,
      filesystem: {
        agentDefaults: {
          provider: "local",
          workingDirectory: projectDirectory,
        },
        providers: {
          local: {
            type: "posix",
          }
        }
      } satisfies z.input<typeof FileSystemConfigSchema>,
      terminal: {
        agentDefaults: {
          provider: "local",
          workingDirectory: projectDirectory,
        },
        providers: {
          local: {
            type: "posix",
          }
        }
      } satisfies z.input<typeof TerminalConfigSchema>,
      drizzleStorage: {
        type: "sqlite",
        databasePath: path.resolve(configDirectory, "./coder-database.sqlite"),
      } satisfies z.input<typeof DrizzleStorageConfigSchema>,
      lifecycle: {
        agentDefaults: {
          enabledHooks: [
            "autoCheckpoint",
            "clearReadFiles",
            "todoCompletionCheck",
            "injectSubagentResults",
          ],
        }
      },
      audio: {
        agentDefaults: {
          provider: "linux",
        },
        providers: {
          linux: {
            type: "linux"
          }
        }
      } satisfies z.input<typeof AudioServiceConfigSchema>,
      sandbox: {
        agentDefaults: {
          provider: "docker",
        },
        providers: {
          docker: {
            type: "docker"
          }
        }
      },
      ...(acp && {
        acp: {
          transport: "stdio",
          defaultAgentType: agent,
        } satisfies z.input<typeof ACPConfigSchema>
      }),
      ...(!acp && ui !== 'none' && {
        cli: {
          chatBanner: `TokenRing Coder ${packageInfo.version}`,
          screenBanner: `TokenRing Coder ${packageInfo.version}`,
          loadingBannerWide: bannerWide,
          loadingBannerNarrow: bannerNarrow,
          loadingBannerCompact: bannerCompact,
          uiFramework: ui,
          ...(args.length > 0 && {
            startAgent: {
              type: agent,
              prompt: args.join(' '),
              shutdownWhenDone: p,
            }
          }),
        } satisfies z.input<typeof CLIConfigSchema>
      }),
      ...(http && {
        webHost: {
          host: listenHost,
          ...(listenPort && {port: listenPort}),
          auth,
        } satisfies z.input<typeof WebHostConfigSchema>
      }),
      agents: {
        app: agents
      },
      tasks: {},
    } satisfies z.input<typeof configSchema>;


    const appConfig = await buildTokenRingAppConfig<typeof configSchema>(defaultConfig);
    const app = new TokenRingApp(appConfig);

    const pluginManager = new PluginManager(app);

    await pluginManager.installPlugins(plugins)


    await app.run();
  } catch (err) {
    process.stdout.write("\u001B[2J\u001B[H\n\n");
    console.error(chalk.red(formatLogMessages(['Caught Error: ', err as Error])));
  }
}
