

const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const password = document.querySelector('.password');
const email = document.querySelector('.email');
const apiError = document.querySelector('.apiError');


const timeOut = () => {
    setTimeout(() => {
        apiError.classList.add("hidden")
    }, 6000)
}

const submitForm = async e => {

    e.preventDefault();

    submit.innerHTML = "Signin in..."

    const newUser = {
        email: email.value,
        password: password.value,

    }

    console.log(newUser)

    fetch(`${url}/user/login`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
            return response.json();
          } else {
              return response.text().then((text) => {
                apiError.innerHTML = text;
                apiError.classList.remove("hidden")
                window.location.href = "#error"
                submit.innerHTML = "Login"
                timeOut();
                return Promise.reject()
              });
          }
          return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data))
        submit.innerHTML = "Login"
        window.location.href = "/"
      })
      .catch(function (error) {
        console.log(error)
        // window.alert("Something went wrong.", error);
   
     
      })

}

form.addEventListener('submit',  submitForm)