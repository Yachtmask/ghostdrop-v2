async function encryptFile(file){

const data = await file.arrayBuffer()

const key = await crypto.subtle.generateKey(
{ name:"AES-GCM", length:256 },
true,
["encrypt","decrypt"]
)

const iv = crypto.getRandomValues(new Uint8Array(12))

const encrypted = await crypto.subtle.encrypt(
{ name:"AES-GCM", iv:iv },
key,
data
)

return encrypted

}

function generateCID(){

return "cid_" + Math.random().toString(36).substring(2,12)

}

function downloadFile(data,name){

const blob = new Blob([data])

const link = document.createElement("a")

link.href = URL.createObjectURL(blob)

link.download = name + ".ghost"

document.body.appendChild(link)

link.click()

document.body.removeChild(link)

}

async function createVault(){

const fileInput=document.getElementById("fileInput")
const name=document.getElementById("vaultName").value
const days=parseInt(document.getElementById("timerDays").value)
const recipients=document.getElementById("recipients").value
const status=document.getElementById("status")

if(!fileInput.files.length){

status.innerText="Select file"
return

}

const file=fileInput.files[0]

status.innerText="Encrypting file..."

const encrypted=await encryptFile(file)

downloadFile(encrypted,file.name)

const cid=generateCID()

const vault={

name:name,
cid:cid,
created:Date.now(),
lastCheckin:Date.now(),
timer:days,
recipients:recipients.split(",")

}

let vaults=JSON.parse(localStorage.getItem("ghostVaults")||"[]")

vaults.push(vault)

localStorage.setItem("ghostVaults",JSON.stringify(vaults))

status.innerText="Vault created"

loadVaults()

}

function loadVaults(){

const list=document.getElementById("vaultList")

list.innerHTML=""

const vaults=JSON.parse(localStorage.getItem("ghostVaults")||"[]")

vaults.forEach(v=>{

const now=Date.now()

const elapsed=(now-v.lastCheckin)/(1000*60*60*24)

let state="Active"

if(elapsed>v.timer){

state="RELEASED"

}

const li=document.createElement("li")

li.innerHTML=

"<div class='bg-black p-4 border border-gray-800 rounded'>"+
"<b>"+v.name+"</b><br>"+
"CID: "+v.cid+"<br>"+
"Recipients: "+v.recipients.join(", ")+"<br>"+
"Status: "+state+"<br>"+
"Last Check-in: "+new Date(v.lastCheckin).toLocaleString()+"<br>"+
"<button onclick='checkin(\""+v.name+"\")' class='mt-2 bg-gray-800 px-3 py-1 rounded'>Check In</button>"+
"</div>"

list.appendChild(li)

})

}

function checkin(name){

let vaults=JSON.parse(localStorage.getItem("ghostVaults")||"[]")

vaults=vaults.map(v=>{

if(v.name===name){

v.lastCheckin=Date.now()

}

return v

})

localStorage.setItem("ghostVaults",JSON.stringify(vaults))

loadVaults()

}
