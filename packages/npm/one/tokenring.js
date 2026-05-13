#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const platform = process.platform;
const arch = process.arch;
const platformArch = `${platform}-${arch}`;

const supportedPlatforms = new Set([
  'darwin-arm64',
  'linux-x64',
  'linux-arm64',
]);

if (!supportedPlatforms.has(platformArch)) {
  console.error(`Unsupported platform: ${platformArch}`);
  process.exit(1);
}

const binaryDir = path.join(__dirname, 'bin', platformArch);
const binaryPath = path.join(binaryDir, 'tokenring');
const env = { ...process.env };

if (platform === 'linux') {
  env.LD_LIBRARY_PATH = env.LD_LIBRARY_PATH
    ? `${binaryDir}:${env.LD_LIBRARY_PATH}`
    : binaryDir;
}

const child = spawn(binaryPath, process.argv.slice(2), { stdio: 'inherit', env });
child.on('exit', (code) => process.exit(code));
