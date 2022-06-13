$(function() {

    !localStorage.getItem('username') ? window.location.href = '../../index.html': null;
    
    function productAPI(){

        let filter = [];
        $("#expired").is(':checked') ? filter.push($("#expired").val()) : null;
        $("#low-stock").is(':checked') ? filter.push($("#low-stock").val()) : null;
        $("#product-table tbody").html('<tr><td colspan="6"><h3 style="text-align:center">Loading...</h3></td></tr>');
        let todayDate = new Date();
        let dd = ((todayDate.getDate()) < 10 ? '0' : '')+(todayDate.getDate());
        let mm = ((todayDate.getMonth()+1) < 10 ? '0' : '')+(todayDate.getMonth() + 1);
        let yy = todayDate.getFullYear();
        let currentDate = new Date(yy+'-'+mm+'-'+dd)

        $.ajax({
            url: 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products',
            type: 'GET',
            contentType: 'application/json',
            success: function(res){
                // console.log(res);
                if(res){
                    let productTableRow = '';
                    let j=0;
                    for(var i=0; i<res.length; i++){
                        productTableRow += createTableRow(res[i]);
                        j++;
                    }

                    if(productTableRow == ''){
                        $("#count-of-product").text(0);
                        $("#product-table tbody").html('<tr><td colspan="6"><h3 style="text-align:center">No Result Found!</h3></td></tr>')
                    }else{
                        $("#product-table tbody").html(productTableRow);
                        $("#count-of-product").text(j);
                    }
                }       
                
            },
            error: function(err){
                console.log("Error", err);
                $("#product-table tbody").html('<tr><td colspan="6"><h3 style="text-align:center">No Result Found!</h3></td></tr>')
            }
        });
    }

    const createTableRow = (row) => {
        let date = row.expiryDate.split('-');
        date = date[0] + ' ' + date[1] + ', ' + date[2];
       return `<tr> <td class="table-td-custom-color">${row.id}</td>
                                <td class="table-td-custom-color-2">${row.medicineName}</td>
                                <td><span class="table-td-custom-color">${row.medicineBrand}</span></td>
                                <td class="table-td-custom-color-2">${date}</td>
                                <td class="table-td-custom-color">$${row.unitPrice}</td>
                                <td class="table-td-custom-color">${row.stock}</td>
                            </tr>`;
    }

    productAPI();
    $("#expired").click((e) => {
        let tablebody = document.getElementById('product-body');
        let tableRow = tablebody.getElementsByTagName('tr');

        for (let i = 0; i < tableRow.length; i++) {
            value = tableRow[i].children[3].innerHTML;
            if(new Date(value.trim()).getTime() < new Date().getTime()){
                if($("#expired").is(':checked') === true){
                    tableRow[i].style.display = "";
                    $('#count-of-product').text(parseInt($('#count-of-product').text()) + 1 );
                }else{
                    tableRow[i].style.display = "none";
                    $('#count-of-product').text(parseInt($('#count-of-product').text()) - 1 );
                }
            }
        }
    })

    $("#low-stock").click(() => {
        let tablebody = document.getElementById('product-body');
        let tableRow = tablebody.getElementsByTagName('tr');

        for (let i = 0; i < tableRow.length; i++) {
            let value = tableRow[i].children[5].innerHTML;
            if(value < 100){
                if($("#low-stock").is(':checked') === true){
                    tableRow[i].style.display = "";
                    $('#count-of-product').text(parseInt($('#count-of-product').text()) + 1 );
                }else{
                    tableRow[i].style.display = "none";
                    $('#count-of-product').text(parseInt($('#count-of-product').text()) - 1 );
                } 
            }
        }
    })

    $("#logout").click(() => {
        localStorage.clear();
        window.location.href = "../../index.html";
    })
})