

const currentUser = JSON.parse(localStorage.getItem("thisUser"))

const currentadmin = JSON.parse(localStorage.getItem("admin"))

document.querySelector(".name").innerHTML = currentUser.name || "N/A"
document.querySelector(".bankName").innerHTML = currentUser.bankName || "N/A"
document.querySelector(".accName").innerHTML = currentUser.accountName || "N/A"
document.querySelector(".accNumber").innerHTML = currentUser.accountNumber || "N/A"
document.querySelector(".phone").innerHTML = currentUser.number || "N/A"
document.querySelector(".email").innerHTML = currentUser.email || "N/A"
document.querySelector(".withdraw").innerHTML = currentUser.withdraw || "N/A"
document.querySelector(".package").innerHTML = currentUser.package || "N/A"
document.querySelector(".amountWith").innerHTML = currentUser.amountWithdrawn || "N/A"


const btn = document.querySelector(".approveBtn")

const approveWithdraw = async () => {


    const newUser = {
        withdraw: false
    }

    if(currentUser.withdraw){
        newUser.amountWithdrawn = currentUser.amountWithdrawn + 1
    }

    fetch(`${url}/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `Bearer ${user?.token}`
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
            window.location.href = "/users"
  
        })
        .catch(function (error) {
          console.log(error)
        })


}

btn.addEventListener("click", approveWithdraw)

