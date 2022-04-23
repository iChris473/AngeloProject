

const fullName = document.querySelector(".fullName")
const mineBalance = document.querySelector(".mineBalance")
const mineTotal = document.querySelector(".mineTotal")
const refBalance = document.querySelector(".refBalance")
const totalRef = document.querySelector(".totalRef")
const verified = document.querySelector(".verified")
const verifyInput = document.querySelector(".verifyInput")
const form = document.querySelector(".verifyForm")
const refLink = document.querySelector(".refLink")
const copyBtn = document.querySelector(".copyBtn")
const veriyParent = document.querySelector(".veriyParent")
const xtotalRef = document.querySelector(".xtotalRef")
const xrefBalance = document.querySelector(".xrefBalance")
const xminingBalance = document.querySelector(".xminingBalance")
const refUsername = document.querySelector(".refUsername")
const hiddenRef = document.querySelector(".hiddenRef")
const tableBody = document.querySelector(".tableBody")
const verifyBtn = document.querySelector(".verifyBtn")
const apiError = document.querySelector(".apiError")
const minemineParent = document.querySelector(".minemineParent")
const mining = document.querySelector(".mining")
const oops = document.querySelector(".oops")
const mineGIf = document.querySelector(".mineGIf")
const buyCoup = document.querySelector(".buyCoup")
const boldMineBal = document.querySelector(".boldMineBal")
const amountWithdrawn = document.querySelector(".amountWithdrawn")

fullName.innerHTML = user.name
amountWithdrawn.innerHTML = user.amountWithdrawn || "0"
refLink.innerHTML = "https://nairacity.herokuapp.com/register?ref=" + user.username

user.verified ? verified.innerHTML = "Verified" : verified.innerHTML = "Not Verified"
user.verified ? verified.classList.add("text-green-500") : verified.classList.add("text-pink-500")
user.verified && (veriyParent.classList.add("hidden"))
user.verified && (hiddenRef.classList.add("hidden"))
user.verified && (copyBtn.classList.remove("hidden"))
user.verified && (refLink.classList.remove("hidden"))
user.verified && (minemineParent.classList.remove("hidden"))
user.verified && (mining.classList.remove("hidden"))
user.verified && (oops.classList.add("hidden"))
user.verified && (mineGIf.classList.remove("hidden"))
user.verified && (buyCoup.classList.add("hidden"))





const copyToClipboard = () => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText){
       navigator.clipboard.writeText(refLink.innerHTML)
       copyBtn.innerHTML = "Copied to clipboard"
       copyBtn.className = "py-2 px-4 rounded-md bg-green-600 font-bold cursor-pointer copyBtn"
  }
    // return navigator.clipboard.writeText(refLink.innerHTML);
  return Promise.reject('The Clipboard API is not available.');
};

copyBtn.addEventListener("click", copyToClipboard)

async function getReferralls(){
    fetch(`${url}/user/referrals?username=${user.username}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
            token: `Bearer ${user?.token}`
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(function (data) {

            // Main Logic for all referall data
            console.log(data);

            totalRef.innerHTML = data.length
            refBalance.innerHTML = (data.length * 1000).toLocaleString()
            xrefBalance.innerHTML = (data.length * 1000).toLocaleString()
            xtotalRef.innerHTML = data.length
            localStorage.setItem("ref", JSON.stringify(data))

            // LOGIC FOR RENDERING REFERRED USERS IN THE TABLE

            data.forEach((user) =>{

                const tableRow = document.createElement("tr")
                tableRow.className = "border-b hover:bg-opacity-70 bg-opacity-40 bg-gray-800 border-gray-700"
                tableRow.innerHTML =
                
                `
                    <th scope="row"
                        class="px-6 py-4 font-medium text-white whitespace-nowrap">
                        ${user.name}
                    </th>
                    <td class="px-6 py-4">
                        ${user.email}
                    </td>
                    <td class="px-6 py-4">
                        <p
                            class="${user.verified ? "bg-green-600" : "bg-red-600"} cursor-pointer text-center p-2 text-sm max-w-[100px] rounded-md text-white hover:underline">
                            ${user.verified ? "Verified" : "Not Verified"}
                        </p>
                    </td>

                `
                  tableBody.appendChild(tableRow)

              })
          
          
        })
        .catch(function (err) {
          console.log(err)
        })
}

getReferralls()


async function getTotalMined(){
    fetch(`${url}/user/mine/${user._id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
            token: `Bearer ${user?.token}`
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data);
          
            mineBalance.innerHTML = data.balance.toLocaleString()
            boldMineBal.innerHTML = data.balance.toLocaleString()
            mineTotal.innerHTML = data.total.toLocaleString()
            localStorage.setItem("mine", JSON.stringify(data))
        })
        .catch(function (err) {
          console.log(err)
        })
}

if(user.verified) {
    getTotalMined()
} else {
    mineTotal.innerHTML = 0;    boldMineBal.innerHTML = 0;    mineTotal.innerHTML = 0;
}


async function veifyUserAccount(e){

    e.preventDefault();

    const userInfo = {
        email: user.email,
        coupon: verifyInput.value
    } 

    verifyBtn.innerHTML = "Verifying..."

    fetch(`${url}/user/verify`, {
        method: "PUT",
        body: JSON.stringify(userInfo),
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
                    apiError.innerHTML = text;
                    apiError.classList.remove("hidden")
                    verifyBtn.innerHTML = "Verify"
                    timeOut();
                    return Promise.reject()
                  });
              }
              return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data)

          const {verified, ...others} = user;
          const newVerifiedUser = {...others, verified: true}
          localStorage.setItem("user", JSON.stringify(newVerifiedUser))
            window.location.reload()

        })
        .catch(function (err) {
          console.log(err)
        })
}

form.addEventListener("submit", veifyUserAccount)

