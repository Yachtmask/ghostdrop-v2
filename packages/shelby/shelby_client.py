import requests

SHELBY_API = "https://api.shelby.xyz/upload"


def upload_ciphertext(ciphertext):

    files = {
        "file": ciphertext
    }

    response = requests.post(
        SHELBY_API,
        files=files
    )

    if response.status_code != 200:
        raise Exception("Shelby upload failed")

    data = response.json()

    return data["cid"]


def fetch_ciphertext(cid):

    url = f"https://gateway.shelby.xyz/ipfs/{cid}"

    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Vault retrieval failed")

    return response.content
