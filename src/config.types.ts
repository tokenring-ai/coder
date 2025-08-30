import {ModelProviderConfig} from "@token-ring/ai-client/models";
import {AWSCredentials} from "@token-ring/aws/AWSService";
import {PersonaConfig} from "@token-ring/chat/ChatService";
import {ChromeWebSearchOptions} from "@token-ring/chrome/ChromeWebSearchResource";
import {CodeWatchServiceOptions} from "@token-ring/code-watch/CodeWatchService";
import {DockerSandboxProviderParams} from "@token-ring/docker/DockerSandboxProvider";
import {DockerServiceParams} from "@token-ring/docker/DockerService";
import {FileMatchResourceConfig} from "@token-ring/filesystem/FileMatchResource";
import {LocalFileSystemProviderOptions} from "@token-ring/local-filesystem/LocalFileSystemProvider";
import {MySQLResourceProps} from "@token-ring/mysql/MySQLResource";
import {S3FileSystemProviderOptions} from "@token-ring/s3/S3FileSystemProvider";
import {ScraperAPIWebSearchProviderOptions} from "@token-ring/scraperapi/ScraperAPIWebSearchProvider";
import {SerperWebSearchProviderOptions} from "@token-ring/serper/SerperWebSearchProvider";
import {ShellCommandTestingResourceOptions} from "@token-ring/testing/ShellCommandTestingResource";

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

export type DatabaseResourceConfig =
  | MySQLResourceProps & { type: 'mysql' };

export type TestingResourceConfig =
  | ShellCommandTestingResourceOptions & { type: 'shell-testing' };

export type SandboxProviderConfig =
  | DockerSandboxProviderParams & { type: 'docker' };

export type FileSystemProviderConfig =
  | LocalFileSystemProviderOptions & { type: 'local' }
  | S3FileSystemProviderOptions & { type: 's3' };

export interface CoderConfig {
  defaults: {
    persona: string;
    tools?: string[];
  };
  personas: Record<string, PersonaConfig>
  models: Record<string, ModelProviderConfig>;
  websearch?: Record<string, WebSearchConfig>;
  filesystem?: {
    default?: {
      provider?: string;
      selectedFiles?: string[];
    }
    providers: Record<string, FileSystemProviderConfig>;
  }
  codebase?: {
    default?: {
      resources?: string[];
    }
    resources: Record<string, CodeBaseResourceConfig>;
  };
  repoMap?: {
    default?: {
      resources?: string[];
    }
    resources: Record<string, RepoMapResourceConfig>;
  }
  codewatch?: CodeWatchServiceOptions;
  testing: {
    default?: {
      resources?: string[];
    }
    resources: Record<string, TestingResourceConfig>;
  };
  database?: {
    default?: {
      resources?: string[];
    }
    resources: Record<string, DatabaseResourceConfig>;
  };
  sandbox?: {
    default?: {
      provider?: string;
    }
    providers: Record<string, SandboxProviderConfig>;
  };
  aws?: AWSCredentials
  docker?: DockerServiceParams
}