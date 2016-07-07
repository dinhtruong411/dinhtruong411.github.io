/*Monster game Javascript*/
	
var	northWest 	= ["-100px", "-94px", "206px", "125px"];
var	north 		= ["206px", "-94px", "206px", "125px"];
var	northEast 	= ["510px", "-94px", "206px", "125px"];
var	east 		= ['510px', '125px', '206px', '125px'];
var	southEast 	= ['510px', '350px', '206px', '125px'];
var	south 		= ['206px', '350px', '206px', '125px'];
var	southWest 	= ['-100px', '350px', '206px', '125px'];
var	west 		= ['-100px', '125px', '206px', '125px'];
var direction	= [northWest, north, northEast, east, southEast, south, southWest, west];
	
function btmEffect(x, status) {
	if (status == "onpress") {
		x.src = "images/press-btm.png";
	}
	else {
		x.src = "images/unpress-btm.png";
	}
}

function play() {
	monsterAppears();
}

function monsterMove(monsterId, directionId) {
	document.getElementById("monster-" + monsterId).style.left = direction[directionId][0];
	document.getElementById("monster-" + monsterId).style.top = direction[directionId][1];
	$('#monster-' + monsterId).show();
	$('#monster-' + monsterId).animate({left: direction[directionId][2], top: direction[directionId][3]}, 2000);
	$('#monster-' + monsterId).animate({left: direction[directionId][0], top: direction[directionId][1]}, 2000, function() {
		monsterAppears();
	});
}

function monsterAppears() {
	var randomMonster = Math.floor((Math.random() * 4) + 1);
	var randomDirection = Math.floor(Math.random() * 8);
	monsterMove(randomMonster, randomDirection);
}

function destroyMonster(x) {
	monsterPositionX = x.style.left;
	monsterPositionY = x.style.top;
	x.style.display = 'none';
	document.getElementById("blood").style.left = monsterPositionX;
	document.getElementById("blood").style.top = monsterPositionY;
	$('#blood').fadeOut('slow', function() {
		$('#blood').css({"left": "510px", "display": "block"});
	});
}

function pause() {
	$('#monster-1').stop(true);
	$('#monster-2').stop(true);
	$('#monster-3').stop(true);
	$('#monster-4').stop(true);
}