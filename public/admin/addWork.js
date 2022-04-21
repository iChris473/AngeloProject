

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmsKYLwuwoWbmrRmHKFoQclW63TmFH8Jk",
  authDomain: "perfume-store-ca0eb.firebaseapp.com",
  projectId: "perfume-store-ca0eb",
  storageBucket: "perfume-store-ca0eb.appspot.com",
  messagingSenderId: "117600940233",
  appId: "1:117600940233:web:bd3d621680be87aea0dd18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage =  getStorage(app)

// other stuffs
const noPicture = document.querySelector(".noPicture")
const withPicture = document.querySelector(".withPicture")
const picImg = document.querySelector(".picImg")
const noPicInput = document.querySelector(".noPicInput")
const picInput = document.querySelector(".picInput")
const label = document.querySelector(".label")
const picLabel = document.querySelector(".picLabel")
const title = document.querySelector(".title")
const description = document.querySelector(".description")
const price = document.querySelector(".price")
const date = document.querySelector(".date")
const form = document.querySelector(".form")
const error = document.querySelector(".error")
const success = document.querySelector(".success")
const category = document.querySelector(".category")
const submit = document.querySelector(".submit")

let newImg = null
const currentadmin = JSON.parse(localStorage.getItem("admin"))

label.addEventListener("click", function clickInput(){
    noPicture.click()
})

picLabel.addEventListener("click", function clickInput(){
    withPicture.click()
})

noPicInput.addEventListener("change", function displayImage(){
    noPicture.classList.add("hidden")
    withPicture.classList.remove("hidden")
    picImg.src = URL.createObjectURL(noPicInput.files[0])
    newImg = noPicInput.files[0]

})

picInput.addEventListener("change", function displayImage(){
    noPicture.classList.add("hidden")
    withPicture.classList.remove("hidden")
    picImg.src = URL.createObjectURL(picInput.files[0])
    newImg = picInput.files[0]
    console.log(newImg)
})

const timeOut = () => {
    setTimeout(() => {
        error.classList.add("hidden")
        success.classList.add("hidden")
    }, 3000)
}

const uploadWork = async e => {

    e.preventDefault()
    submit.innerHTML = "Loading..."

    const newWork = {
        name: title.value,
        desc: description.value,
        price: price.value,
        date: date.value,
        category: category.value
    }

    const postImg = () => {
        return new Promise(resolve => {
            async function addImg(){ 
            const firebaseImageRef = ref(storage, `${newImg.name}`);
            const metadata = {
              contentType: "image/jpeg",
            };
            // Upload the file and metadata
            try {
              // const uploadTask = uploadBytes(storageRef, file, metadata)
              await uploadBytes(firebaseImageRef, newImg, metadata).then(
                async (snapshot) => {
                  const downloadURL = await getDownloadURL(firebaseImageRef);
                  newWork.picture = downloadURL;
                  console.log(newWork)
                  resolve();
                }
              );
            } catch (err) {
              console.log(err);
              submit.innerHTML = "Submit"
              return
            }}
            addImg()

        }

        )
        
      }

    postImg()
    .then(() => {
        fetch(`https://travel-recruit.herokuapp.com/api/work/create/${currentadmin.id}`, {
          method: "POST",
          body: JSON.stringify(newWork),
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
            console.log(data);
            submit.innerHTML = "Submit"
            title.value = ""
            description.value = ""
            price.value = ""
            date.value = ""
            newImg = null
            noPicture.classList.remove("hidden")
            withPicture.classList.add("hidden")
            error.classList.add("hidden")
            success.classList.remove("hidden")
            timeOut()
          })
          .catch(function (er) {
            console.log(err)
            submit.innerHTML = "Submit"
            error.classList.remove("hidden")
            success.classList.add("hidden")
            timeOut()
          })
      }
      )

}

form.addEventListener("submit", uploadWork)