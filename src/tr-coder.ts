#!/usr/bin/env node

import AgentPlugin from "@tokenring-ai/agent/plugin";
import AIClientPlugin from "@tokenring-ai/ai-client/plugin";
import TokenRingApp, {PluginManager} from "@tokenring-ai/app";
import {TokenRingAppConfigSchema} from "@tokenring-ai/app/TokenRingApp";
import AudioPlugin from "@tokenring-ai/audio/plugin";
import {AudioConfigSchema} from "@tokenring-ai/audio";
import AWSPlugin from "@tokenring-ai/aws/plugin";
import ChatPlugin from "@tokenring-ai/chat/plugin";
import ChatFrontendPlugin from "@tokenring-ai/chat-frontend/plugin";
import CheckpointPlugin from "@tokenring-ai/checkpoint/plugin";
import {CheckpointPluginConfigSchema} from "@tokenring-ai/checkpoint";
import ChromePlugin from "@tokenring-ai/chrome/plugin";
import CLIPlugin from "@tokenring-ai/cli/plugin";
import {CLIConfigSchema} from "@tokenring-ai/cli";
import InkCLIPlugin from "@tokenring-ai/cli-ink/plugin";
import {InkCLIConfigSchema} from "@tokenring-ai/cli-ink";
import CodeWatchPlugin from "@tokenring-ai/code-watch/plugin";
import CodeBasePlugin from "@tokenring-ai/codebase/plugin";
import DatabasePlugin from "@tokenring-ai/database/plugin";
import DockerPlugin from "@tokenring-ai/docker/plugin";
import DrizzleStoragePlugin from "@tokenring-ai/drizzle-storage/plugin";
import FeedbackPlugin from "@tokenring-ai/feedback/plugin";
import FileIndexPlugin from "@tokenring-ai/file-index/plugin";
import FilesystemPlugin from "@tokenring-ai/filesystem/plugin";
import {FileSystemConfigSchema} from "@tokenring-ai/filesystem";
import GitPlugin from "@tokenring-ai/git/plugin";
import JavascriptPlugin from "@tokenring-ai/javascript/plugin";
import KubernetesPlugin from "@tokenring-ai/kubernetes/plugin";
import LinuxAudioPlugin from "@tokenring-ai/linux-audio/plugin";
import LocalFileSystemPlugin from "@tokenring-ai/local-filesystem/plugin";
import MCPPlugin from "@tokenring-ai/mcp/plugin";
import MemoryPlugin from "@tokenring-ai/memory/plugin";
import MySQLPlugin from "@tokenring-ai/mysql/plugin";
import QueuePlugin from "@tokenring-ai/queue/plugin";
import ResearchPlugin from "@tokenring-ai/research/plugin";
import SandboxPlugin from "@tokenring-ai/sandbox/plugin";
import SchedulerPlugin from "@tokenring-ai/scheduler/plugin";
import ScraperAPIPlugin from "@tokenring-ai/scraperapi/plugin";
import ScriptingPlugin from "@tokenring-ai/scripting/plugin";
import SerperPlugin from "@tokenring-ai/serper/plugin";
import SlackPlugin from "@tokenring-ai/slack/plugin";
import TasksPlugin from "@tokenring-ai/tasks/plugin";
import TelegramPlugin from "@tokenring-ai/telegram/plugin";
import TestingPlugin from "@tokenring-ai/testing/plugin";
import ThinkingPlugin from "@tokenring-ai/thinking/plugin"
import VaultPlugin from "@tokenring-ai/vault/plugin";
import WebHostPlugin from "@tokenring-ai/web-host/plugin";
import {WebHostConfigSchema} from "@tokenring-ai/web-host";
import WebSearchPlugin from "@tokenring-ai/websearch/plugin";
import WorkflowPlugin from "@tokenring-ai/workflow/plugin";
import chalk from "chalk";
import {Command} from "commander";
import fs from "node:fs";
import path from "path";
import {z} from "zod";
import packageInfo from '../package.json' with {type: 'json'};
import agents from "./agents/index.ts";
import bannerNarrow from "./banner.narrow.txt" with {type: "text"};
import bannerWide from "./banner.wide.txt" with {type: "text"};
import {initializeConfigDirectory} from "./initializeConfigDirectory.js";
import formatLogMessages from "@tokenring-ai/utility/string/formatLogMessage";

const plugins = [
  AgentPlugin,
  AIClientPlugin,
  AudioPlugin,
  AWSPlugin,
  ChatFrontendPlugin,
  ChatPlugin,
  CLIPlugin,
  CheckpointPlugin,
  ChromePlugin,
  CodeBasePlugin,
  CodeWatchPlugin,
  DatabasePlugin,
  DockerPlugin,
  DrizzleStoragePlugin,
  FeedbackPlugin,
  FileIndexPlugin,
  FilesystemPlugin,
  GitPlugin,
  InkCLIPlugin,
  JavascriptPlugin,
  KubernetesPlugin,
  LinuxAudioPlugin,
  LocalFileSystemPlugin,
  MCPPlugin,
  MemoryPlugin,
  MySQLPlugin,
  ResearchPlugin,
  QueuePlugin,
  SandboxPlugin,
  SchedulerPlugin,
  ScraperAPIPlugin,
  ScriptingPlugin,
  SerperPlugin,
  SlackPlugin,
  TasksPlugin,
  TelegramPlugin,
  TestingPlugin,
  ThinkingPlugin,
  VaultPlugin,
  WebHostPlugin,
  WebSearchPlugin,
  WorkflowPlugin,
];

// Interface definitions
interface CommandOptions {
  source: string;
  config?: string;
  initialize?: boolean;
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
  .option("-s, --source <path>", "Path to the working directory to work with (default: cwd)", ".")
  .option("--http [host:port]", "Starts an HTTP server for interacting with the application, by default listening on 127.0.0.1 and a random port, unless host and port are specified")
  .option("--httpPassword <user:password>", "Username and password for authentication with the webui (default: No auth required)")
  .option("--httpBearer <user:bearer>", "Username and bearer token for authentication with the webui (default: No auth required)")
  .option(
    "-i, --initialize",
    "Initialize the source directory with a new config directory",
  )
  .addHelpText(
    "after",
    `
Examples:
  tr-coder --source ./my-app
  tr-coder --source ./my-app --initialize
`,
  )
  .action(runApp)
  .parse();

async function runApp({source, config: configFile, initialize, ui, http, httpPassword, httpBearer}: CommandOptions): Promise<void> {
  try {
    // noinspection JSCheckFunctionSignatures
    const resolvedSource = path.resolve(source);

    if (!fs.existsSync(resolvedSource)) {
      throw new Error(`Source directory not found: ${resolvedSource}`);
    }

    const configDirectory = path.join(resolvedSource, "/.tokenring");

    if (!configFile) {
      // Try each extension in order
      const possibleExtensions = ["ts", "mjs", "cjs", "js"];
      for (const ext of possibleExtensions) {
        const potentialConfig = path.join(configDirectory, `coder-config.${ext}`);
        if (fs.existsSync(potentialConfig)) {
          configFile = potentialConfig;
          break;
        }
      }
    }

    if (!configFile && initialize) {
      configFile = initializeConfigDirectory(configDirectory);
    }

    if (!configFile) {
      console.error(
        `Source directory ${resolvedSource} does not contain a .tokenring/coder-config.{mjs,cjs,js} file.\n` +
        `You can create one by adding --initialize:\n` +
        `./tr-coder --source ${resolvedSource} --initialize`,
      );
      process.exit(1);
    }

    //console.log("Loading configuration from: ", configFile);

    const baseDirectory = resolvedSource;

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
      filesystem: {
        defaultProvider: "local",
        providers: {
          local: {
            type: "local",
            baseDirectory,
          }
        }
      } satisfies z.input<typeof FileSystemConfigSchema>,
      checkpoint: {
        defaultProvider: "sqlite",
        providers: {
          sqlite: {
            type: "sqlite",
            databasePath: path.resolve(configDirectory, "./coder-database.sqlite"),
          }
        }
      } satisfies z.input<typeof CheckpointPluginConfigSchema>,
      audio: {
        defaultProvider: "linux",
        providers: {
          linux: {
            type: "linux"
          }
        }
      } satisfies z.input<typeof AudioConfigSchema>,
      ...(ui === 'inquirer' && {
        cli: {
          bannerNarrow,
          bannerWide,
          bannerCompact: `🤖 TokenRing Coder ${packageInfo.version} - https://tokenring.ai`
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
      agents
    };

    const configImport = await import(configFile);
    const config = TokenRingAppConfigSchema.parse(configImport.default);

    config.agents = {...agents, ...(config.agents ?? {})};

    // TODO: Figure out a more elegant way to bundle SPA apps into a Single Executable
    let packageDirectory = path.resolve(import.meta.dirname, "../");
    if (packageDirectory.startsWith("/$bunfs")) {
      packageDirectory = path.resolve(process.execPath, "../");
    }

    const app = new TokenRingApp(packageDirectory, config, defaultConfig);

    const pluginManager = new PluginManager(app);

    await pluginManager.installPlugins(plugins)

    await app.run();
  } catch (err) {
    console.error(chalk.red(formatLogMessages(['Caught Error: ', err as Error])));
    process.exit(1);
  }
}