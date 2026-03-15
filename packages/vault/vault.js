import { generateKey, encryptData, decryptData } from "../crypto/engine.js";

export function createVault(data) {

  const key = generateKey();

  const encrypted = encryptData(Buffer.from(data), key);

  return {
    vault: encrypted,
    key: key.toString("hex")
  };
}

export function openVault(vaultData, keyHex) {

  const key = Buffer.from(keyHex, "hex");

  const decrypted = decryptData(vaultData, key);

  return decrypted.toString();
}
