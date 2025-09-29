import {AgentConfig} from "@tokenring-ai/agent/Agent";
import {ModelProviderConfig} from "@tokenring-ai/ai-client/models";
import {AWSCredentials} from "@tokenring-ai/aws/AWSService";
import {ChromeWebSearchOptions} from "@tokenring-ai/chrome/ChromeWebSearchProvider";
import {CodeWatchServiceOptions} from "@tokenring-ai/code-watch/CodeWatchService";
import {DockerSandboxProviderParams} from "@tokenring-ai/docker/DockerSandboxProvider";
import {DockerServiceParams} from "@tokenring-ai/docker/DockerService";
import {EphemeralFileIndexProvider} from "@tokenring-ai/file-index";
import {FileMatchResourceConfig} from "@tokenring-ai/filesystem/FileMatchResource";
import {LocalFileSystemProviderOptions} from "@tokenring-ai/local-filesystem/LocalFileSystemProvider";
import {MCPTransportConfig} from "@tokenring-ai/mcp/MCPService";
import {MySQLResourceProps} from "@tokenring-ai/mysql/MySQLProvider";
import {S3FileSystemProviderOptions} from "@tokenring-ai/s3/S3FileSystemProvider";
import {ScraperAPIWebSearchProviderOptions} from "@tokenring-ai/scraperapi/ScraperAPIWebSearchProvider";
import {SerperWebSearchProviderOptions} from "@tokenring-ai/serper/SerperWebSearchProvider";
import {ShellCommandTestingResourceOptions} from "@tokenring-ai/testing/ShellCommandTestingResource";

export type WebSearchConfig =
  | SerperWebSearchProviderOptions & { type: 'serper' }
  | ScraperAPIWebSearchProviderOptions & { type: 'scraperapi' }
  | ChromeWebSearchOptions & { type: 'chrome' };

export type CodeBaseResourceConfig =
  | FileMatchResourceConfig & { type: 'fileTree' }
  | FileMatchResourceConfig & { type: 'repoMap' }
  | FileMatchResourceConfig & { type: 'wholeFile' };

export type RepoMapResourceConfig =
  | FileMatchResourceConfig & { type: 'repoMap' };

export type DatabaseProviderConfig =
  | MySQLResourceProps & { type: 'mysql' };

export type TestingResourceConfig =
  | ShellCommandTestingResourceOptions & { type: 'shell-testing' };

export type SandboxProviderConfig =
  | DockerSandboxProviderParams & { type: 'docker' };

export type FileSystemProviderConfig =
  | LocalFileSystemProviderOptions & { type: 'local' }
  | S3FileSystemProviderOptions & { type: 's3' };

export type FileIndexProviderConfig =
  | EphemeralFileIndexProvider & { type: 'ephemeral' };

export interface CoderConfig {
  defaults: {
    agent: string;
    tools?: string[];
    model: string;
  };
  agents: Record<string, AgentConfig>;
  models: Record<string, ModelProviderConfig>;
  websearch?: Record<string, WebSearchConfig>;
  filesystem?: {
    default?: {
      provider?: string;
      selectedFiles?: string[];
    }
    providers: Record<string, FileSystemProviderConfig>;
  }
  fileIndex?: {
    providers: Record<string, FileIndexProviderConfig>;
  }
  codebase?: {
    default?: {
      resources?: string[];
    }
    resources: Record<string, CodeBaseResourceConfig>;
  };
  codewatch?: CodeWatchServiceOptions;
  testing: {
    default?: {
      resources?: string[];
    }
    resources: Record<string, TestingResourceConfig>;
  };
  database?: {
    default?: {
      providers?: string[];
    }
    providers: Record<string, DatabaseProviderConfig>;
  };
  sandbox?: {
    default?: {
      provider?: string;
    }
    providers: Record<string, SandboxProviderConfig>;
  };
  aws?: AWSCredentials
  docker?: DockerServiceParams,
  mcp?: {
    transports: Record<string, MCPTransportConfig>;
  };
}