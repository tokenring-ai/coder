#!/bin/sh

set -e


apt update
apt install -y git python3 build-essential

cd /repo
rm -rf /repo/node_modules
bun install

rm -rf /var/cache/apt
rm -rf /var/lib/apt/lists/*

apt remove -y build-essential
apt autoremove -y
