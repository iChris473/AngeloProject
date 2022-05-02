

const currentadmin = JSON.parse(localStorage.getItem("admin"))

const tableBody = document.querySelector(".tableBody")
let jobs = []

async function getAllusers(){
    fetch(`${url}/user/all/${currentadmin.id}`, {
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
          console.log(data);
          data.forEach((user) =>{

            const tableRow = document.createElement("tr")
            tableRow.className = "bg-white border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 tableRow"
            tableRow.innerHTML =
            `
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              ${user.name}
      </th>
      <td class="px-6 py-4">
          ${user.email}
      </td>
      <td class="px-6 py-4">
      ${user.number || "N/A"}
      </td>
      <td class="px-6 py-4">
      ${user.withdraw}
      </td>
      <td class="px-6 py-4">
      ${user.withTraded}
      </td>
      <td class="px-6 py-4">
       <p class=${user.verified ? "text-green-500" : "text-red-500"}>${user.verified}</p>
      </td>
      <td class="px-6 py-4">
        ${user.package}
      </td>

              `
              tableBody.appendChild(tableRow)
              tableRow.addEventListener("click", () => {
                  localStorage.setItem("thisUser", JSON.stringify(user))
                  window.location.href = "/admin/thisuser"
              })
          })
        })
        .catch(function (err) {
          console.log(err)
        })
}

getAllusers()