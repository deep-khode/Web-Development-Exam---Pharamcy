$(function(){

    if(localStorage.getItem("username") != null){
        window.location.href = './pages/order/order.html';
    }

    $("#login").click(() => {
        let username = $("#username").val();
        let password = $("#password").val();

        if(username === password){
            localStorage.setItem("username", username);
            alert("Login Successful");
            window.location.href = './pages/order/order.html';
        }else{
            alert("Please enter valid credentials!");
        }
    });

})