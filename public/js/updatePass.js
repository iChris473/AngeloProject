

const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const confirmPass = document.querySelector('.confirmPass');
const newPass = document.querySelector('.newPass');
const mismatch = document.querySelector('.mismatch');
const apiError = document.querySelector('.apiError');

const timeOut = () => {
    setTimeout(() => {
        mismatch.classList.add("hidden")
        apiError.classList.add("hidden")
    }, 6000)
}

const submitForm = async e => {

    e.preventDefault();

    if(confirmPass.value != newPass.value){
        mismatch.classList.remove("hidden")
        window.location.href = "#error"
        timeOut()
        return
    }
    submit.innerHTML = "Updating..."

    const resetToken = window.location.search.split("?")[1]

    fetch(`${url}/user/resetpassword?${resetToken}`, {
      method: "PUT",
      body: JSON.stringify({ password: newPass.value }),
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
              submit.innerHTML = "Update"
              timeOut();
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        submit.innerHTML = "Update"
        window.location.href = "/login"
      })
      .catch(function (error) {
        console.log(error)
      })

}

form.addEventListener('submit',  submitForm)