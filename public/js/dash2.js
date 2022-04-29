

const getUserInformations = () => {

    fetch(`${url}/user/get/${user._id}?id=${user._id}`, {
    method: "GET",
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
  
      window.localStorage.setItem("user", JSON.stringify(data))
  
    })
    .catch(function (err) {
      console.log(err)
    })
    }
  
    getUserInformations()
  
  