// GhostDrop Cryptography Engine
// Handles encryption and decryption of vault files

import crypto from "crypto";

// AES configuration
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;

// Generate encryption key
export function generateKey() {
  return crypto.randomBytes(32);
}

// Encrypt data
export function encryptData(data, key) {
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(data),
    cipher.final()
  ]);

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    data: encrypted.toString("hex")
  };
}

// Decrypt data
export function decryptData(encrypted, key) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(encrypted.iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(encrypted.tag, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted.data, "hex")),
    decipher.final()
  ]);

  return decrypted;
}
