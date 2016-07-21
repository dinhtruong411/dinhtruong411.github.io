/*Monster game Javascript*/


var	northWest 	= ["-100px", "-94px", "140px", "85px"];
var	north 		= ["206px", "-94px", "206px", "85px"];
var	northEast 	= ["510px", "-94px", "270px", "85px"];
var	east 		= ['510px', '125px', '270px', '125px'];
var	southEast 	= ['510px', '350px', '270px', '165px'];
var	south 		= ['206px', '350px', '206px', '165px'];
var	southWest 	= ['-100px', '350px', '145px', '165px'];
var	west 		= ['-100px', '125px', '145px', '125px'];
var direction	= [northWest, north, northEast, east, southEast, south, southWest, west];
var score = 0;
var life = 5;
var speedValue = 2000;
var stopVar = false;
var monsters = [];


function btmEffect(x, status) {
	if (status == "onpress") {
		x.src = "images/press-btm.png";
	}
	else {
		x.src = "images/unpress-btm.png";
	}
}

function startGame() {
	monsters[0] = new monster(0);
	monsters[1] = new monster(1);
}



function play() {
	score = 0;
	$("#score-area").html(score);
	life = 5;
	updateLife();
	speedValue = 2000;
	stopVar = false;
	monsters = [];
	$("#0").remove();
	$("#1").remove();
	stopVar = false;
	startGame();
}
function pause() {
	
}


function checkLevel() {
	if (score < 10) {
		speedValue = 1500;
	}
	if (score >= 10 && score < 15) {
		speedValue = 1500;
	}
	else if (score >= 15 && score < 20) {
		speedValue = 1000;
	}
	else if (score >= 20) {
		speedValue = 700;
	}
}



function monster(i) {
	this.increValue = score*100;
	this.id = Math.floor((Math.random() * 4) + 1);
	this.directID = Math.floor(Math.random() * 8);
	this.speed = speedValue;
	this.element = $("<div></div>");
	this.element.attr("id", i);
	this.element.css({"background-image" : "url(images/" + this.id + ".png)", "width": '100px', "height": '94px'});
	var monsterElement = this.element;
	var  state = true;
	$("#game-area").append(this.element);
	
	//Set posotion and start animate
	this.element.css({position: "absolute", left: direction[this.directID][0], top: direction[this.directID][1]});
	this.element.animate({left: direction[this.directID][2], top: direction[this.directID][3]}, this.speed);
	this.element.animate({left: direction[this.directID][0], top: direction[this.directID][1]}, this.speed, function() {
		this.remove();
		if (state) {
			monsters[i] = new monster(i);
			score--;
			$("#score-area").html(score);
			checkLevel();
			life--;
			updateLife();
			if (life <= 0) {
				stopVar = true;
				$("#" + 1).stop(true, false);
				$("#" + 0).stop(true, false);
			}
		}
	});
	
	this.element.mousedown(function() {
		if (!stopVar) {
			new blood(monsterElement.css("left"), monsterElement.css("top"));
			monsterElement.stop();
			this.remove();
			state = false;
			monsters[i] = new monster(i);
			score++;
			$("#score-area").html(score);
			checkLevel();
			if (life <= 0) {
				stopVar = true;
				$("#" + tt).stop(false, false);
				$("#" + i).clearQueue().finish(false, false);
			}
		}
	});
}

function blood(x, y) {
	this.x = x;
	this.y = y;
	this.element = $("<div></div>");
	this.element.css({"background-image" : "url(images/blood.png)", "width": '100px', "height": '94px'});
	$("#game-area").append(this.element);
	this.element.css({position: "absolute", left: this.x, top: this.y});
	this.element.fadeOut(100, function() {
		this.remove();
	});
}


function updateLife() {
	lifePos = 240 - life*40;
	$("#life-area").css("background-position", "0px " + lifePos + "px");
}