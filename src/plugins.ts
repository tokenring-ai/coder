import AgentPlugin from "@tokenring-ai/agent/plugin";
import AIClientPlugin from "@tokenring-ai/ai-client/plugin";
import AudioPlugin from "@tokenring-ai/audio/plugin";
import AWSPlugin from "@tokenring-ai/aws/plugin";
import ChatFrontendPlugin from "@tokenring-ai/chat-frontend/plugin";
import ChatPlugin from "@tokenring-ai/chat/plugin";
import CheckpointPlugin from "@tokenring-ai/checkpoint/plugin";
import ChromePlugin from "@tokenring-ai/chrome/plugin";
import CLIPlugin from "@tokenring-ai/cli/plugin";
import CodeWatchPlugin from "@tokenring-ai/code-watch/plugin";
import CodeBasePlugin from "@tokenring-ai/codebase/plugin";
import DatabasePlugin from "@tokenring-ai/database/plugin";
import DockerPlugin from "@tokenring-ai/docker/plugin";
import DrizzleStoragePlugin from "@tokenring-ai/drizzle-storage/plugin";
import FeedbackPlugin from "@tokenring-ai/feedback/plugin";
import FileIndexPlugin from "@tokenring-ai/file-index/plugin";
import FilesystemPlugin from "@tokenring-ai/filesystem/plugin";
import GitPlugin from "@tokenring-ai/git/plugin";
import JavascriptPlugin from "@tokenring-ai/javascript/plugin";
import KubernetesPlugin from "@tokenring-ai/kubernetes/plugin";
import LinuxAudioPlugin from "@tokenring-ai/linux-audio/plugin";
import PosixSystemPlugin from "@tokenring-ai/posix-system/plugin";
import MCPPlugin from "@tokenring-ai/mcp/plugin";
import MemoryPlugin from "@tokenring-ai/memory/plugin";
import MySQLPlugin from "@tokenring-ai/mysql/plugin";
import QueuePlugin from "@tokenring-ai/queue/plugin";
import RPCPlugin from "@tokenring-ai/rpc/plugin";
import ResearchPlugin from "@tokenring-ai/research/plugin";
import SandboxPlugin from "@tokenring-ai/sandbox/plugin";
import SchedulerPlugin from "@tokenring-ai/scheduler/plugin";
import ScraperAPIPlugin from "@tokenring-ai/scraperapi/plugin";
import ScriptingPlugin from "@tokenring-ai/scripting/plugin";
import SerperPlugin from "@tokenring-ai/serper/plugin";
import SlackPlugin from "@tokenring-ai/slack/plugin";
import TasksPlugin from "@tokenring-ai/tasks/plugin";
import TelegramPlugin from "@tokenring-ai/telegram/plugin";
import TerminalPlugin from "@tokenring-ai/terminal/plugin";
import TestingPlugin from "@tokenring-ai/testing/plugin";
import ThinkingPlugin from "@tokenring-ai/thinking/plugin";
import VaultPlugin from "@tokenring-ai/vault/plugin";
import WebHostPlugin from "@tokenring-ai/web-host/plugin";
import WebSearchPlugin from "@tokenring-ai/websearch/plugin";
import WorkflowPlugin from "@tokenring-ai/workflow/plugin";
import {z} from "zod";

export const plugins = [
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
  JavascriptPlugin,
  KubernetesPlugin,
  LinuxAudioPlugin,
  PosixSystemPlugin,
  MCPPlugin,
  MemoryPlugin,
  MySQLPlugin,
  ResearchPlugin,
  RPCPlugin,
  QueuePlugin,
  SandboxPlugin,
  SchedulerPlugin,
  ScraperAPIPlugin,
  ScriptingPlugin,
  SerperPlugin,
  SlackPlugin,
  TasksPlugin,
  TelegramPlugin,
  TerminalPlugin,
  TestingPlugin,
  ThinkingPlugin,
  VaultPlugin,
  WebHostPlugin,
  WebSearchPlugin,
  WorkflowPlugin,
];
export const configSchema = z.object({
  ...AgentPlugin.config.shape,
  ...AIClientPlugin.config.shape,
  ...AudioPlugin.config.shape,
  ...AWSPlugin.config.shape,
  ...ChatFrontendPlugin.config.shape,
  ...ChatPlugin.config.shape,
  ...CLIPlugin.config.shape,
  ...CheckpointPlugin.config.shape,
  ...ChromePlugin.config.shape,
  ...CodeBasePlugin.config.shape,
  ...CodeWatchPlugin.config.shape,
  ...DatabasePlugin.config.shape,
  ...DockerPlugin.config.shape,
  ...DrizzleStoragePlugin.config.shape,
  ...FeedbackPlugin.config.shape,
  ...FileIndexPlugin.config.shape,
  ...FilesystemPlugin.config.shape,
  ...GitPlugin.config.shape,
  ...JavascriptPlugin.config.shape,
  ...KubernetesPlugin.config.shape,
  ...LinuxAudioPlugin.config.shape,
  ...PosixSystemPlugin.config.shape,
  ...MCPPlugin.config.shape,
  ...MemoryPlugin.config.shape,
  ...MySQLPlugin.config.shape,
  ...ResearchPlugin.config.shape,
  ...RPCPlugin.config.shape,
  ...QueuePlugin.config.shape,
  ...SandboxPlugin.config.shape,
  ...SchedulerPlugin.config.shape,
  ...ScraperAPIPlugin.config.shape,
  ...ScriptingPlugin.config.shape,
  ...SerperPlugin.config.shape,
  ...SlackPlugin.config.shape,
  ...TasksPlugin.config.shape,
  ...TelegramPlugin.config.shape,
  ...TerminalPlugin.config.shape,
  ...TestingPlugin.config.shape,
  ...ThinkingPlugin.config.shape,
  ...VaultPlugin.config.shape,
  ...WebHostPlugin.config.shape,
  ...WebSearchPlugin.config.shape,
  ...WorkflowPlugin.config.shape,
});