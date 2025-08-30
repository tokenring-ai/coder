#!/usr/bin/env node
import * as ChatRouterPackage from "@token-ring/ai-client";
import {ModelRegistry} from "@token-ring/ai-client";
import {registerModels} from "@token-ring/ai-client/models";

import * as models from "@token-ring/ai-client/models";

import * as AWSPackage from "@token-ring/aws";
import {AWSService} from "@token-ring/aws";
import * as ChatPackage from "@token-ring/chat";
import {ChatService} from "@token-ring/chat";
import {ChromeWebSearchResource} from "@token-ring/chrome";
import * as ChromePackage from "@token-ring/chrome";
import * as CLIPackage from "@token-ring/cli";
import {ReplHumanInterfaceService, REPLService} from "@token-ring/cli";
import * as CodeWatchPackage from "@token-ring/code-watch";
import {CodeWatchService} from "@token-ring/code-watch";
import * as CodebasePackage from "@token-ring/codebase";
import {CodeBaseService, FileTreeResource, WholeFileResource} from "@token-ring/codebase";
import * as DatabasePackage from "@token-ring/database";
import DatabaseService from "@token-ring/database/DatabaseService.js";
import * as DockerPackage from "@token-ring/docker";
import {DockerService, DockerSandboxResource} from "@token-ring/docker";
import {S3FileSystemProvider} from "@token-ring/s3";
import * as SandboxPackage from "@token-ring/sandbox";
import SandboxService from "@token-ring/sandbox/SandboxService.js";
import * as FeedbackPackage from "@token-ring/feedback";
import * as FileIndexPackage from "@token-ring/file-index";
import {FileSystemService} from "@token-ring/filesystem";
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
import {MySQLService} from "@token-ring/mysql";
import * as PlannerPackage from "@token-ring/planner";
import * as QueuePackage from "@token-ring/queue";
import {WorkQueueService} from "@token-ring/queue";
import * as RegistryPackage from "@token-ring/registry";
import {Registry} from "@token-ring/registry";
import * as RepoMapPackage from "@token-ring/repo-map";
import {RepoMapResource, RepoMapService} from "@token-ring/repo-map";
import * as ScraperAPIPackage from "@token-ring/scraperapi";
import {ScraperAPIWebSearchResource} from "@token-ring/scraperapi";
import * as SerperPackage from "@token-ring/serper";
import {SerperWebSearchResource} from "@token-ring/serper";
import * as SQLiteChatStoragePackage from "@token-ring/sqlite-storage";
import {
  SQLiteChatCheckpointStorage,
  SQLiteChatHistoryStorage,
  SQLiteChatMessageStorage
} from "@token-ring/sqlite-storage";
import initializeLocalDatabase from "@token-ring/sqlite-storage/db/initializeLocalDatabase";
import * as TestingPackage from "@token-ring/testing";
import {ShellCommandTestingResource, TestingService} from "@token-ring/testing";
import {WebSearchService} from "@token-ring/websearch";
import * as WebSearchPackage from "@token-ring/websearch";
import * as WorkflowPackage from "@token-ring/workflow";
import {WorkflowService} from "@token-ring/workflow";
import chalk from "chalk";
import {Command} from "commander";
import fs from "node:fs";
import path from "path";
import {CoderConfig} from "./config.types.js";
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
  const config = configImport.default as CoderConfig;

  const registry = new Registry();
  await registry.start();

  await registry.addPackages(
    ChatPackage,
    ChatRouterPackage,
    ChromePackage,
    CLIPackage,
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
    SandboxPackage,
    SQLiteChatStoragePackage,
    TestingPackage,
    WorkflowPackage,
  );

  const baseDirectory = resolvedSource;
  const db = initializeLocalDatabase(
    path.resolve(configDirectory, "./coder-database.sqlite"),
  );

  const {defaults} = config;

  const defaultTools: string[] = [
    ...Object.values(FilesystemPackage.tools).map((tool) => tool.name),
  ];

  await registry.tools.enableTools(defaults.tools ?? defaultTools);
  console.log(chalk.greenBright(banner));

  // Initialize the chat context with personas
  const chatService = new ChatService({
    personas: config.personas || defaultPersonas, // Use loaded config
    persona: config.defaults?.persona || "code", // Use loaded config
  });

  const modelRegistry = new ModelRegistry();
  await registerModels(config.models, modelRegistry);


  await registry.services.addServices(
    chatService,
    new REPLService(),
    new ReplHumanInterfaceService(),
    modelRegistry,
    new SQLiteChatMessageStorage({db}),
    new SQLiteChatHistoryStorage({db}),
    new SQLiteChatCheckpointStorage({db}),
    new WorkQueueService(),
    new EphemeralMemoryService(),
    new GitService(),
    //new RecordingService(),
    //new SpeechToTextService(),
    new WorkflowService(),
  );

  config.filesystem ??= {
    providers: {
      local: {
        type: "local",
        baseDirectory,
      }
    }
  }

  
  if (config.filesystem) {
    const filesystemService = new FileSystemService();
    await registry.services.addServices(filesystemService);
    await registry.addPackages(FilesystemPackage);

    if (! config.filesystem.providers) {
      throw new Error(`No filesystem providers configured`);
    }
    for (const name in config.filesystem.providers) {
      const filesystemConfig = config.filesystem.providers[name];
      switch (filesystemConfig.type) {
        case "local":
          filesystemService.registerFileSystemProvider(name, new LocalFileSystemService(filesystemConfig));
          break;
        case "s3":
          filesystemService.registerFileSystemProvider(name, new S3FileSystemProvider(filesystemConfig));
          break;
        default:
          throw new Error(`Invalid filesystem type for filesystem ${name}`);
      }
    }
    filesystemService.setActiveFileSystemProviderName(config.filesystem.default?.provider ?? filesystemService.getAvailableFileSystemProviders()[0]);
  }


  if (config.websearch) {
    const websearchService = new WebSearchService();
    await registry.services.addServices(websearchService);
    await registry.addPackages(WebSearchPackage);

    for (const name in config.websearch) {
      const websearchConfig = config.websearch[name];
      switch (websearchConfig.type) {
        case "chrome":
          websearchService.registerResource(name, new ChromeWebSearchResource(websearchConfig));
          break;
        case "serper":
          websearchService.registerResource(name, new SerperWebSearchResource(websearchConfig));
          break;
        case "scraperapi":
          websearchService.registerResource(name, new ScraperAPIWebSearchResource(websearchConfig));
          break;
        default:
          throw new Error(`Invalid websearch type for websearch ${name}`);
      }
    }
  }
  if (config.codewatch) {
    const watchedFileService = new CodeWatchService(config.codewatch);
    await registry.services.addServices(watchedFileService);
    await registry.addPackages(CodeWatchPackage);
  }

  if (config.codebase) {
    const codebaseService = new CodeBaseService();
    await registry.services.addServices(codebaseService);
    await registry.addPackages(CodebasePackage);

    for (const name in config.codebase.resources) {
      const filesystemConfig = config.codebase.resources[name];
      switch (filesystemConfig.type) {
        case "fileTree":
          codebaseService.registerResource(name, new FileTreeResource(filesystemConfig));
          break;
        case "repoMap":
          codebaseService.registerResource(name, new RepoMapResource(filesystemConfig));
          break;
        case "wholeFile":
          codebaseService.registerResource(name, new WholeFileResource(filesystemConfig));
          break;
        default:
          throw new Error(`Invalid filesystem resource type for filesystem ${name}`);
      }
    }
    if (config.codebase.default?.resources) {
      codebaseService.enableResources(...config.codebase.default.resources);
    }
  }

  if (config.repoMap) {
    const repoMapService = new RepoMapService();
    await registry.services.addServices(repoMapService);
    await registry.addPackages(RepoMapPackage);
    if (config.repoMap.resources) {
      for (const name in config.repoMap.resources) {
        const repoMapConfig = config.repoMap.resources[name];
        switch (repoMapConfig.type) {
          case "repoMap":
            repoMapService.registerResource(name, new RepoMapResource(repoMapConfig));
            break;
          default:
            throw new Error(`Invalid repoMap resource type for repoMap ${name}`);
        }
      }
    }
    if (config.repoMap.default?.resources) {
      repoMapService.enableResources(...config.repoMap.default.resources);
    }
  }

  if (config.testing) {
    const testingService = new TestingService();
    await registry.services.addServices(testingService);
    await registry.addPackages(TestingPackage);

    if (config.testing.resources) {
      for (const name in config.testing.resources) {
        const testingConfig = config.testing.resources[name];
        switch (testingConfig.type) {
          case "shell-testing":
            testingService.registerResource(name, new ShellCommandTestingResource(testingConfig));
            break;
          default:
            throw new Error(`Invalid testing resource type for testing ${name}`);
        }
      }
    }
    if (config.testing.default?.resources) {
      testingService.enableResources(...config.testing.default.resources);
    }
  }

  if (config.database) {
    const databaseService = new DatabaseService();
    await registry.services.addServices(databaseService);
    await registry.addPackages(DatabasePackage);
    if (config.database.resources) {
      for (const name in config.database.resources) {
        const databaseConfig = config.database.resources[name];
        switch (databaseConfig.type) {
          case "mysql":
            databaseService.registerResource(name, new MySQLService(databaseConfig));
            break;
          default:
            throw new Error(`Invalid database resource type for database ${name}`);
        }
      }
    }
  }

  if (config.docker) {
    const dockerService = new DockerService(config.docker);
    await registry.services.addServices(dockerService);
    await registry.addPackages(DockerPackage);
  }

  if (config.sandbox) {
    const sandboxService = new SandboxService();
    await registry.services.addServices(sandboxService);

    if (config.sandbox.providers) {
      for (const name in config.sandbox.providers) {
        const sandboxConfig = config.sandbox.providers[name];
        switch (sandboxConfig.type) {
          case "docker":
            sandboxService.registerSandboxProvider(name, new DockerSandboxResource(config.sandbox.providers[name]));
            break;
          default:
            throw new Error(`Invalid sandbox resource type for sandbox ${name}`);
        }
      }
    }
    if (config.sandbox.default?.provider) {
      sandboxService.setActiveSandboxProviderName(config.sandbox.default.provider);
    }
  }

  if (config.aws) {
    const awsService = new AWSService(config.aws);
    await registry.services.addServices(awsService);
    await registry.addPackages(AWSPackage);
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