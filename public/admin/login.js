

const email = document.querySelector(".email");
const password = document.querySelector(".password");
const form = document.querySelector(".form");
const login = document.querySelector(".login");

const loginUser= async e => {
    e.preventDefault()
    login.innerHTML = "Signin..."
    const newUser = {
        email: email.value,
        password: password.value
    }

    fetch( `${url}/admin/login`, {
        method: "POST",
        body: JSON.stringify(newUser),
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
          localStorage.setItem("admin", JSON.stringify(data))
          login.innerHTML = "Sign In"
          window.location.href = '/admin'
        })
        .catch(function (error) {
          console.log(error)
          window.alert("Check your credentials and try again", error);
          login.innerHTML = "Sign In"
        })
    
}

form.addEventListener("submit", loginUser)