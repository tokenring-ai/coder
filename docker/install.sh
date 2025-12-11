#!/bin/sh

set -e

apt update
apt install -y git python3 libportaudio2 build-essential

chmod 755 /dist/tr-coder

apt remove -y build-essential
apt autoremove -y

rm -rf /var/cache/apt
rm -rf /var/lib/apt/lists/*