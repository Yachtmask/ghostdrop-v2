import time

from infrastructure.database.vault_db import get_all_vaults


CHECK_INTERVAL = 300


def check_vaults():

    now = int(time.time())

    vaults = get_all_vaults()

    for vault in vaults:

        vault_id, cid, deadline, recipients = vault

        if now > deadline:

            print("DEADLINE PASSED")
            print("Vault ID:", vault_id)
            print("CID:", cid)
            print("Recipients:", recipients)
            print("Triggering vault drop...")


while True:

    check_vaults()

    time.sleep(CHECK_INTERVAL)
