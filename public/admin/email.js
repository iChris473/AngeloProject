

const email = document.querySelector(".email");
const password = document.querySelector(".password");
const success = document.querySelector(".success");
const incorecct = document.querySelector(".incorecct");
const form = document.querySelector(".form");
const submit = document.querySelector(".submit");

const currentadmin = JSON.parse(localStorage.getItem("admin"))

const timeOut = () => {
    setTimeout(() => {
        success.classList.add("hidden")
        incorecct.classList.add("hidden")
    }, 4000)
}

const submitUser = async e => {

    e.preventDefault()

    submit.innerHTML = "Updating..."
    const newUser = {
        email: email.value
    }

    fetch(`https://travel-recruit.herokuapp.com/api/admin/update/${currentadmin.id}?p=${password.value}`, {
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
          email.value = ""
          password.value = ""
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