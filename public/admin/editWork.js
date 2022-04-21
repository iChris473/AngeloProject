

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
const xicon = document.querySelector(".xicon")
const deleteWork = document.querySelector(".Delete")

const currentWork = JSON.parse(localStorage.getItem("work"))
const currentadmin = JSON.parse(localStorage.getItem("admin"))

title.value = currentWork.name
description.value = currentWork.desc
price.value = currentWork.price
date.value = currentWork.date
category.value = currentWork.category
picImg.src = currentWork.picture

let newImg = null

picLabel.addEventListener("click", function clickInput(){
    withPicture.click()
})

xicon.addEventListener("click", () => {
    picImg.src = currentWork.picture
    newImg = null
    xicon.classList.add("hidden")
})


picInput.addEventListener("change", function displayImage(){
    picImg.src = URL.createObjectURL(picInput.files[0])
    newImg = picInput.files[0]
    xicon.classList.remove("hidden")
})

const timeOut = () => {
    setTimeout(() => {
        error.classList.add("hidden")
        success.classList.add("hidden")
    }, 4000)
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
        return new Promise((resolve) => {

          async function addImg() {

             // delete previous file
          const deleteRef = ref(storage, `${currentWork.picture}`);
          // Delete the file
          deleteObject(deleteRef)
            .then(() => {
              // File deleted successfully
              console.log("old picture deleted");
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
              console.log(error);
            });
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
                  console.log(newWork);
                  resolve();
                }
              );
            } catch (err) {
              console.log(err);
              submit.innerHTML = "Submit";
              return;
            }
          }
          newImg ? addImg() : resolve();
        });
        
      }

      console.log(newWork)

    postImg()
    .then(() => {
        fetch(`https://travel-recruit.herokuapp.com/api/work/update/${currentadmin.id}?id=${currentWork._id}`, {
          method: "PUT",
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
            newImg = null
            picImg.src = data.picture
            error.classList.add("hidden")
            success.classList.remove("hidden")
            localStorage.setItem("work", JSON.stringify(data))
            timeOut()
          })
          .catch(function (err) {
            console.log(err)
            submit.innerHTML = "Submit"
            error.classList.remove("hidden")
            success.classList.add("hidden")
            timeOut()
          })
      }
      )

}

const deleteCurrentWork = async () => {
  deleteWork.innerHTML = "Deleting...";
  const postImg = () => {
    return new Promise((resolve) => {
      async function removeImg() {
        // delete previous file
        const deleteRef = ref(storage, `${currentWork.picture}`);
        // Delete the file
        deleteObject(deleteRef)
          .then(() => {
            // File deleted successfully
            console.log("old picture deleted");
            resolve()
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            deleteWork.innerHTML = "Submit";
            error.classList.remove("hidden");
            success.classList.add("hidden");
            timeOut();
            return
          });
       
      }
      newImg ? removeImg() : resolve();
    });
  };



  postImg().then(() => {
    fetch(`https://travel-recruit.herokuapp.com/api/work/delete/${currentadmin.id}?id=${currentWork._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: `Bearer ${currentadmin?.token}`,
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
        deleteWork.innerHTML = "Delete";
        newImg = null;
        picImg.src = data.picture;
        error.classList.add("hidden");
        success.classList.add("hidden");
        localStorage.setItem("work", null);
        window.location.href = "/admin/works"
      })
      .catch(function (err) {
        console.log(err);
        deleteWork.innerHTML = "Delete";
        error.classList.remove("hidden");
        success.classList.add("hidden");
        timeOut();
      });
  });
};

deleteWork.addEventListener("click", deleteCurrentWork)

form.addEventListener("submit", uploadWork)