/*Register JS*/
var validCount = [0, 0, 0, 0];

/*--checkValidInput--
Check Username and Password length
*/
function checkValidInput(Length) {
    if (Length < 8) {
        return false;
    } else {
        return true;
    };
}

function checkUsername() {
    var Length = $("#input-Username").val().length;
    if (checkValidInput(Length)) {
        $.ajax({
            url : "check_login.php",
            type : "get",
            dateType:"text",
            data : {
                user : $('#input-Username').val(),
                mode : "checkUsername"
            },
            success : function (result){
                $('#result').html(result);
                if (result == "1") {
                    $("#status-Username").html("Can use.");
                    $("#status-Username").css("color", "green");
                    validCount[0] = 1;
                }
                else {
                    $("#status-Username").html("That username is taken. Try another.");
                    $("#status-Username").css("color", "red");
                    validCount[0] = 0;
                }
            }
        });
    }
    else {
        $("#status-Username").html("Username length min 8 letter");
        $("#status-Username").css("color", "red");
        validCount[0] = 0;
    }
}

function checkPassword() {
    var Length = $("#input-Password").val().length;
    if (checkValidInput(Length)) {
        $("#status-Password").html("Valid");
        $("#status-Password").css("color", "green");
        validCount[1] = 1;
    }
    else {
        $("#status-Password").html("Password length min 8 letter");
        $("#status-Password").css("color", "red");
        validCount[1] = 0;
    }
}


/*--checkSimilarPass--*/
function checkSimilarPass() {
    var pass = $("#input-Password").val();
    var rePass = $("#input-RePassword").val();
    if (pass == rePass) {
        $("#status-RePassword").html("Valid");
        $("#status-RePassword").css("color", "green");
        validCount[2] = 1;
    }
    else {
        $("#status-RePassword").html("These passwords don't match. Try again?");
        $("#status-RePassword").css("color", "red");
        validCount[2] = 0;
    };
}


function checkValidEmail(name) {
    var x = $("#input-" + name).val();
    var atPosition = x.indexOf("@");
    var dotPosition = x.lastIndexOf(".");
    if (atPosition < 1 || dotPosition < atPosition +2 || dotPosition + 2 >= x.length) {
        $("#status-Email").html(name + " is invalid");
        $("#status-Email").css("color", "red");
        validCount[3] = 0;
    } else {
        $("#status-Email").html(name + " is valid");
        $("#status-Email").css("color", "green");
        validCount[3] = 1;
    };
}

function checkSubmit() {
    dateVar = $("#date").val();
    if ((validCount[0] + validCount[1] + validCount[2] + validCount[3]) == 4 && dateVar != "") {
        $.ajax({
            url : "check_login.php",
            type : "get",
            dateType:"text",
            data : {
                user : $('#input-Username').val(),
                pass : $('#input-Password').val(),
                email : $('#input-Email').val(),
                date : $('#date').val(),
                mode : "save"
            },
            success : alert("Successfully registered")
        });
    }
    else {
        alert("Please valid fill");
    }
}