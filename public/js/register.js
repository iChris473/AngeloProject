

const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const referr = document.querySelector('.referr');
const confirmPassword = document.querySelector('.confirmPassword');
const password = document.querySelector('.password');
const number = document.querySelector('.number');
const fullName = document.querySelector('.fullName');
const email = document.querySelector('.email');
const mismatch = document.querySelector('.mismatch');
const apiError = document.querySelector('.apiError');
const username = document.querySelector('.username');

referr.value = window.location.search.split("=")[1] || ""

const timeOut = () => {
    setTimeout(() => {
        mismatch.classList.add("hidden")
        apiError.classList.add("hidden")
    }, 6000)
}

const submitForm = async e => {

    e.preventDefault();

    if(confirmPassword.value != password.value){
        mismatch.classList.remove("hidden")
        window.location.href = "#error"
        timeOut()
        return
    }
    submit.innerHTML = "Creating Account..."

    const newUser = {
        name: fullName.value,
        email: email.value,
        number: number.value,
        referrer: window.location.search.split("=")[1] || referr.value || "",
        password: password.value,
        username: username.value,

    }

    console.log(newUser)

    fetch(`${url}/user/register`, {
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
              submit.innerHTML = "Register"
              timeOut();
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        submit.innerHTML = "Register"
        window.location.href = "/checkemail"
      })
      .catch(function (error) {
        console.log(error)
      })

}

form.addEventListener('submit',  submitForm)