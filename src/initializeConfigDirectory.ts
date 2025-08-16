import fs from "fs";
import path from "path";
import exampleConfig from "./examples/coder-config.js" with {type: "text"};
import {error, success} from "./prettyString.js";

/**
 * Initializes the configuration directory for the application
 * @param configDir - Path to the configuration directory
 * @returns The path to the created configuration file
 */
export function initializeConfigDirectory(configDir: string): string {
  try {
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir);
    }
    if (!fs.statSync(configDir).isDirectory()) {
      console.error(error(`${configDir} is not a directory, aborting`));
      process.exit(1);
    }

    const configFile = path.join(configDir, "coder-config.mjs");
    const gitignoreFile = path.join(configDir, ".gitignore");

    console.log(success(`Copying example config to ${configFile}`));
    fs.writeFileSync(configFile, exampleConfig.toString());

    console.log(success(`Creating .gitignore file`));
    fs.writeFileSync(gitignoreFile, "# Ignore database files\n*.db\n*.sqlite");

    console.log(success(`Initialized: ${configFile}`));
    return configFile;
  } catch (err) {
    console.error(error(`Initialization failed: ${err}`));
    process.exit(1);
  }
}