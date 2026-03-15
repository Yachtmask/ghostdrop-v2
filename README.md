# GhostDrop 💀

GhostDrop is a decentralized dead-man switch vault built on Shelby.

Users encrypt files locally and store only ciphertext on decentralized storage.
If a user fails to check in before the timer expires, the vault automatically releases to designated recipients.

## Features

- AES-256-GCM file encryption
- Recipient key packaging
- Shelby decentralized storage
- Dead-man switch watchdog
- CLI vault management
- Web vault dashboard

## Architecture

apps/
  cli/
  web/

services/
  api/
  watchdog/

packages/
  crypto/
  vault/
  shelby/

infrastructure/
  database/

## How It Works

1. Files are encrypted locally.
2. Encrypted data is uploaded to Shelby.
3. Metadata is stored in the vault database.
4. Users must check in periodically.
5. If a deadline passes, the watchdog triggers a vault release.

## Security

- Encryption keys never leave the user machine.
- Shelby stores ciphertext only.
- Recipients receive encrypted key packages.

## Project Status

Prototype / Research Implementation
