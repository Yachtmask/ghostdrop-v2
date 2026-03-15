import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM


def generate_vault_key():
    """
    Generate a 256-bit AES key for vault encryption
    """
    return AESGCM.generate_key(bit_length=256)


def encrypt_file(file_bytes, key):
    """
    Encrypt file data using AES-256-GCM
    """

    aesgcm = AESGCM(key)

    nonce = os.urandom(12)

    ciphertext = aesgcm.encrypt(nonce, file_bytes, None)

    return nonce + ciphertext


def decrypt_file(encrypted_bytes, key):
    """
    Decrypt vault file
    """

    nonce = encrypted_bytes[:12]
    ciphertext = encrypted_bytes[12:]

    aesgcm = AESGCM(key)

    return aesgcm.decrypt(nonce, ciphertext, None)
