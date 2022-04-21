

const tableBody = document.querySelector(".tableBody")
let jobs = []

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
          console.log(data);
          data.forEach((work) =>{

            const tableRow = document.createElement("tr")
            tableRow.className = "bg-white border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 tableRow"
            tableRow.innerHTML =
            `
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              <img src="${work.picture}" alt="image" class="circle h-10 w-10">
      </th>
      <td class="px-6 py-4">
          ${work.name}
      </td>
      <td class="px-6 py-4">
      ${work.date}
      </td>
      <td class="px-6 py-4">
      ${work.price}
      </td>
      <td class="px-6 py-4 text-right">
          <a href="#" class="${work.price.toString()} bg-blue-600 p-1 text-xs rounded-md text-white dark:text-blue-500 hover:underline">View</a>
      </td>

              `
              tableBody.appendChild(tableRow)
              tableRow.addEventListener("click", () => {
                  localStorage.setItem("work", JSON.stringify(work))
                  window.location.href = "/admin/editwork"
              })
          })
        })
        .catch(function (err) {
          console.log(err)
        })
}

getAllWorks()