import argparse
import requests


API_URL = "http://localhost:5000"


def create_vault():

    vault_id = input("Vault ID: ")
    cid = input("Shelby CID: ")
    recipients = input("Recipients (comma separated): ")

    payload = {
        "vault_id": vault_id,
        "cid": cid,
        "recipients": recipients
    }

    r = requests.post(
        f"{API_URL}/create_vault",
        json=payload
    )

    print(r.json())


def checkin():

    vault_id = input("Vault ID: ")

    payload = {
        "vault_id": vault_id
    }

    r = requests.post(
        f"{API_URL}/checkin",
        json=payload
    )

    print(r.json())


parser = argparse.ArgumentParser()

parser.add_argument(
    "command",
    choices=["create-vault", "checkin"]
)

args = parser.parse_args()


if args.command == "create-vault":
    create_vault()

if args.command == "checkin":
    checkin()
