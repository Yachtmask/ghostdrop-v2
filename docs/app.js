async function encryptFile(file){

const data = await file.arrayBuffer()

const key = await crypto.subtle.generateKey(
{
name:"AES-GCM",
length:256
},
true,
["encrypt","decrypt"]
)

const iv = crypto.getRandomValues(new Uint8Array(12))

const encrypted = await crypto.subtle.encrypt(
{
name:"AES-GCM",
iv:iv
},
key,
data
)

return encrypted

}

async function createVault(){

const fileInput=document.getElementById("fileInput")
const name=document.getElementById("vaultName").value
const days=document.getElementById("timerDays").value
const status=document.getElementById("status")

if(!fileInput.files.length){

status.innerText="Select a file"
return

}

const file=fileInput.files[0]

status.innerText="Encrypting..."

const encrypted=await encryptFile(file)

const vault={

name:name,
created:Date.now(),
timer:days,
lastCheckin:Date.now(),
size:encrypted.byteLength

}

let vaults=JSON.parse(localStorage.getItem("ghostVaults")||"[]")

vaults.push(vault)

localStorage.setItem("ghostVaults",JSON.stringify(vaults))

status.innerText="Vault created successfully"

loadVaults()

}

function checkin(){

const name=document.getElementById("checkVaultName").value

let vaults=JSON.parse(localStorage.getItem("ghostVaults")||"[]")

vaults=vaults.map(v=>{

if(v.name===name){

v.lastCheckin=Date.now()

}

return v

})

localStorage.setItem("ghostVaults",JSON.stringify(vaults))

alert("Check-in recorded")

}

function loadVaults(){

const list=document.getElementById("vaultList")

list.innerHTML=""

const vaults=JSON.parse(localStorage.getItem("ghostVaults")||"[]")

vaults.forEach(v=>{

const li=document.createElement("li")

li.innerText=v.name+" | last check-in: "+new Date(v.lastCheckin).toLocaleString()

list.appendChild(li)

})

}
