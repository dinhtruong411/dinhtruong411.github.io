/*Register JS*/

/*--checkValidInput--
Check Username and Password length
*/
function checkValidInput(name) {
    var Length = document.getElementById("input-" + name).value.length;
    if (Length < 8) {
        document.getElementById("status-" + name).innerHTML = name + " length min 8 letter";
        document.getElementById("status-" + name).style.color = "red";
    } else {
        document.getElementById("status-" + name).innerHTML = name + " valid";
        document.getElementById("status-" + name).style.color = "green";
    };
}

/*--checkSimilarPass--*/
function checkSimilarPass() {
     var pass = document.getElementById("input-Password").value;
     var rePass = document.getElementById("input-RePassword").value;
     if (pass != rePass) {
        document.getElementById("status-RePassword").innerHTML = "Passwords must match";
        document.getElementById("status-RePassword").style.color = "red";
    } else {
        document.getElementById("status-RePassword").innerHTML = "Valid";
        document.getElementById("status-RePassword").style.color = "green";
    };


}


function checkValidEmail(name) {
    var x = document.getElementById("input-" + name).value;
    var atPosition = x.indexOf("@");
    var dotPosition = x.lastIndexOf(".");
    if (atPosition < 1 || dotPosition < atPosition +2 || dotPosition + 2 >= x.length) {
        document.getElementById("status-" + name).innerHTML = name + " is invalid";
        document.getElementById("status-" + name).style.color = "red";
    } else {
        document.getElementById("status-" + name).innerHTML = name + " is valid";
        document.getElementById("status-" + name).style.color = "green";
    };
}