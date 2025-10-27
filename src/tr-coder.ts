#!/usr/bin/env node

import AgentPackage, {AgentConfigService, AgentPackageManager, AgentTeam} from "@tokenring-ai/agent";
import AgentAPIPackage from "@tokenring-ai/agent-api";
import ChatRouterPackage from "@tokenring-ai/ai-client";
import AudioPackage from "@tokenring-ai/audio";
import AWSPackage from "@tokenring-ai/aws";
import CheckpointPackage from "@tokenring-ai/checkpoint";
import ChromePackage from "@tokenring-ai/chrome";
import CLIPackage, {REPLService} from "@tokenring-ai/cli";
import CodeWatchPackage from "@tokenring-ai/code-watch";
import CodeBasePackage from "@tokenring-ai/codebase";
import DatabasePackage from "@tokenring-ai/database";
import DockerPackage from "@tokenring-ai/docker";
import DrizzleStoragePackage from "@tokenring-ai/drizzle-storage";
import FeedbackPackage from "@tokenring-ai/feedback";
import FileIndexPackage from "@tokenring-ai/file-index";
import FilesystemPackage from "@tokenring-ai/filesystem";
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
import WebFrontendPackage from "@tokenring-ai/web-frontend";
import WebHostPackage from "@tokenring-ai/web-host";
import WebSearchPackage from "@tokenring-ai/websearch";
import chalk from "chalk";
import {Command} from "commander";
import fs from "node:fs";
import path from "path";
import {z} from "zod";
import agents from "./agents/index.ts";
import {initializeConfigDirectory} from "./initializeConfigDirectory.js";
import {error} from "./prettyString.js";

// Interface definitions
interface CommandOptions {
  source: string;
  config?: string;
  initialize?: boolean;
}


// Create a new Commander program
const program = new Command();

program
  .name("tr-coder")
  .description("TokenRing Coder - AI-powered coding assistant")
  .version("1.0.0")
  .requiredOption("-s, --source <path>", "Path to the codebase to work with")
  .option("-c, --config <path>", "Path to the configuration file")
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
  tr-coder --source ./my-app --config ./custom-config.js
`,
  )
  .action(async (options: CommandOptions) => {
    try {
      await runCoder(options);
    } catch (err) {
      console.error(error(`Caught Error:`), err);
      process.exit(1);
    }
  });

program.parse();

async function runCoder({source, config: configFile, initialize}: CommandOptions): Promise<void> {
  // noinspection JSCheckFunctionSignatures
  const resolvedSource = path.resolve(source);

  if (!fs.existsSync(resolvedSource)) {
    throw new Error(`Source directory not found: ${resolvedSource}`);
  }

  const configDirectory = path.join(resolvedSource, "/.tokenring");

  if (!configFile) {
    // Try each extension in order
    const possibleExtensions = ["mjs", "cjs", "js"];
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

  const configImport = await import(configFile);
  const config = z.record(z.string(), z.any()).parse(configImport.default)

  const baseDirectory = resolvedSource;

  config.filesystem ??= {
    defaultProvider: "local",
    providers: {
      local: {
        type: "local",
        baseDirectory,
      }
    }
  }

  config.checkpoint ??= {
    defaultProvider: "local",
    providers: {
      local: {
        type: "sqlite",
        databasePath: path.resolve(configDirectory, "./coder-database.sqlite"),
      }
    }
  };

  config.audio ??= {
    defaultProvider: "local",
    providers: {
      local: {
        type: "linux"
      }
    }
  };

  const agentTeam = new AgentTeam(config);
  agentTeam.events.on("serviceOutput", message => {
    console.log(chalk.yellow(`🔧 ${message}`));
  })
  agentTeam.events.on("serviceError", message => {
    console.log(chalk.red(`🔧 ❌ ${message}`));
  });

  const packageManager = new AgentPackageManager()
  agentTeam.addServices(packageManager);

  await packageManager.installPackages([
    AgentPackage,
    AudioPackage,
    ChatRouterPackage,
    CheckpointPackage,
    AgentAPIPackage,
    AWSPackage,
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
    CLIPackage,
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
    WebFrontendPackage,
    WebSearchPackage,
  ], agentTeam);

  const agentConfigService = agentTeam.requireService(AgentConfigService);

  agentConfigService.addAgentConfigs(agents);

  console.log(chalk.yellow(banner));

  for (const name in config.agents) {
    agentConfigService.addAgentConfig(name, config.agents[name])
  }

  //await agentTeam.createAgent("code")
  const repl = new REPLService(agentTeam);

  await repl.run();
}

const banner = `
████████╗ ██████╗ ██╗  ██╗███████╗███╗   ██╗██████╗ ██╗███╗   ██╗ ██████╗ 
╚══██╔══╝██╔═══██╗██║ ██╔╝██╔════╝████╗  ██║██╔══██╗██║████╗  ██║██╔════╝ 
   ██║   ██║   ██║█████╔╝ █████╗  ██╔██╗ ██║██████╔╝██║██╔██╗ ██║██║  ███╗
   ██║   ██║   ██║██╔═██╗ ██╔══╝  ██║╚██╗██║██╔══██╗██║██║╚██╗██║██║   ██║
   ██║   ╚██████╔╝██║  ██╗███████╗██║ ╚████║██║  ██║██║██║ ╚████║╚██████╔╝
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                          
 ██████╗ ██████╗ ██████╗ ███████╗██████╗                                  
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗                                 
██║     ██║   ██║██║  ██║█████╗  ██████╔╝                                 
██║     ██║   ██║██║  ██║██╔══╝  ██╔══██╗                                 
╚██████╗╚██████╔╝██████╔╝███████╗██║  ██║                                 
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝                                 
`;