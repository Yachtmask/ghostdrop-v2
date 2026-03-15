from flask import Flask, request, jsonify
import time

from infrastructure.database.vault_db import (
    create_vault_record,
    update_deadline
)
from infrastructure.database.vault_db import get_all_vaults
app = Flask(__name__)

@app.route("/vaults", methods=["GET"])
def list_vaults():

    vaults = get_all_vaults()

    result = []

    for vault in vaults:

        result.append({
            "vault_id": vault[0],
            "cid": vault[1],
            "deadline": vault[2],
            "recipients": vault[3]
        })

    return jsonify(result)
@app.route("/create_vault", methods=["POST"])
def create_vault():

    data = request.json

    vault_id = data["vault_id"]
    cid = data["cid"]
    recipients = data["recipients"]

    deadline = int(time.time()) + 86400

    create_vault_record(
        vault_id,
        cid,
        deadline,
        recipients
    )

    return jsonify({
        "status": "vault_created",
        "deadline": deadline
    })


@app.route("/checkin", methods=["POST"])
def checkin():

    data = request.json

    vault_id = data["vault_id"]

    new_deadline = int(time.time()) + 86400

    update_deadline(vault_id, new_deadline)

    return jsonify({
        "status": "checkin_success",
        "new_deadline": new_deadline
    })


app.run(port=5000)
