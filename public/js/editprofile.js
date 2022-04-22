

const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const number = document.querySelector('.number');
const fullName = document.querySelector('.fullName');
const email = document.querySelector('.email');
const apiError = document.querySelector('.apiError');
const username = document.querySelector('.username');
const success = document.querySelector('.success');

number.value = user.number || ""
fullName.value = user.name || ""
email.value = user.email || ""
username.value = user.username || ""

const timeOut = () => {
    setTimeout(() => {
        apiError.classList.add("hidden")
    }, 6000)
}

const submitForm = async e => {

    e.preventDefault();

    submit.innerHTML = "Updating..."

    const newUser = {
        name: fullName.value,
        email: email.value,
        number: number.value,
        username: username.value,

    }

    console.log(newUser)

    fetch(`${url}/user/update/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(newUser),
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
              window.location.href = "#error"
              submit.innerHTML = "Update"
              timeOut();
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);


        const  {name, email, number, username, ...others} = user
        const updatedUser = {...others, ...newUser}

        localStorage.setItem("user", JSON.stringify(updatedUser))
        
        submit.innerHTML = "Update"
        success.innerHTML = "Account successfully updated";
        success.classList.remove("hidden")

      })
      .catch(function (error) {
        console.log(error)
      })

}

form.addEventListener('submit',  submitForm)