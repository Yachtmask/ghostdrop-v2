async function encryptFile() {

const fileInput = document.getElementById("fileInput")
const status = document.getElementById("status")

if (!fileInput.files.length) {
status.innerText = "Please select a file first."
return
}

status.innerText = "Encrypting file..."

const file = fileInput.files[0]
const data = await file.arrayBuffer()

const key = await crypto.subtle.generateKey(
{
name: "AES-GCM",
length: 256
},
true,
["encrypt","decrypt"]
)

const iv = crypto.getRandomValues(new Uint8Array(12))

const encrypted = await crypto.subtle.encrypt(
{
name: "AES-GCM",
iv: iv
},
key,
data
)

const encryptedBlob = new Blob([encrypted])

const downloadLink = document.createElement("a")

downloadLink.href = URL.createObjectURL(encryptedBlob)

downloadLink.download = file.name + ".ghost"

document.body.appendChild(downloadLink)

downloadLink.click()

document.body.removeChild(downloadLink)

status.innerText = "File encrypted and downloaded."

}

function createVault(){

const vaultId=document.getElementById("vaultId").value

alert("Vault created: " + vaultId)

}

function checkin(){

const vaultId=document.getElementById("vaultId").value

alert("Check-in recorded for: " + vaultId)

}

function loadVaults(){

const list=document.getElementById("vaultList")

list.innerHTML=""

const item=document.createElement("li")

item.innerText="Example Vault – Prototype"

list.appendChild(item)

}
