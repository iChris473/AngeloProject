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






