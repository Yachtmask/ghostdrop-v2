import { createVault } from "../../packages/vault/vault.js";

async function uploadFile() {

  const fileInput = document.getElementById("fileInput");

  if (!fileInput.files.length) {
    alert("Select a file first");
    return;
  }

  const file = fileInput.files[0];

  const text = await file.text();

  const vault = createVault(text);

  document.getElementById("status").innerText =
    "File encrypted";

  fetch("http://localhost:5000/drop", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      vault: vault.vault
    })

  }).then(() => {

    document.getElementById("status").innerText =
      "File securely dropped";

  });

}
