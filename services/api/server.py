from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/wallet", methods=["POST"])
def wallet():

    data = request.json
    wallet_address = data.get("address")

    return jsonify({
        "status": "received",
        "wallet": wallet_address
    })

if __name__ == "__main__":
    app.run(port=5000)
