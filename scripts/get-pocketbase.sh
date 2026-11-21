#!/usr/bin/env sh
# Lädt das PocketBase-Binary für dieses System nach ./pocketbase/pocketbase
set -e
VERSION="${1:-0.40.6}"
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m); case "$ARCH" in x86_64) ARCH=amd64;; aarch64|arm64) ARCH=arm64;; esac
URL="https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${OS}_${ARCH}.zip"
cd "$(dirname "$0")/../pocketbase"
echo "Lade $URL"
curl -fsSL "$URL" -o pb.zip && unzip -o pb.zip pocketbase && rm pb.zip && chmod +x pocketbase
./pocketbase --version
