/*Monster game Javascript*/
var spX = (Math.random() * 2) + 1;
var spY = (Math.random() * 2) + 1;
var	northWest 	= [-90, -75, 1.5, 1, 255, 175];
var	north 		= [205, -75, 0, 1, 255, 175];
var	northEast 	= [510, -75, -1.5, 1, 255, 175];
var	east 		= [510, 130, -1, 0, 255, 175];
var	southEast 	= [510, 350, -1.5, -1, 255, 175];
var	south 		= [205, 350, 0, -1, 255, 175];
var	southWest 	= [-90, 350, 1.5, -1, 255, 175];
var	west 		= [-90, 130, 1.5, 0, 255, 175];
var center		= [200, 170, spX, spY, 0, 0];
var direction	= [northWest, north, northEast, east, southEast, south, southWest, west, center];
var score = 0;
var life = 5;
var monsters = [];

var myGameArea = {
	start : function() {
		container = document.getElementById("container");
		canvas = document.getElementById("game-area");
		context = canvas.getContext("2d");
		canvas.height = 350;
		canvas.width = 510;
		window.addEventListener('click', function(e) {
			myGameArea.xClick = e.pageX - canvas.offsetLeft - container.offsetLeft;
			myGameArea.yClick = e.pageY - canvas.offsetTop - container.offsetTop;
		})
		window.addEventListener('mousedown', function(e) {
			myGameArea.x = e.pageX - canvas.offsetLeft - container.offsetLeft;
			myGameArea.y = e.pageY - canvas.offsetTop - container.offsetTop;
		})
		window.addEventListener('mouseup', function(e) {
			myGameArea.x = false;
			myGameArea.y = false;
		})
		window.addEventListener('touchstart', function(e) {
			myGameArea.x = e.pageX - canvas.offsetLeft;
			myGameArea.y = e.pageY - canvas.offsetTop;
		})
		window.addEventListener('touchend', function(e) {
			myGameArea.x = false;
			myGameArea.y = false;
		})
	},
	clear : function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
}


function startScreen() {
	myGameArea.start();
	context.drawImage(document.getElementById("play-screen"), 0, 0, canvas.width, canvas.height);
	reqAnimation = window.requestAnimationFrame || 
	window.mozRequestAnomationFrame || 
	window.webkitRequestAnimationFrame || 
	window.msRequestAnimationFrame || 
	window.oRequestAnimationFrame;
	if (reqAnimation) {
		checkStartButton();
	}
	else {
		alert("Your browser doesn't support requestAnimationFrame.");
	}
	
}


function checkStartButton() {
	if (myGameArea.x && myGameArea.y) {
		if (myGameArea.x < 0 || myGameArea.x > canvas.width || myGameArea.y < 0 || myGameArea.y > canvas.height) {
			reqAnimation(checkStartButton);
		}
		else {
			startGame();
		}
	}
	else {
		reqAnimation(checkStartButton);
	}
}

function startGame() {
	myGameArea.clear();
	monsters[0] = new monster();
	monsters[1] = new monster();
	reqAnimation(updateGame);
}


function monster(){
	var id = Math.floor((Math.random() * 4) + 1);
	var directID = Math.floor(Math.random() * 10);
	if (directID > 8) {
		directID =8;
	}
	var mon = document.getElementById("monster-" + id);
	this.x = direction[directID][0];
	this.y = direction[directID][1];
	this.width = 90;
	this.height = 75;
	this.speedX = direction[directID][2];
	this.speedY = direction[directID][3];
	this.limitX = direction[directID][4];
	this.limitY = direction[directID][5];
	this.checkLimit = function() {
			var myTop = this.y;
			var myBottom = this.y + this.height;
			var limitY = this.limitY;
			var myLeft = this.x;
			var myRight = this.x + this.width;
			var limitX = this.limitX;
			if (directID == 8) {
				if (myLeft < 0 || myRight > canvas.width) {
					this.speedX = -this.speedX;
				}
				if (myTop < 0 || myBottom > canvas.height) {
					this.speedY = -this.speedY;
				}
			}
			else {
				if (Math.abs(limitY - myBottom) < 10 || Math.abs(myTop - limitY) < 10 || Math.abs(myLeft - limitX) < 10 || Math.abs(limitX - myRight) < 10 ) {
					this.speedX = -this.speedX;
					this.speedY = -this.speedY;
				}
			}
	}
	this.clickDown = function() {
		var myTop = this.y;
		var myBottom = this.y + this.height;
		var myLeft = this.x;
		var myRight = this.x + this.width;
		var clickDown = true;
		if (myTop > myGameArea.y || myBottom < myGameArea.y || myLeft > myGameArea.x || myRight < myGameArea.x) {
			clickDown = false;
		}
		return clickDown;
	}
	this.clicked = function() {
		var myTop = this.y;
		var myBottom = this.y + this.height;
		var myLeft = this.x;
		var myRight = this.x + this.width;
		var clicked = false;
		if (myTop > myGameArea.yClick || myBottom < myGameArea.yClick || myLeft > myGameArea.xClick || myRight < myGameArea.xClick) {
			clicked = true;
		}
		return clicked;
	}
	this.newPosition = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.update = function() {
		context.drawImage(mon, this.x, this.y, this.width, this.height);
	}
	this.outOfAreaEvent = function() {
		var myTop = this.y;
		var myBottom = this.y + this.height;
		var myLeft = this.x;
		var myRight = this.x + this.width;
		if (myTop > (canvas.height + 5) || myBottom < -5 || myLeft > (canvas.width + 5) || myRight < -5) {
			return true;
		}
		else {
			return false;
		}
	}
}


function blood(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	bloodImg = document.getElementById("blood");
	context.drawImage(bloodImg, this.x, this.y, this.width, this.height);
}

function updateGame() {
	myGameArea.clear();
	for (i = 0; i < 2; i++) {
		monsters[i].checkLimit();
		monsters[i].newPosition();
		monsters[i].update();
		if (myGameArea.x && myGameArea.y) {
			if (monsters[i].clickDown()) {
				score += 1;
				document.getElementById("score-area").innerHTML = score;
				Bloob = new blood(monsters[i].x, monsters[i].y, monsters[i].width, monsters[i].height);
				monsters[i] = new monster();
			}
		}
		if (monsters[i].outOfAreaEvent()) {
			score -= 1;
			document.getElementById("score-area").innerHTML = score;
			monsters[i] = new monster();
		}
	}
	reqAnimation(updateGame);
}

function btmEffect(x, status) {
	if (status == "onpress") {
		x.src = "images/press-btm.png";
	}
	else {
		x.src = "images/unpress-btm.png";
	}
}

function updateLife() {
	lifePos = 240 - life*40;
	document.getElementById("life-area").style.backgroundPosition = "0px " + lifePos + "px";
}