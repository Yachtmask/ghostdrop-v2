async function encryptFile() {

const fileInput = document.getElementById("fileInput")

if (!fileInput.files.length) {
alert("Please select a file")
return
}

const file = fileInput.files[0]

const data = await file.arrayBuffer()

const key = await crypto.subtle.generateKey(
{
name: "AES-GCM",
length: 256
},
true,
["encrypt", "decrypt"]
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

const blob = new Blob([encrypted])

const url = URL.createObjectURL(blob)

const a = document.createElement("a")
a.href = url
a.download = file.name + ".ghost"
a.click()

document.getElementById("status").innerText =
"File encrypted locally. Key never left your browser."

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
