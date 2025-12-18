#!/usr/bin/env node

import AgentPackage from "@tokenring-ai/agent";
import AIClientPackage from "@tokenring-ai/ai-client";
import TokenRingApp, {PluginManager} from "@tokenring-ai/app";
import {TokenRingAppConfigSchema} from "@tokenring-ai/app/TokenRingApp";
import AudioPackage, {AudioConfigSchema} from "@tokenring-ai/audio";
import AWSPackage from "@tokenring-ai/aws";
import ChatPackage from "@tokenring-ai/chat";
import ChatFrontendPackage from "@tokenring-ai/chat-frontend";
import CheckpointPackage, {CheckpointPackageConfigSchema} from "@tokenring-ai/checkpoint";
import ChromePackage from "@tokenring-ai/chrome";
import CLIPackage, {CLIConfigSchema} from "@tokenring-ai/cli";
import InkCLIPackage, {InkCLIConfigSchema} from "@tokenring-ai/cli-ink";
import CodeWatchPackage from "@tokenring-ai/code-watch";
import CodeBasePackage from "@tokenring-ai/codebase";
import DatabasePackage from "@tokenring-ai/database";
import DockerPackage from "@tokenring-ai/docker";
import DrizzleStoragePackage from "@tokenring-ai/drizzle-storage";
import FeedbackPackage from "@tokenring-ai/feedback";
import FileIndexPackage from "@tokenring-ai/file-index";
import FilesystemPackage, {FileSystemConfigSchema} from "@tokenring-ai/filesystem";
import GitPackage from "@tokenring-ai/git";
import JavascriptPackage from "@tokenring-ai/javascript";
import KubernetesPackage from "@tokenring-ai/kubernetes";
import LinuxAudioPackage from "@tokenring-ai/linux-audio";
import LocalFileSystemPackage from "@tokenring-ai/local-filesystem";
import MCPPackage from "@tokenring-ai/mcp";
import MemoryPackage from "@tokenring-ai/memory";
import MySQLPackage from "@tokenring-ai/mysql";
import QueuePackage from "@tokenring-ai/queue";
import SandboxPackage from "@tokenring-ai/sandbox";
import ScraperAPIPackage from "@tokenring-ai/scraperapi";
import ScriptingPackage from "@tokenring-ai/scripting";
import SerperPackage from "@tokenring-ai/serper";
import SlackPackage from "@tokenring-ai/slack";
import TasksPackage from "@tokenring-ai/tasks";
import TelegramPackage from "@tokenring-ai/telegram";
import TestingPackage from "@tokenring-ai/testing";
import ThinkingPackage from "@tokenring-ai/thinking"
import formatLogMessages from "@tokenring-ai/utility/string/formatLogMessage";
import WebHostPackage, {WebHostConfigSchema} from "@tokenring-ai/web-host";
import WebSearchPackage from "@tokenring-ai/websearch";
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
      } satisfies z.input<typeof CheckpointPackageConfigSchema>,
      audio: {
        defaultProvider: "linux",
        providers: {
          linux: {
            type: "linux"
          }
        }
      } satisfies z.input<typeof AudioConfigSchema>,
      cli: {
        bannerNarrow,
        bannerWide,
        bannerCompact: `🤖 TokenRing Coder ${packageInfo.version} - https://tokenring.ai`
      } satisfies z.input<typeof CLIConfigSchema>,

      inkCLI: {
        bannerNarrow,
        bannerWide,
        bannerCompact: `🤖 TokenRing Coder ${packageInfo.version} - https://tokenring.ai`
      } satisfies z.input<typeof InkCLIConfigSchema>,
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

    await pluginManager.installPlugins([
      AgentPackage,
      AudioPackage,
      AIClientPackage,
      CheckpointPackage,
      AWSPackage,
      ChatPackage,
      ChatFrontendPackage,
      CodeWatchPackage,
      CodeBasePackage,
      DatabasePackage,
      DockerPackage,
      DrizzleStoragePackage,
      ChromePackage,
      MySQLPackage,
      ScraperAPIPackage,
      ScriptingPackage,
      SerperPackage,
      TestingPackage,
      FeedbackPackage,
      FileIndexPackage,
      FilesystemPackage,
      GitPackage,
      JavascriptPackage,
      KubernetesPackage,
      LinuxAudioPackage,
      LocalFileSystemPackage,
      MCPPackage,
      MemoryPackage,
      QueuePackage,
      SandboxPackage,
      SlackPackage,
      TasksPackage,
      TelegramPackage,
      ThinkingPackage,
      WebHostPackage,
      //WebFrontendPackage,
      WebSearchPackage,
    ]);

    if (ui === "ink") {
      await pluginManager.installPlugins([InkCLIPackage]);
    } else if (ui === "inquirer") {
      await pluginManager.installPlugins([CLIPackage]);
    } else {
      console.log("App running in headless mode")
    }

    await app.run();
  } catch (err) {
    console.error(chalk.red(formatLogMessages(['Caught Error: ', err as Error])));
    process.exit(1);
  }
}