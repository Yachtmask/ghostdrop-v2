import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

export function connectWallet() {

  if (!window.aptos) {
    alert("No Aptos wallet detected");
    return;
  }

  window.aptos.connect().then((response) => {

    const address = response.address;

    document.getElementById("wallet").innerText =
      "Connected: " + address;

    fetch("http://localhost:5000/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: address
      })
    });

  });

}
