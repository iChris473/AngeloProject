

const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const email = document.querySelector('.email');
const apiError = document.querySelector('.apiError');


const timeOut = () => {
    setTimeout(() => {
        apiError.classList.add("hidden")
    }, 6000)
}

const submitForm = async e => {

    e.preventDefault();
    
    submit.innerHTML = "Submitting..."

    const newUser = {
        email: email.value,

    }

    fetch(`${url}/user/forgotpass`, {
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
              submit.innerHTML = "Submit"
              timeOut();
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        submit.innerHTML = "Submit"
        window.location.href = "/passemail"
      })
      .catch(function (error) {
        console.log(error)
      })

}

form.addEventListener('submit',  submitForm)