
const currentUser = JSON.parse(localStorage.getItem("thisUser"))
const currentadmin = JSON.parse(localStorage.getItem("admin"))
console.log(currentUser)
document.querySelector(".name").innerHTML = currentUser.name || "N/A"
document.querySelector(".bankName").innerHTML = currentUser.bankName || "N/A"
document.querySelector(".accName").innerHTML = currentUser.accountName || "N/A"
document.querySelector(".accNumber").innerHTML = currentUser.accountNumber || "N/A"
document.querySelector(".phone").innerHTML = currentUser.number || "N/A"
document.querySelector(".email").innerHTML = currentUser.email || "N/A"
document.querySelector(".withdraw").innerHTML = currentUser.withdraw || "N/A"
document.querySelector(".package").innerHTML = currentUser.package || "N/A"


