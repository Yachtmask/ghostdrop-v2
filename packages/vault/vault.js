import { generateKey, encryptData } from "../crypto/engine.js";

export function createVault(data) {

  const key = generateKey();

  const encrypted = encryptData(Buffer.from(data), key);

  return {

    format: "GHOSTDROP_V1",

    vault: encrypted,

    timestamp: Date.now()

  };
}
