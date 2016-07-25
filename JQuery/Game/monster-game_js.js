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
var isStop = false;
var monsters = [];
var isPause = false;
var isBoom = true;


/*Button effect*/
function btmEffect(x, status) {
	if (status == "onpress") {
		x.src = "images/press-btm.png";
	}
	else {
		x.src = "images/unpress-btm.png";
	}
}

function startGame() {
	if (typeof(Storage) !== "undefined") {
		if (!localStorage.highScoreJQ){
			localStorage.highScoreJQ = 0;
		}
	}
	else {
		alert("Sorry! No Web Storage support..")
	}
	$("#highScore").html(localStorage.highScoreJQ);
	
	$("#game-area").mousedown(function() {
		if (!isPause && !isStop) {
			var numberOfChild = $("#game-area").children(".blood").length;
			if (numberOfChild < 1) {
				life--;
				updateLife();
				score--;
				$("#score").html(score);
				if (life <= 0) {
					isStop = true;
					$("#0").stop(true, false);
					$("#1").stop(true, false);
					gameEnd();
				}
			}
		}
	});
	$("#game-area").on("tap", function(){
		if (!isPause && !isStop) {
			var numberOfChild = $("#game-area").children(".blood").length;
			if (numberOfChild < 1) {
				life--;
				updateLife();
				score--;
				$("#score").html(score);
				if (life <= 0) {
					isStop = true;
					$("#0").stop(true, false);
					$("#1").stop(true, false);
					gameEnd();
				}
			}
		}
	});
	play();
}



function play() {
	score = 0;
	$("#score").html(score);
	life = 5;
	updateLife();
	speedValue = 2000;
	isStop = false;
	isPause = false;
	isBoom = true;
	monsters = [];
	$("#game-area").empty();
	isStop = false;
	monsters[0] = new monster(0);
	monsters[0].moving();
	monsters[1] = new monster(1);
	monsters[1].moving();
}
function pause() {
	if (!isPause || isStop) {
		monsters[0].element.stop(true, false);
		monsters[1].element.stop(true, false);
		isPause = true;
	}
	else {
		isPause = false;
		for (i = 0; i < 2; i++) {
			monsters[i].moving();
		}
	}
}

function boom() {
	if (isBoom && !isPause && !isStop) {
		$("#game-area").empty();
		score += 2;
		$("#score").html(score);
		monsters[0] = new monster(0);
		monsters[0].moving();
		monsters[1] = new monster(1);
		monsters[1].moving();
		isBoom = false;
	}
}

function addText(content,textId, leftPos, topPos, size, color) {
	text = $("<b></b>").html(content);
	$("#game-area").append(text);
	text.css({'position': 'absolute', 'left': leftPos, 'top': topPos, 'font-size': size, 'color': color});
	text.attr("id", textId);
}


function gameEnd() {
	if (score >= localStorage.highScoreJQ) {
		localStorage.highScoreJQ = score;
		$("#highScore").html(localStorage.highScoreJQ);
		addText('CONGRATULATION !!', 'text1', '60px', '120px', '40px', 'red');
		addText('High Score: ' + score, 'text2', '155px', '220px', '30px', 'red');
	}
	else {
		addText('END !!', 'text1', '200px', '120px', '40px', 'red');
		addText('Your Score: ' + score, 'text2', '180px', '220px', '30px', 'red');
	}
}

/*Set speed by score*/
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
	else if (score >= 20 && score < 30) {
		speedValue = 700;
	}
	else if (score >= 30) {
		speedValue = 620;
	}
}

/*Monster Object*/
//Moving random direction and with speed by level
function monster(i) {
	this.increValue = score*100;
	this.id = Math.floor((Math.random() * 4) + 1);
	this.directID = Math.floor(Math.random() * 8);
	this.speed = speedValue;
	this.element = $("<div></div>");
	this.element.attr("id", i);
	this.element.addClass("monster");
	this.element.css({"background-image" : "url(images/" + this.id + ".png)", "width": '100px', "height": '94px'});
	var monsterElement = this.element;
	var state = true;
	this.animateState = false;
	$("#game-area").append(this.element);
	this.element.css({position: "absolute", left: direction[this.directID][0], top: direction[this.directID][1]});
	//Set posotion and start animate
	this.moving = function() {
	this.element.animate({left: direction[this.directID][2], top: direction[this.directID][3]}, this.speed);
	this.element.animate({left: direction[this.directID][0], top: direction[this.directID][1]}, this.speed, function() {
		this.remove();
		if (state && !isStop && !isPause) {
			monsters[i] = new monster(i);
			monsters[i].moving();
			score--;
			$("#score").html(score);
			checkLevel();
			life--;
			updateLife();
			if (life <= 0) {
				isStop = true;
				$("#1").stop(true, false);
				$("#0").stop(true, false);
				gameEnd();
			}
		}
	});
	}
	//handle click event
	this.element.mousedown(function() {
		if (!isStop && !isPause) {
			new blood(monsterElement.css("left"), monsterElement.css("top"));
			monsterElement.stop();
			this.remove();
			state = false;
			monsters[i] = new monster(i);
			monsters[i].moving();
			score++;
			$("#score").html(score);
			$("#score").html(score);
			checkLevel();
		}
	});
	this.element.on("tap", function(){
		if (!isStop && !isPause) {
			new blood(monsterElement.css("left"), monsterElement.css("top"));
			monsterElement.stop();
			this.remove();
			state = false;
			monsters[i] = new monster(i);
			monsters[i].moving();
			score++;
			$("#score").html(score);
			$("#score").html(score);
			checkLevel();
		}
	});
}

//Blood appear, fade out and then remove.
function blood(x, y) {
	this.x = x;
	this.y = y;
	this.element = $("<div></div>");
	this.element.css({"background-image" : "url(images/blood.png)", "width": '100px', "height": '94px'});
	this.element.addClass("blood");
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