
const currentUser = JSON.parse(localStorage.getItem("thisUser"))
const currentadmin = JSON.parse(localStorage.getItem("admin"))
console.log(currentUser)
const name = document.querySelector(".name").innerHTML = currentUser.name
const dob = document.querySelector(".dob").innerHTML = currentUser.dob
const nationality = document.querySelector(".nationality").innerHTML = currentUser.nationality
const education = document.querySelector(".education").innerHTML = currentUser.education
const work = document.querySelector(".work").innerHTML = currentUser.work
const phone = document.querySelector(".phone").innerHTML = currentUser.phone
const email = document.querySelector(".email").innerHTML = currentUser.email
const sex = document.querySelector(".sex").innerHTML = currentUser.sex
const ietls = document.querySelector(".ietls").innerHTML = currentUser.ietls
const travel = document.querySelector(".travel").innerHTML = currentUser.travel
const passportNo = document.querySelector(".passport").innerHTML = currentUser.passportNo
const passImg = document.querySelector(".passportImg")
const cvImg = document.querySelector(".cvImg")
const eduImg = document.querySelector(".eduImg")
const jobApplied = document.querySelector(".jobApplied")
const noJob = document.querySelector(".noJob")


currentUser.passPortImg.map((img) => {
    const image = document.createElement("img");
    image.src = img;
    image.className = "h-[300px] object-contain";
    passImg.appendChild(image);
  
  });
  
  currentUser.cvImg.map((img) => {
  
    const image = document.createElement("img");
    image.src = img;
    image.className = "h-[300px] object-contain";
    cvImg.appendChild(image);
  
  });
  
  currentUser.educationImg.map((img) => {
  
    const image = document.createElement("img");
    image.src = img;
    image.className = "h-[300px] object-contain";
    eduImg.appendChild(image);
  
  });
  

  async function getAllWorks(){
    fetch(`https://travel-recruit.herokuapp.com/api/app/user/${currentUser._id}?userid=${currentUser._id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `Bearer ${currentadmin?.token}`
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          if(data.length == 0){
            console.log(data.length)
            noJob.className = "flex items-center justify-center my-10 noJob"
          } else {
            console.log(data)
            noJob.className = "hidden noJob"

          }
          
                data.forEach((work) =>{
    
                      const specialJob = document.createElement("div")
                      specialJob.innerHTML = `
                      <div class="shadow-md bg-gray-50 p-4 flex items-center flex-col justify-center">						
                      <img src=${work.picture} alt="image" class="max-w-[200px]">
                      <div class="flex items-center flex-col">
                          <h3 class="margin-bottom-15 text-md text-gray-700 text-center max-w-[250px]">${work.name}</h3>
                          <img src="/public/img/rating.png" alt="image" class="margin-bottom-5">
                          <p>${work.date}</p>	
                      </div>
                      `
                      jobApplied.appendChild(specialJob)

              }
              )
            
        })
        .catch(function (err) {
          console.log(err)
        })
}

getAllWorks()