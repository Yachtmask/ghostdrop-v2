import uuid
import json

from packages.crypto.encryption import generate_vault_key, encrypt_file
from packages.crypto.keypack import encrypt_vault_key
from packages.shelby.shelby_client import upload_ciphertext


def create_vault(file_bytes, recipients):

    vault_id = str(uuid.uuid4())

    vault_key = generate_vault_key()

    encrypted_file = encrypt_file(file_bytes, vault_key)
    cid = upload_ciphertext(encrypted_file)

    recipient_packages = []

    for recipient in recipients:

        encrypted_key = encrypt_vault_key(
            vault_key,
            recipient["public_key"]
        )

        recipient_packages.append({
            "recipient": recipient["name"],
            "encrypted_key": encrypted_key.hex()
        })

    vault_metadata = {
        "vault_id": vault_id,
        "recipients": recipient_packages
    }

    return {
    "vault_id": vault_id,
    "cid": cid,
    "metadata": json.dumps(vault_metadata)
}
        "vault_id": vault_id,
        "ciphertext": encrypted_file,
        "metadata": json.dumps(vault_metadata)
    }
