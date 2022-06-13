$(function() {
    !localStorage.getItem('username') ? window.location.href = '../../index.html': null;

    function userAPI(fullname = ''){

        let filter = [];
        $("#expired").is(':checked') ? filter.push($("#expired").val()) : null;
        $("#low-stock").is(':checked') ? filter.push($("#low-stock").val()) : null;
        $("#user-table tbody").html('<tr><td colspan="6"><h3 style="text-align:center">Loading...</h3></td></tr>');
        let url = fullname == '' ? 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users' : `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${fullname}`;
        
        $.ajax({
            url,
            type: 'GET',
            contentType: 'application/json',
            success: function(res){
                console.log(res);
                if(res){
                    let usersTableRow = '';
                    for(var i=0; i<res.length; i++){
                            let date = res[i].dob.split('-');
                            date = date[0] + ' ' + date[1] + ', ' + date[2];
                            usersTableRow += `<tr>
                            <td class="table-td-custom-color">${res[i].id}</td>
                            <td class="table-td-custom-color-2"> <img src="${res[i].profilePic}" alt="profile picture" /></td>
                            <td><span class="table-td-custom-color-2">${res[i].fullName}</span></td>
                            <td class="table-td-custom-color">${date}</td>
                            <td class="table-td-custom-color-2">${res[i].gender}</td>
                            <td class="table-td-custom-color-2">${res[i].currentCity +', '+res[i].currentCountry}</td>
                        </tr>`;
                    }
                    if(usersTableRow == ''){
                        $("#count-of-product").text(0);
                        $("#user-table tbody").html('<tr><td colspan="6"><h3 style="text-align:center">No Result Found!</h3></td></tr>')
                    }else{
                        $("#user-table tbody").html(usersTableRow);
                    }
                }       
                
            },
            error: function(err){
                $("#user-table tbody").html('<tr><td colspan="6"><h3 style="text-align:center">No Result Found!</h3></td></tr>')
                console.log("Error", err);
            }
        });
    }

    userAPI();
    $("#expired, #low-stock").click(() => {
        userAPI();
    });

    $("#fullname").keyup((event) => {
        if(event.which == 13){
            let fullname = $("#fullname").val();
            if(fullname.length > 2){
                userAPI(fullname);
            }else if(fullname.length == 0){
                userAPI();
            }else{
                alert("Please enter at least 2 characters");
            }
        }
    });

    $("#reset").click(()=>{
        $("#fullname").val('');
        userAPI();
    })
    $("#logout").click(() => {
        localStorage.clear();
        window.location.href = "../../index.html";
    })
})