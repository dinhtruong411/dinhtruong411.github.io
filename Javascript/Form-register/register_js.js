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
	var Length = document.getElementById("input-Username").value.length;
	if (checkValidInput(Length)) {
		var xhttp;
		if (window.XMLHttpRequest) {
			xhttp = new XMLHttpRequest();
			} else {
			// code for IE6, IE5
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				if (xhttp.responseText == "1") {
					document.getElementById("status-Username").innerHTML = "Can use.";
					document.getElementById("status-Username").style.color = "green";
					validCount[0] = 1;
				}
				else {
					document.getElementById("status-Username").innerHTML = "That username is taken. Try another.";
					document.getElementById("status-Username").style.color = "red";
					validCount[0] = 0;
				}
			}
		};
		user = document.getElementById("input-Username").value;
		xhttp.open("GET", "check_login.php?user=" + user + "&mode=" + 'checkUsername', true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();
		
		

		
	}
	else {
		document.getElementById("status-Username").innerHTML = "Username length min 8 letter";
        document.getElementById("status-Username").style.color = "red";
		validCount[0] = 0;
	}
}

function checkPassword() {
	var Length = document.getElementById("input-Password").value.length;
	if (checkValidInput(Length)) {
		document.getElementById("status-Password").innerHTML = "Valid";
		document.getElementById("status-Password").style.color = "green";
		validCount[1] = 1;
	}
	else {
		document.getElementById("status-Password").innerHTML = "Password length min 8 letter";
        document.getElementById("status-Password").style.color = "red";
		validCount[1] = 0;
	}
}


/*--checkSimilarPass--*/
function checkSimilarPass() {
     var pass = document.getElementById("input-Password").value;
     var rePass = document.getElementById("input-RePassword").value;
     if (pass == rePass) {
		document.getElementById("status-RePassword").innerHTML = "Valid";
        document.getElementById("status-RePassword").style.color = "green";
		validCount[2] = 1;
    }
	else {
		document.getElementById("status-RePassword").innerHTML = "These passwords don't match. Try again?";
        document.getElementById("status-RePassword").style.color = "red";
		validCount[2] = 0;
    };
}


function checkValidEmail(name) {
    var x = document.getElementById("input-" + name).value;
    var atPosition = x.indexOf("@");
    var dotPosition = x.lastIndexOf(".");
    if (atPosition < 1 || dotPosition < atPosition +2 || dotPosition + 2 >= x.length) {
        document.getElementById("status-Email").innerHTML = name + " is invalid";
        document.getElementById("status-Email").style.color = "red";
		validCount[3] = 0;
    } else {
        document.getElementById("status-Email").innerHTML = name + " is valid";
        document.getElementById("status-Email").style.color = "green";
		validCount[3] = 1;
    };
}

function checkSubmit() {
	dateVar = document.getElementById("date").value;
	if ((validCount[0] + validCount[1] + validCount[2] + validCount[3]) == 4 && dateVar != "") {
		alert("Successfully registered");
		var xhttp;
		if (window.XMLHttpRequest) {
			xhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		user = document.getElementById("input-Username").value;
		pass = document.getElementById("input-Password").value;
		email = document.getElementById("input-Email").value;
		date = document.getElementById("date").value;
		xhttp.open("GET", "check_login.php?user=" + user + "&pass=" + pass + "&email=" + email + "&date=" + date + "&mode=" + 'save', true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();
	}
	else {
		alert("Please valid fill");
	}
}