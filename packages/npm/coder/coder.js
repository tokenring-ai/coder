#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const platform = process.platform;
const arch = process.arch;

let binary;
if (platform === 'darwin' && arch === 'arm64') {
  binary = "./coder-macos-arm64";
} else if (platform === 'linux' && arch === 'x64') {
  binary = "./coder-linux-x64";
} else {
  console.error(`Unsupported platform: ${platform}-${arch}`);
  process.exit(1);
}

const binaryPath = path.join(__dirname, binary);
const child = spawn(binaryPath, process.argv.slice(2), { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code));
