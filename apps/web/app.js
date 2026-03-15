function loadVaults() {

fetch(API + "/vaults")

.then(res => res.json())

.then(data => {

const list = document.getElementById("vaultList")

list.innerHTML = ""

data.forEach(vault => {

const item = document.createElement("li")

item.innerText =
"Vault: " + vault.vault_id +
" | CID: " + vault.cid +
" | Deadline: " + vault.deadline

list.appendChild(item)

})

})

}
