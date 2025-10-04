#!/usr/bin/env node
import {AgentTeam, packageInfo as AgentPackage} from "@tokenring-ai/agent";
import {packageInfo as ChatRouterPackage} from "@tokenring-ai/ai-client";
import {packageInfo as AudioPackage} from "@tokenring-ai/audio";
import {packageInfo as AWSPackage} from "@tokenring-ai/aws";
import {packageInfo as CheckpointPackage} from "@tokenring-ai/checkpoint";
import {packageInfo as ChromePackage} from "@tokenring-ai/chrome";
import {packageInfo as CLIPackage, REPLService} from "@tokenring-ai/cli";
import {packageInfo as CodeWatchPackage} from "@tokenring-ai/code-watch";
import {packageInfo as CodeBasePackage} from "@tokenring-ai/codebase";
import {packageInfo as DatabasePackage} from "@tokenring-ai/database";
import {packageInfo as DockerPackage} from "@tokenring-ai/docker";
import {packageInfo as FeedbackPackage} from "@tokenring-ai/feedback";
import {packageInfo as FileIndexPackage} from "@tokenring-ai/file-index";
import {packageInfo as FilesystemPackage} from "@tokenring-ai/filesystem";
import {packageInfo as GitPackage} from "@tokenring-ai/git";
import {packageInfo as IterablesPackage} from "@tokenring-ai/iterables";
import {packageInfo as JavascriptPackage} from "@tokenring-ai/javascript";
import {packageInfo as KubernetesPackage} from "@tokenring-ai/kubernetes";
import {packageInfo as LinuxAudioPackage} from "@tokenring-ai/linux-audio";
import {packageInfo as LocalFileSystemPackage} from "@tokenring-ai/local-filesystem";
import {packageInfo as MCPPackage} from "@tokenring-ai/mcp";
import {packageInfo as MemoryPackage} from "@tokenring-ai/memory";
import {packageInfo as MySQLPackage} from "@tokenring-ai/mysql";
import {packageInfo as QueuePackage} from "@tokenring-ai/queue";
import {packageInfo as SandboxPackage} from "@tokenring-ai/sandbox";
import {packageInfo as ScraperAPIPackage} from "@tokenring-ai/scraperapi";
import {packageInfo as SerperPackage} from "@tokenring-ai/serper";
import {packageInfo as SQLiteStoragePackage} from "@tokenring-ai/sqlite-storage";
import {packageInfo as TasksPackage} from "@tokenring-ai/tasks";
import {packageInfo as TestingPackage} from "@tokenring-ai/testing";
import {packageInfo as WebSearchPackage} from "@tokenring-ai/websearch";
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
    defaultProvider: "sqlite",
    providers: {
      sqlite: {
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

  await agentTeam.addPackages([
    AgentPackage,
    AudioPackage,
    ChatRouterPackage,
    CheckpointPackage,
    AWSPackage,
    CodeWatchPackage,
    CodeBasePackage,
    DatabasePackage,
    DockerPackage,
    ChromePackage,
    MySQLPackage,
    ScraperAPIPackage,
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
    SQLiteStoragePackage,
    TasksPackage,
    IterablesPackage,
    WebSearchPackage,
  ]);

  agentTeam.addAgentConfigs(
    agents
  )

  console.log(chalk.yellow(banner));

  // Initialize agent manager
  for (const name in agents) {
    agentTeam.addAgentConfig(name, agents[name]);
  }

  for (const name in config.agents) {
    agentTeam.addAgentConfig(name, config.agents[name])
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