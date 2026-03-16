function createVault(){

const vaultId=document.getElementById("vaultId").value
const cid=document.getElementById("cid").value
const recipients=document.getElementById("recipients").value

alert("Vault created (prototype): "+vaultId)

}

function checkin(){

const vaultId=document.getElementById("checkVaultId").value

alert("Check-in recorded (prototype): "+vaultId)

}

function loadVaults(){

const list=document.getElementById("vaultList")

list.innerHTML=""

const item=document.createElement("li")

item.innerText="Example Vault – Prototype"

list.appendChild(item)

}
