

const getUserInformations = () => {

    $.ajax({
      type: "GET",
      url: `${url}/user/get/${user._id}?id=${user._id}`,
      // headers: { "Content-type": "application/json; charset=UTF-8" },
      dataType: "json",

      //if received a response from the server
      success: function(data) {
              // Main Logic for all referall data
              console.log(data);
  
              window.localStorage.setItem("user", JSON.stringify(data))
      },

      //If there was no resonse from the server
      error: function(data){
        // Main Logic for all referall data
        console.log(data);
      },
    }); //end of ajax call

  }
  
    getUserInformations()
  
    function getReferralls(){

      $.ajax({
        type: "GET",
        url: `${url}/user/referrals?username=${user.username}`,
        // headers: { 'custom-header': 'some value' },
        dataType: "json",

        //if received a response from the server
        success: function(data) {
                // Main Logic for all referall data
                console.log(data);

                window.localStorage.setItem("ref", JSON.stringify(data))
        },

        //If there was no resonse from the server
        error: function(data){
          // Main Logic for all referall data
          console.log(data);
        },

        //capture the request before it was sent to server
        // beforeSend: function(jqXHR, settings){

        // },

        // //this is called after the response or error functions are finished
        // //so that we can take some action
        // complete: function(jqXHR, textStatus){

        // }

    }); //end of ajax call
    }
    // async function getReferralls(){
    //     fetch(`${url}/user/referrals?username=${user.username}`, {
    //         method: "GET",
    //         headers: {
    //           "Content-type": "application/json; charset=UTF-8",
    //             token: `Bearer ${user?.token}`
    //         },
    //       })
    //         .then(function (response) {
    //           if (response.ok) {
    //             return response.json();
    //           }
    //           return Promise.reject(response);
    //         })
    //         .then(function (data) {
    
    //             // Main Logic for all referall data
    //             console.log(data);

    //             window.localStorage.setItem("ref", JSON.stringify(data))
    
    //             // LOGIC FOR RENDERING REFERRED USERS IN THE TABLE
    
    //             // data.referred.forEach((user) =>{
    
    //             //     const tableRow = document.createElement("tr")
    //             //     tableRow.className = "border-b hover:bg-opacity-70 bg-opacity-40 bg-gray-800 border-gray-700"
    //             //     tableRow.innerHTML =
                    
    //             //     `
    //             //         <th scope="row"
    //             //             class="px-6 py-4 font-medium text-white whitespace-nowrap">
    //             //             ${user.name}
    //             //         </th>
    //             //         <td class="px-6 py-4">
    //             //             ${user.email}
    //             //         </td>
    //             //         <td class="px-6 py-4">
    //             //             <p
    //             //                 class="${user.verified ? "bg-green-600" : "bg-red-600"} cursor-pointer text-center p-2 text-sm max-w-[100px] rounded-md text-white hover:underline">
    //             //                 ${user.verified ? "Verified" : "Not Verified"}
    //             //             </p>
    //             //         </td>
    
    //             //     `
    //             //       tableBody.appendChild(tableRow)
    
    //             //   })
              
              
    //         })
    //         .catch(function (err) {
    //           console.log(err)
    //         })
    // }
    
    getReferralls()
  