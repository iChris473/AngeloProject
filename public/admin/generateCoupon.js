

const starter = document.querySelector(".starter")
const special = document.querySelector(".special")
const premium = document.querySelector(".premium")


const generateCoupon = async (type) => {


    fetch(`${url}/coupon/create?type=${type}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
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
        localStorage.setItem("icode", JSON.stringify(data))
        window.location.href = "/coupon"
      })
      .catch(function (error) {
        console.log(error)
        window.alert("Something went wrong.", error);
   
     
      })

}


starter.addEventListener("click",  generateCoupon.bind(null, "starter"))

special.addEventListener("click",  generateCoupon.bind(null, "special"))

premium.addEventListener("click",  generateCoupon.bind(null, "premium"))

