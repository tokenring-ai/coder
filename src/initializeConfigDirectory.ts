import formatLogMessages from "@tokenring-ai/utility/string/formatLogMessage";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import exampleConfig from "./coder-config.example.mjs" with {type: "text"};

/**
 * Initializes the configuration directory for the application
 */
export function initializeConfigDirectory(configDir: string): string {
  try {
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir);
    }
    if (!fs.statSync(configDir).isDirectory()) {
      console.error(chalk.red(`${configDir} is not a directory, aborting`));
      process.exit(1);
    }

    const configFile = path.join(configDir, "coder-config.mjs");
    const gitignoreFile = path.join(configDir, ".gitignore");

    console.log(chalk.green(`Copying example config to ${configFile}`));
    fs.writeFileSync(configFile, exampleConfig.toString());

    console.log(chalk.green(`Creating .gitignore file`));
    fs.writeFileSync(gitignoreFile, "# Ignore database files\n*.db\n*.sqlite");

    console.log(chalk.green(`Initialized: ${configFile}`));
    return configFile;
  } catch (err) {
    console.error(chalk.red(formatLogMessages(['Initialization failed:', err as Error])));
    process.exit(1);
  }
}