#!/usr/bin/env node

import TokenRingApp, {PluginManager} from "@tokenring-ai/app";
import buildTokenRingAppConfig from "@tokenring-ai/app/buildTokenRingAppConfig";
import {AudioServiceConfigSchema} from "@tokenring-ai/audio";
import {ChatServiceConfigSchema} from "@tokenring-ai/chat/schema";
import {CheckpointConfigSchema} from "@tokenring-ai/checkpoint";
import {CLIConfigSchema} from "@tokenring-ai/cli";
import {InkCLIConfigSchema} from "@tokenring-ai/cli-ink";
import {FileSystemConfigSchema} from "@tokenring-ai/filesystem/schema";
import formatLogMessages from "@tokenring-ai/utility/string/formatLogMessage";
import {WebHostConfigSchema} from "@tokenring-ai/web-host";
import chalk from "chalk";
import {Command} from "commander";
import path from "path";
import {z} from "zod";
import packageInfo from '../package.json' with {type: 'json'};
import agents from "./agents/index.ts";
import bannerNarrow from "./banner.narrow.txt" with {type: "text"};
import bannerWide from "./banner.wide.txt" with {type: "text"};
import bannerCompact from "./banner.compact.txt" with {type: "text"};
import {configSchema, plugins} from "./plugins.ts";

// Interface definitions
interface CommandOptions {
  workingDirectory: string;
  dataDirectory: string;
  http?: string;
  httpPassword?: string;
  httpBearer?: string;
  ui: "ink" | "inquirer" | "none";
}

// Create a new Commander program
const program = new Command();

program
  .name("tr-coder")
  .description("TokenRing Coder - AI-powered coding assistant")
  .version(packageInfo.version)
  .option("--ui <inquirer|ink|none>", "Select the UI to use for the application", "inquirer")
  .option("--workingDirectory <path>", "Path to the working directory to work in (default: cwd)", ".")
  .option("--dataDirectory <path>", "Path to the data directory to use to store data (knowledge, session database, etc.) (default: <workingDirectory>/.tokenring)", "")
  .option("--http [host:port]", "Starts an HTTP server for interacting with the application, by default listening on 127.0.0.1 and a random port, unless host and port are specified")
  .option("--httpPassword <user:password>", "Username and password for authentication with the webui (default: No auth required)")
  .option("--httpBearer <user:bearer>", "Username and bearer token for authentication with the webui (default: No auth required)")
  .addHelpText(
    "after",
    `
Examples:
  tr-coder
  tr-coder --workingDirectory ./my-app --dataDirectory ./my-data
`,
  )
  .action(runApp)
  .parse();

async function runApp({workingDirectory, dataDirectory, ui, http, httpPassword, httpBearer}: CommandOptions): Promise<void> {
  try {
    workingDirectory = path.resolve(workingDirectory);
    dataDirectory = path.resolve(dataDirectory || path.join(workingDirectory, "/.tokenring"));

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

    const defaultConfig = {
      chat: {
        defaultModels: [
          'llamacpp:*',
          'zai:glm-4.7',
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
        },
        providers: {
          local: {
            type: "local",
            baseDirectory: workingDirectory,
          }
        }
      } satisfies z.input<typeof FileSystemConfigSchema>,
      checkpoint: {
        provider: {
          type: "sqlite",
          databasePath: path.resolve(dataDirectory, "./coder-database.sqlite"),
        }
      } satisfies z.input<typeof CheckpointConfigSchema>,
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
      ...(ui === 'inquirer' && {
        cli: {
          chatBanner: `TokenRing Coder ${packageInfo.version}`,
          screenBanner: `TokenRing Coder ${packageInfo.version}`,
          loadingBannerWide: bannerWide,
          loadingBannerNarrow: bannerNarrow,
          loadingBannerCompact: bannerCompact,
        } satisfies z.input<typeof CLIConfigSchema>
      }),
      ...(ui === 'ink' && {
        inkCLI: {
          bannerNarrow,
          bannerWide,
          bannerCompact: `🤖 TokenRing Coder ${packageInfo.version} - https://tokenring.ai`
        } satisfies z.input<typeof InkCLIConfigSchema>
      }),
      ...(http && {
        webHost: {
          host: listenHost,
          ...(listenPort && {port: listenPort}),
          auth,
        } satisfies z.input<typeof WebHostConfigSchema>
      }),
      agents,
      tasks: {}
    };

    // TODO: Figure out a more elegant way to bundle SPA apps into a Single Executable
    let packageDirectory = path.resolve(import.meta.dirname, "../");
    if (packageDirectory.startsWith("/$bunfs")) {
      packageDirectory = path.resolve(process.execPath, "../");
    }

    const appConfig = await buildTokenRingAppConfig({
      workingDirectory: workingDirectory,
      dataDirectory: dataDirectory,
      configSchema,
      configFileName: 'coder-config',
      defaultConfig
    });

    const app = new TokenRingApp(packageDirectory, appConfig);

    const pluginManager = new PluginManager(app);

    await pluginManager.installPlugins(plugins)

    await app.run();
  } catch (err) {
    console.error(chalk.red(formatLogMessages(['Caught Error: ', err as Error])));
    process.exit(1);
  }
}