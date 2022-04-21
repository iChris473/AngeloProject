const admin = JSON.parse(localStorage.getItem("admin"))

if(!admin){
    window.location.href = "/admin/login" 
}
const logout= document.querySelector(".logout")
logout.addEventListener("click", () => {
    localStorage.setItem("admin", null)
    window.location.href = "/admin/login"
})
    const sidebar = document.querySelector(".sidebar")
    const menu = document.querySelector(".menu")
    const cancel = document.querySelector(".cancel")
    const totalUsers = document.querySelector(".totalUsers")
    const allWorks = document.querySelector(".allWorks")
    const totalApps = document.querySelector(".totalApps")

    menu.addEventListener("click", () => {
        cancel.classList.remove("hidden")
        menu.classList.add("hidden")
        sidebar.classList.remove("hidden")
        sidebar.classList.add("absolute")
    })
    cancel.addEventListener("click", () => {
        cancel.classList.add("hidden")
        menu.classList.remove("hidden")
        sidebar.classList.add("hidden")
        sidebar.classList.remove("absolute")
    })




    async function getTotalUsers(){
        fetch(`https://travel-recruit.herokuapp.com/api/user/all/${admin.id}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              token: `Bearer ${admin?.token}`
            },
          })
            .then(function (response) {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(response);
            })
            .then(function (data) {
                totalUsers.innerHTML = data.length
            })
            .catch(function (err) {
              console.log(err)
            })
    }
    
    getTotalUsers()



    async function getAllWorks(){
        fetch("https://travel-recruit.herokuapp.com/api/work/get", {
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
                allWorks.innerHTML = data.length
            })
            .catch(function (err) {
              console.log(err)
            })
    }
    
    getAllWorks()

    async function getTotalApps(){
        fetch(`https://travel-recruit.herokuapp.com/api/app/get/${admin.id}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              token: `Bearer ${admin?.token}`
            },
          })
            .then(function (response) {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(response);
            })
            .then(function (data) {
                totalApps.innerHTML = data.length
                console.log(data)
            })
            .catch(function (err) {
              console.log(err)
            })
    }
    
    getTotalApps()