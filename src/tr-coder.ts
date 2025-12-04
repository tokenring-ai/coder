#!/usr/bin/env node

import AgentPackage from "@tokenring-ai/agent";
import AIClientPackage from "@tokenring-ai/ai-client";
import TokenRingApp, {PluginManager} from "@tokenring-ai/app";
import {TokenRingAppConfigSchema} from "@tokenring-ai/app/TokenRingApp";
import AudioPackage, {AudioConfigSchema} from "@tokenring-ai/audio";
import AWSPackage from "@tokenring-ai/aws";
import ChatPackage from "@tokenring-ai/chat";
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
  ui: "ink" | "inquirer";
}

// Create a new Commander program
const program = new Command();

program
  .name("tr-coder")
  .description("TokenRing Coder - AI-powered coding assistant")
  .version(packageInfo.version)
  .option("-s, --source <path>", "Path to the working directory to work with")
  .option("--ui <inquirer|ink>", "Select the UI to use for prompts", "inquirer")
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

async function runApp({source, config: configFile, initialize, ui}: CommandOptions): Promise<void> {
  try {
  // noinspection JSCheckFunctionSignatures
  const resolvedSource = path.resolve(source);

  if (!fs.existsSync(resolvedSource)) {
    throw new Error(`Source directory not found: ${resolvedSource}`);
  }

  const configDirectory = path.join(resolvedSource, "/.tokenring");

  if (!configFile) {
    // Try each extension in order
    const possibleExtensions = ["ts","mjs", "cjs", "js"];
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
    throw new Error(
      `Source directory ${resolvedSource} does not contain a .tokenring/coder-config.{mjs,cjs,js} file.\n` +
      `You can create one by adding --initialize:\n` +
      `./tr-coder --source ${resolvedSource} --initialize`,
    );
  }

  const baseDirectory = resolvedSource;

  const defaultConfig = {
    filesystem: {
      defaultProvider: "local",
      providers: {
        local: {
          type: "local",
          baseDirectory,
        }
      }
    } as z.input<typeof FileSystemConfigSchema>,
    checkpoint: {
      defaultProvider: "sqlite",
      providers: {
        sqlite: {
          type: "sqlite",
          databasePath: path.resolve(configDirectory, "./coder-database.sqlite"),
        }
      }
    } as z.input<typeof CheckpointPackageConfigSchema>,
    audio: {
      defaultProvider: "linux",
      providers: {
        linux: {
          type: "linux"
        }
      }
    } as z.input<typeof AudioConfigSchema>,
    cli: {
      banner: bannerNarrow,
      bannerColor: "cyan"
    } as z.input<typeof CLIConfigSchema>,
    inkCLI: {
      bannerNarrow,
      bannerWide,
      bannerCompact: `🤖 TokenRing Coder ${packageInfo.version} - https://tokenring.ai`
    } as z.input<typeof InkCLIConfigSchema>,
    webHost: {
      resources: {
        "Chat Frontend": {
          description: "Chat frontend for the Coder application",
          type: "static",
          root: path.resolve(import.meta.dirname, "../../../frontend/chat/dist"),
          indexFile: "index.html",
          notFoundFile: "index.html",
          prefix: "/chat"
        }
      }
    } as z.input<typeof WebHostConfigSchema>,
    agents
  };

  const configImport = await import(configFile);
  const config = TokenRingAppConfigSchema.parse(configImport.default);

  config.agents = { ...agents, ...config.agents};

  const app = new TokenRingApp(config, defaultConfig);

  const pluginManager = new PluginManager(app);

  await pluginManager.installPlugins([
    AgentPackage,
    AudioPackage,
    AIClientPackage,
    CheckpointPackage,
    AWSPackage,
    ChatPackage,
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
    WebHostPackage,
    //WebFrontendPackage,
    WebSearchPackage,
  ]);

    if (ui === "ink") {
      await pluginManager.installPlugins([
        InkCLIPackage,
      ]);
    } else {
      await pluginManager.installPlugins([
        CLIPackage,
      ]);
    }

    await app.startServices();

  } catch (err) {
    console.error(chalk.red(formatLogMessages(['Caught Error: ', err as Error])));
    process.exit(1);
  }
}