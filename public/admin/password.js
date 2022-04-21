

const oldPassword = document.querySelector(".oldPassword");
const newPassword = document.querySelector(".newPassword");
const confirmPassword = document.querySelector(".confirmPassword");
const success = document.querySelector(".success");
const mismatch = document.querySelector(".mismatch");
const incorecct = document.querySelector(".incorecct");
const form = document.querySelector(".form");
const submit = document.querySelector(".submit");

const currentadmin = JSON.parse(localStorage.getItem("admin"))

const timeOut = () => {
    setTimeout(() => {
        mismatch.classList.add("hidden")
        incorecct.classList.add("hidden")
    }, 4000)
}

const submitUser = async e => {

    e.preventDefault()

    if(confirmPassword.value != newPassword.value){
        mismatch.classList.remove("hidden")
        timeOut()
        return
    }

    submit.innerHTML = "Updating..."
    const newUser = {
        password: newPassword.value
    }

    fetch(`https://travel-recruit.herokuapp.com/api/admin/update/${currentadmin.id}?p=${oldPassword.value}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `Bearer ${currentadmin?.token}`
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
          oldPassword.value = ""
          newPassword.value = ""
          confirmPassword.value = ""
          success.classList.remove("hidden")
          timeOut()
          submit.innerHTML = "Update"
        })
        .catch(function (error) {
          console.log(error)
          incorecct.classList.remove("hidden")
          timeOut()
          submit.innerHTML = "Update"
        })
    
}

form.addEventListener("submit", submitUser)