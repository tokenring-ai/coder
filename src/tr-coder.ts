#!/usr/bin/env node
import * as ChatRouterPackage from "@token-ring/ai-client";
import {ModelRegistry} from "@token-ring/ai-client";

import * as models from "@token-ring/ai-client/models";

import * as AWSPackage from "@token-ring/aws";
import * as ChatPackage from "@token-ring/chat";
import {ChatService} from "@token-ring/chat";
import * as ChromePackage from "@token-ring/chrome";
import * as CLIPackage from "@token-ring/cli";
import {ReplHumanInterfaceService, REPLService} from "@token-ring/cli";
import * as CodeWatchPackage from "@token-ring/code-watch";
import {CodeWatchService} from "@token-ring/code-watch";
import * as CodebasePackage from "@token-ring/codebase";
import {CodeBaseService, FileTreeResource, WholeFileResource} from "@token-ring/codebase";
import * as DatabasePackage from "@token-ring/database";
import * as DockerPackage from "@token-ring/docker";
import {DockerService} from "@token-ring/docker";
import * as FeedbackPackage from "@token-ring/feedback";
import * as FileIndexPackage from "@token-ring/file-index";
import * as FilesystemPackage from "@token-ring/filesystem";
import * as GitPackage from "@token-ring/git";
import {GitService} from "@token-ring/git";

import * as HistoryPackage from "@token-ring/history";
import * as JavascriptPackage from "@token-ring/javascript";
import * as KubernetesPackage from "@token-ring/kubernetes";
import * as LocalFileSystemPackage from "@token-ring/local-filesystem";
import {LocalFileSystemService} from "@token-ring/local-filesystem";
import * as MemoryPackage from "@token-ring/memory";
import {EphemeralMemoryService} from "@token-ring/memory";
import * as PlannerPackage from "@token-ring/planner";
import * as QueuePackage from "@token-ring/queue";
import {WorkQueueService} from "@token-ring/queue";
import * as RegistryPackage from "@token-ring/registry";
import {Registry} from "@token-ring/registry";
import * as RepoMapPackage from "@token-ring/repo-map";
import {RepoMapResource} from "@token-ring/repo-map";
import * as ScraperAPIPackage from "@token-ring/scraperapi";
import {ScraperAPIService} from "@token-ring/scraperapi";
import * as SerperPackage from "@token-ring/serper";
import {SerperService} from "@token-ring/serper";
import * as SQLiteChatStoragePackage from "@token-ring/sqlite-storage";
import {
  SQLiteChatCheckpointStorage,
  SQLiteChatHistoryStorage,
  SQLiteChatMessageStorage
} from "@token-ring/sqlite-storage";
import initializeLocalDatabase from "@token-ring/sqlite-storage/db/initializeLocalDatabase";
import * as TestingPackage from "@token-ring/testing";
import {ShellCommandTestingResource, TestingService} from "@token-ring/testing";
import * as WorkflowPackage from "@token-ring/workflow";
import {WorkflowService} from "@token-ring/workflow";
import chalk from "chalk";
import {Command} from "commander";
import fs from "node:fs";
import path from "path";
import {CoderConfig, ResourceConfig as CfgResourceConfig} from "./config.types.js";
import defaultPersonas from "./defaults/personas.js";
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
    configFile = await initializeConfigDirectory(configDirectory);
  }

  if (!configFile) {
    throw new Error(
      `Source directory ${resolvedSource} does not contain a .tokenring/coder-config.{mjs,cjs,js} file.\n` +
      `You can create one by adding --initialize:\n` +
      `./tr-coder --source ${resolvedSource} --initialize`,
    );
  }


  const configImport = await import(configFile);
  const config = configImport.default as CoderConfig;

  const registry = new Registry();
  await registry.start();

  await registry.addPackages(
    AWSPackage,
    ChatPackage,
    ChatRouterPackage,
    ChromePackage,
    CLIPackage,
    CodebasePackage,
    CodeWatchPackage,
    DatabasePackage,
    DockerPackage,
    FeedbackPackage,
    FileIndexPackage,
    FilesystemPackage,
    GitPackage,
    HistoryPackage,
    JavascriptPackage,
    KubernetesPackage,
    LocalFileSystemPackage,
    MemoryPackage,
    PlannerPackage,
    QueuePackage,
    RegistryPackage,
    RepoMapPackage,
    ScraperAPIPackage,
    SerperPackage,
    SQLiteChatStoragePackage,
    TestingPackage,
    WorkflowPackage,
  );

  const baseDirectory = resolvedSource;
  const db = initializeLocalDatabase(
    path.resolve(configDirectory, "./coder-database.sqlite"),
  );

  const {defaults} = config;

  const defaultTools = Object.keys({
    ...FilesystemPackage.tools,
    ...MemoryPackage.tools,
    //...RepoMapPackage.tools,

    ...(config.serper ? (SerperPackage).tools : {}),
    ...(config.scraperapi ? (ScraperAPIPackage).tools : {}),
  });

  await registry.tools.enableTools(defaults.tools ?? defaultTools);
  console.log(chalk.greenBright(banner));

  // Initialize the chat context with personas
  const chatService = new ChatService({
    personas: config.personas || defaultPersonas, // Use loaded config
    persona: config.defaults?.persona || "code", // Use loaded config
  });

  const modelRegistry = new ModelRegistry();
  await modelRegistry.initializeModels(models, config.models);


  await registry.services.addServices(
    chatService,
    //configurationManagementService,
    new REPLService(),
    new ReplHumanInterfaceService(),
    modelRegistry,
    new SQLiteChatMessageStorage({db}),
    new SQLiteChatHistoryStorage({db}),
    new SQLiteChatCheckpointStorage({db}),
    new LocalFileSystemService({
      rootDirectory: baseDirectory,
      defaultSelectedFiles: defaults.selectedFiles ?? [],
    }),
    new CodeBaseService(),
    new DockerService(),
    new WorkQueueService(),
    new EphemeralMemoryService(),
    new GitService(),
    //new RecordingService(),
    //new SpeechToTextService(),
    new TestingService(),
    new WorkflowService(),
  );

  /*
if (false && config.indexedFiles) {
const databaseURL = process.env.DATABASE_URL;
if (false && databaseURL) {
 console.log(info(`Using MySQL for Vector + Full Text Search`));

 await registry.services.addServices(
  new MySQLFileIndexService({
   databaseUrl: process.env.DATABASE_URL,
   baseDirectory,
   modelRegistry,
   items: config.indexedFiles
  })
 );
} else {
 console.log(info(`MySQL not available, using in-memory Full Text Search database`));

 await registry.services.addServices(
  new StringSearchFileIndexService({
   baseDirectory,
   modelRegistry,
   items: config.indexedFiles
  })
 );
}
}*/

  if (config.watchedFiles) {
    await registry.services.addServices(
      new CodeWatchService(),
    );
  }

  /*
if (config.zoho) {
await registry.services.addServices(new ZohoService(config.zoho));
}*/

  for (const resourceName in config.resources ?? {}) {
    const raw = config.resources?.[resourceName];
    const resourcesArray: CfgResourceConfig[] = Array.isArray(raw) ? raw : [raw].filter((r): r is CfgResourceConfig => !!r);

    await registry.resources.addResource(
      resourceName,
      ...resourcesArray.map((resource: CfgResourceConfig) => {
        switch (resource.type) {
          case "fileTree":
            return new FileTreeResource({
              items: resource.items ?? [],
            });
          case "repoMap":
            return new RepoMapResource({
              baseDirectory,
              items: resource.items ?? [],
            });
          case "wholeFile":
            return new WholeFileResource({
              items: resource.items ?? [],
            });
          case "shell-testing":
            return new ShellCommandTestingResource(resource as any);
          default:
            throw new Error(`Unknown resource type ${resource.type}`);
        }
      }),
    );
  }

  await registry.resources.enableResources(defaults.resources ?? []);


  const scraperConfig = config.scraperapi;
  if (scraperConfig && scraperConfig.apiKey) {
    await registry.services.addServices(new ScraperAPIService(scraperConfig));
  } else if (scraperConfig) {
    console.warn("ScraperAPI configuration detected but missing apiKey. Skipping ScraperAPIService initialization.");
  }

  const serperConfig = config.serper;
  if (serperConfig && serperConfig.apiKey) {
    await registry.services.addServices(new SerperService(serperConfig));
  } else if (serperConfig) {
    console.warn("Serper configuration detected but missing apiKey. Skipping SerperService initialization.");
  }
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