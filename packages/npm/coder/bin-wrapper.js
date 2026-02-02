#!/usr/bin/env node
const { spawn } = require('child_process');

const platform = process.platform;
const arch = process.arch;

let packageName;
if (platform === 'darwin' && arch === 'arm64') {
  packageName = '@tokenring-ai/coder-darwin-arm64';
} else if (platform === 'linux' && arch === 'x64') {
  packageName = '@tokenring-ai/coder-linux-x64';
} else {
  console.error(`Unsupported platform: ${platform}-${arch}`);
  process.exit(1);
}

try {
  const binary = require.resolve(`${packageName}/coder-${platform}-${arch}`);
  const child = spawn(binary, process.argv.slice(2), { stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code));
} catch (e) {
  console.error(`Failed to find ${packageName}. Please run: npm install ${packageName}`);
  process.exit(1);
}
