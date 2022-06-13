$(function() {
    !localStorage.getItem('username') ? window.location.href = '../../index.html': null;

    function orderAPI(){

        let filter = [];
        $("#new").is(':checked') ? filter.push($("#new").val()) : null;
        $("#packed").is(':checked') ? filter.push($("#packed").val()) : null;
        $("#intransit").is(':checked') ? filter.push($("#intransit").val()) : null;
        $("#delivery").is(':checked') ? filter.push($("#delivery").val()) : null;
        $("#order-table tbody").html('<tr><td colspan="5"><h3 style="text-align:center">Loading...</h3></td></tr>');
        $.ajax({
            url: 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders',
            type: 'GET',
            contentType: 'application/json',
            success: function(res){
                // console.log(res);
                if(res){
                    let orderTableRow = '';
                    let j=0;
                    for(var i=0; i<res.length; i++){
                        if(filter.includes(res[i].orderStatus)){
                            let date = res[i].orderDate.split('-');
                            date = date[0] + ' ' + date[1] + ', ' + date[2];
                            orderTableRow += `<tr>
                            <td class="table-td-custom-color">${res[i].id}</td>
                            <td class="table-td-custom-color-2">${res[i].customerName}</td>
                            <td><span class="table-td-custom-color-2">${date}</span><br /><span class="table-td-custom-color">${res[i].orderTime}</span></td>
                            <td class="table-td-custom-color">$${res[i].amount}</td>
                            <td class="table-td-custom-color-2">${res[i].orderStatus}</td>
                        </tr>`;
                        j++;
                        }
                        if(orderTableRow == ''){
                            $("#count-of-order").text(0);
                            $("#order-table tbody").html('<tr><td colspan="5"><h3 style="text-align:center">No Result Found!</h3></td></tr>')
                        }else{
                            $("#order-table tbody").html(orderTableRow);
                            $("#count-of-order").text(j);
                        }
                    }
                }       
                
            },
            error: function(err){
                console.log("Error", err);
            }
        });
    }

    orderAPI();
    $("#new, #packed, #intransit, #delivery").click(() => {
        orderAPI();
    })

    $("#logout").click(() => {
        localStorage.clear();
        window.location.href = "../../index.html";
    })
})