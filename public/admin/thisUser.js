

const currentUser = JSON.parse(localStorage.getItem("thisUser"))

console.log(currentUser)

const currentadmin = JSON.parse(localStorage.getItem("admin"))

document.querySelector(".name").innerHTML = currentUser.name || "N/A"
document.querySelector(".bankName").innerHTML = currentUser.bankName || "N/A"
document.querySelector(".accName").innerHTML = currentUser.accountName || "N/A"
document.querySelector(".accNumber").innerHTML = currentUser.accountNumber || "N/A"
document.querySelector(".phone").innerHTML = currentUser.number || "N/A"
document.querySelector(".email").innerHTML = currentUser.email || "N/A"
document.querySelector(".withdraw").innerHTML = currentUser.withdraw || "N/A"
document.querySelector(".package").innerHTML = currentUser.package || "N/A"
document.querySelector(".amountWith").innerHTML = currentUser.amountWithdrawn
document.querySelector(".tradedWith").innerHTML = currentUser.tradeWithdrawn
document.querySelector(".tradedWith").innerHTML = currentUser.refBalance


// OTHER QUERY SELECTORS
const amountGiven = document.querySelector(".amountGiven")

const tradeAmountGiven = document.querySelector(".tradeAmountGiven")

const withForm = document.querySelector(".withForm")

const tradeForm = document.querySelector(".tradeForm")

const withDiv = document.querySelector(".withDiv")

const tradedWithDiv = document.querySelector(".tradedWithDiv")


currentUser.withdraw && withDiv.classList.remove("hidden") 

currentUser.withTraded && tradedWithDiv.classList.remove("hidden")  

const btn = document.querySelector(".approveBtn")

const withTradeBtn = document.querySelector(".withTradeBtn")

const approveWithdraw = async e => {

    e.preventDefault()

    const newUser = {
        withdraw: false,
        amountWithdrawn: (parseInt(currentUser.amountWithdrawn) + parseInt(amountGiven.value)),
        
    }


    fetch(`${url}/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
              return response.text().then((text) => {
                return Promise.reject()
              });
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data);
          window.location.href = "/admin/users"
  
        })
        .catch(function (error) {
          console.log(error)
        })


}

withForm.addEventListener("submit", approveWithdraw)

const approveTradedWithdraw = async e => {

    e.preventDefault()

    const newUser = {
        withdraw: false,
        tradeWithdrawn: (parseInt(currentUser.tradeWithdrawn) + parseInt(tradeAmountGiven.value)),
        lastMinedAmout: (currentUser.lastMinedAmout - parseInt(tradeAmountGiven.value))
        
    }


    fetch(`${url}/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
              return response.text().then((text) => {
                return Promise.reject()
              });
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data);
            window.location.href = "/admin/users"
  
        })
        .catch(function (error) {
          console.log(error)
        })


}

tradeForm.addEventListener("submit", approveTradedWithdraw)

