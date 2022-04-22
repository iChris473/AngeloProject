


const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const bankName = document.querySelector('.bankName');
const accNumber = document.querySelector('.accNumber');
const accName = document.querySelector('.accName');
const accType = document.querySelector('.accType');
const apiError = document.querySelector('.apiError');
const success = document.querySelector('.success');

bankName.value = user.bankName || ""
accNumber.value = user.accountNumber || ""
accName.value = user.accountName || ""
accType.value = user.accountType || ""

const timeOut = () => {
    setTimeout(() => {
        apiError.classList.add("hidden")
    }, 6000)
}

const submitForm = async e => {

    e.preventDefault();

    submit.innerHTML = "Updating..."

    const newUser = {
        bankName: bankName.value,
        accountNumber: accNumber.value,
        accountName: accName.value,
        accountType: accType.value

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


        const  {bankName, accountNumber, accountName, accountType, ...others} = user
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