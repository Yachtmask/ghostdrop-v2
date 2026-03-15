from cryptography.hazmat.primitives.asymmetric import x25519
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes
import os


def generate_recipient_keypair():

    private_key = x25519.X25519PrivateKey.generate()

    public_key = private_key.public_key()

    return private_key, public_key


def encrypt_vault_key(vault_key, recipient_public_key):

    ephemeral_private = x25519.X25519PrivateKey.generate()

    shared_key = ephemeral_private.exchange(recipient_public_key)

    derived_key = HKDF(
        algorithm=hashes.SHA256(),
        length=32,
        salt=None,
        info=b"ghostdrop-key"
    ).derive(shared_key)

    encrypted = bytes(a ^ b for a, b in zip(vault_key, derived_key))

    return encrypted
