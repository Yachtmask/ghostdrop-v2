from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/wallet", methods=["POST"])
def wallet():

    data = request.json
    wallet_address = data.get("address")

    return jsonify({
        "status": "wallet received",
        "wallet": wallet_address
    })


@app.route("/drop", methods=["POST"])
def drop():

    data = request.json
    vault = data.get("vault")

    print("Vault received")

    return jsonify({
        "status": "vault stored"
    })


if __name__ == "__main__":
    app.run(port=5000)
