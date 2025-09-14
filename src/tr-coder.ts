#!/usr/bin/env node
import {AgentStateStorage, AgentTeam, packageInfo as AgentPackage} from "@tokenring-ai/agent";
import {ModelRegistry, packageInfo as ChatRouterPackage} from "@tokenring-ai/ai-client";
import AIService from "@tokenring-ai/ai-client/AIService";
import {registerModels} from "@tokenring-ai/ai-client/models";
import {AWSService} from "@tokenring-ai/aws";
import {ChromeWebSearchResource, packageInfo as ChromePackage} from "@tokenring-ai/chrome";
import {packageInfo as CLIPackage, REPLService} from "@tokenring-ai/cli";
import {CodeWatchService} from "@tokenring-ai/code-watch";
import {CodeBaseService, FileTreeResource, WholeFileResource} from "@tokenring-ai/codebase";
import DatabaseService from "@tokenring-ai/database/DatabaseService";
import {DockerSandboxResource, DockerService} from "@tokenring-ai/docker";
import {packageInfo as FeedbackPackage} from "@tokenring-ai/feedback";
import {EphemeralFileIndexProvider, FileIndexService, packageInfo as FileIndexPackage} from "@tokenring-ai/file-index";
import {FileSystemService, packageInfo as FilesystemPackage} from "@tokenring-ai/filesystem";
import {GitService, packageInfo as GitPackage} from "@tokenring-ai/git";

import {packageInfo as JavascriptPackage} from "@tokenring-ai/javascript";
import {packageInfo as KubernetesPackage} from "@tokenring-ai/kubernetes";
import {LocalFileSystemService, packageInfo as LocalFileSystemPackage} from "@tokenring-ai/local-filesystem";
import {EphemeralMemoryService, packageInfo as MemoryPackage} from "@tokenring-ai/memory";
import {MySQLService} from "@tokenring-ai/mysql";
import {packageInfo as QueuePackage, WorkQueueService} from "@tokenring-ai/queue";
import {RepoMapResource, RepoMapService} from "@tokenring-ai/repo-map";
import {S3FileSystemProvider} from "@tokenring-ai/s3";
import {packageInfo as SandboxPackage} from "@tokenring-ai/sandbox";
import SandboxService from "@tokenring-ai/sandbox/SandboxService";
import {ScraperAPIWebSearchResource} from "@tokenring-ai/scraperapi";
import {SerperWebSearchResource} from "@tokenring-ai/serper";
import {
  packageInfo as SQLiteChatStoragePackage,
} from "@tokenring-ai/sqlite-storage";
import initializeLocalDatabase from "@tokenring-ai/sqlite-storage/db/initializeLocalDatabase";
import SQLiteAgentStateStorage from "@tokenring-ai/sqlite-storage/SQLiteAgentStateStorage";
import {packageInfo as TestingPackage, ShellCommandTestingResource, TestingService} from "@tokenring-ai/testing";
import {WebSearchService} from "@tokenring-ai/websearch";
import chalk from "chalk";
import {Command} from "commander";
import fs from "node:fs";
import path from "path";
import agents from "./agents.ts";
import {CoderConfig} from "./config.types.js";
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

  const baseDirectory = resolvedSource;
  const db = initializeLocalDatabase(
    path.resolve(configDirectory, "./coder-database.sqlite"),
  );

  const agentTeam = new AgentTeam();
  agentTeam.events.on("serviceOutput", message => {
    console.log(chalk.yellow(`🔧 ${message}`));
  })
  agentTeam.events.on("serviceError", message => {
    console.log(chalk.red(`🔧 ❌ ${message}`));
  })

  await agentTeam.addPackages([
    AgentPackage,
    ChatRouterPackage,
    ChromePackage,
    CLIPackage,
    FeedbackPackage,
    FileIndexPackage,
    FilesystemPackage,
    GitPackage,
    JavascriptPackage,
    KubernetesPackage,
    LocalFileSystemPackage,
    MemoryPackage,
    QueuePackage,
    SandboxPackage,
    SQLiteChatStoragePackage,
    TestingPackage,
  ]);

  const modelRegistry = new ModelRegistry();
  await registerModels(config.models, modelRegistry);

  const filesystemService = new FileSystemService();

  agentTeam.services.register(
    modelRegistry,
    filesystemService,
    new AIService({ model: config.defaults.model}),
    new AgentStateStorage(new SQLiteAgentStateStorage({db})),
    new WorkQueueService(),
    new EphemeralMemoryService(),
    new GitService(),
    //new RecordingService(),
    //new SpeechToTextService(),
  );

  config.filesystem ??= {
    providers: {
      local: {
        type: "local",
        baseDirectory,
      }
    }
  }


  if (!config.filesystem.providers) {
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

  if (config.websearch) {
    const websearchService = new WebSearchService();
    agentTeam.services.register(websearchService);

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
    agentTeam.services.register(watchedFileService);
  }

  if (config.codebase) {
    const codebaseService = new CodeBaseService();
    agentTeam.services.register(codebaseService);

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
      codebaseService.enableResources(config.codebase.default.resources);
    }
  }

  if (config.repoMap) {
    const repoMapService = new RepoMapService();
    agentTeam.services.register(repoMapService);
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
      repoMapService.enableResources(config.repoMap.default.resources);
    }
  }

  if (config.testing) {
    const testingService = new TestingService();
    agentTeam.services.register(testingService);

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
      testingService.enableResources(config.testing.default.resources);
    }
  }

  if (config.database) {
    const databaseService = new DatabaseService();
    agentTeam.services.register(databaseService);
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
    agentTeam.services.register(dockerService);
  }

  if (config.sandbox) {
    const sandboxService = new SandboxService();
    agentTeam.services.register(sandboxService);

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
    agentTeam.services.register(awsService);
  }

  if (config.fileIndex) {
    const fileIndexService = new FileIndexService();
    agentTeam.services.register(fileIndexService);

    if (config.fileIndex.providers) {
      for (const name in config.fileIndex.providers) {
        const fileIndexConfig = config.fileIndex.providers[name];
        switch (fileIndexConfig.type) {
          case "ephemeral":
            fileIndexService.registerFileIndexProvider(name, new EphemeralFileIndexProvider());
            break;
        }
      }
    }
  }

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