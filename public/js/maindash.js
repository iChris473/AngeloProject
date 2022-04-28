


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
const power = document.querySelector(".power")
const mine24 = document.querySelector(".mine24")

 user.verified ? verified.innerHTML = "Verified" : verified.innerHTML = "Not Verified"
 user.verified ? verified.classList.add("text-green-500") : verified.classList.add("text-pink-500")
 user.verified && (veriyParent.classList.add("hidden"))
 user.verified && (hiddenRef.classList.add("hidden"))
 user.verified && (copyBtn.classList.remove("hidden"))
 user.verified && (refLink.classList.remove("hidden"))
 user.verified && (buyCoup.classList.add("hidden"))
 user.verified && (oops.classList.add("hidden"))


const getUpdatesOnUser = () => {

  fetch(`${url}/user/get/${user._id}?id=${user._id}`, {
  method: "GET",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
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
    
    fullName.innerHTML = data.name

    amountWithdrawn.innerHTML = data.amountWithdrawn

    refLink.innerHTML = "https://nairacity.herokuapp.com/register?ref=" + data.username

    if( ( ((new Date().getTime() - data.lastMinedDate) / (1000 * 60 * 60 * 24))  < 1 ) && data.verified ){

      power.classList.add("hidden")
      minemineParent.classList.remove("hidden")
      mining.classList.remove("hidden")
      mineGIf.classList.remove("hidden")

    } else {

      data.verified && power.classList.remove("hidden")
      data.verified && mine24.classList.remove("hidden")
      minemineParent.classList.add("hidden")
      mining.classList.add("hidden")
      mineGIf.classList.add("hidden")

    }

    if( ((new Date().getTime() - data.lastMinedDate) / (1000 * 60 * 60 * 24) ) < 1  ){

      switch (data.package) {
    
        case "special":
          mineBalance.innerHTML = (data.lastMinedAmout - 500 )?.toLocaleString()
          boldMineBal.innerHTML = (data.lastMinedAmout - 500 )?.toLocaleString()
          xminingBalance.innerHTML = (data.lastMinedAmout - 500 )?.toLocaleString()
          mineTotal.innerHTML = ( (data.lastMinedAmout - 500 ) / 500 )?.toLocaleString()
          break;
    
        case "premium":
          mineBalance.innerHTML = (data.lastMinedAmout - 1000 )?.toLocaleString()
          boldMineBal.innerHTML = (data.lastMinedAmout - 1000 )?.toLocaleString()
          xminingBalance.innerHTML = (data.lastMinedAmout - 1000 )?.toLocaleString()
          mineTotal.innerHTML = ( (data.lastMinedAmout - 1000 ) / 1000 )?.toLocaleString()
          break;
    
        case "pro":
            mineBalance.innerHTML = (data.lastMinedAmout - 2000 )?.toLocaleString()
            boldMineBal.innerHTML = (data.lastMinedAmout - 2000 )?.toLocaleString()
            xminingBalance.innerHTML = (data.lastMinedAmout - 2000 )?.toLocaleString()
            mineTotal.innerHTML = ( (data.lastMinedAmout - 2000 ) / 2000 )?.toLocaleString()
            break;
    
        case "lite":{
          mineBalance.innerHTML = (data.lastMinedAmout - 5000 )?.toLocaleString()
          boldMineBal.innerHTML = (data.lastMinedAmout - 5000 )?.toLocaleString()
          xminingBalance.innerHTML = (data.lastMinedAmout - 5000 )?.toLocaleString()
          mineTotal.innerHTML = ( (data.lastMinedAmout - 5000 ) / 5000 )?.toLocaleString()
        }
          break;
    
        case "xlite":
          console.log(data.lastMinedAmout)
          mineBalance.innerHTML = (data.lastMinedAmout - 10000 )?.toLocaleString()
          boldMineBal.innerHTML = (data.lastMinedAmout - 10000 )?.toLocaleString()
          xminingBalance.innerHTML = (data.lastMinedAmout - 10000 )?.toLocaleString()
          mineTotal.innerHTML = ( (data.lastMinedAmout - 10000 ) / 10000 )?.toLocaleString()
          break;
      
        default:
          mineBalance.innerHTML = (data.lastMinedAmout - 200 )?.toLocaleString()
          boldMineBal.innerHTML = (data.lastMinedAmout - 200 )?.toLocaleString()
          xminingBalance.innerHTML = (data.lastMinedAmout - 200 )?.toLocaleString()
          mineTotal.innerHTML = ( (data.lastMinedAmout - 200 ) / 200 )?.toLocaleString()
          break;
      }
    
    } else {
    
      mineBalance.innerHTML = data.lastMinedAmout?.toLocaleString()
      boldMineBal.innerHTML = data.lastMinedAmout?.toLocaleString()
      xminingBalance.innerHTML = data.lastMinedAmout?.toLocaleString()
      mineTotal.innerHTML = data.lastMinedAmout?.toLocaleString()
    
    }
    

    window.localStorage.setItem("user", JSON.stringify(data))

  })
  .catch(function (err) {
    console.log(err)
  })
  }

  getUpdatesOnUser()


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

            totalRef.innerHTML = data.verifiedReferred
            refBalance.innerHTML = ( (data.verifiedReferred * 1000) - user.amountWithdrawn )?.toLocaleString()
            xrefBalance.innerHTML = ( (data.verifiedReferred * 1000) - user.amountWithdrawn )?.toLocaleString()
            xtotalRef.innerHTML = data.verifiedReferred
            localStorage.setItem("ref", JSON.stringify(data))

            // LOGIC FOR RENDERING REFERRED USERS IN THE TABLE

            data.referred.forEach((user) =>{

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


async function startMine(){
    fetch(`${url}/user/mine/${user._id}`, {
        method: "PUT",
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
          window.location.reload()

            // localStorage.setItem("mine", JSON.stringify(data))
        })
        .catch(function (err) {
          console.log(err)
        })
}

power.addEventListener("click", startMine)

if(!user.verified){
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

