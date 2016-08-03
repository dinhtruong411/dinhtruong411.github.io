/*Monster game Javascript*/

//direction parameter
var northWest   = [-90, -75, 1.5, 1, 255, 175],
    north       = [205, -75, 0, 1, 255, 175],
    northEast   = [510, -75, -1.5, 1, 255, 175],
    east        = [510, 130, -1, 0, 255, 175],
    southEast   = [510, 350, -1.5, -1, 255, 175],
    south       = [205, 350, 0, -1, 255, 175],
    southWest   = [-90, 350, 1.5, -1, 255, 175],
    west        = [-90, 130, 1.5, 0, 255, 175],
    center      = [200, 170, 0, 0, 0, 0],
    direction   = [northWest, north, northEast, east, southEast, south, southWest, west, center];

var score       = 0,
    life        = 5,
    monsters    = [],
    isPause     = false,
    isReStart   = false,
    isEnd       = false,
    isBoom      = false,
    validBoom   = true,
    subScoreLifePermit = 0;

var myGameArea = {
    start : function() {
        container = document.getElementById("container");
        canvas = document.getElementById("game-area");
        context = canvas.getContext("2d");
        reqAnimation = window.requestAnimationFrame ||
            window.mozRequestAnomationFrame || 
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame;
        if (typeof(Storage) !== "undefined") {
            if (!localStorage.highScore){
                localStorage.highScore = 0;
            }
        } else {
            alert("Sorry! No Web Storage support..")
        }
        document.getElementById("highScore").innerHTML = localStorage.highScore;
        canvas.height = 350;
        canvas.width = 510;
        window.addEventListener('mousedown', function(e) {
            myGameArea.x = e.pageX - canvas.offsetLeft - container.offsetLeft;
            myGameArea.y = e.pageY - canvas.offsetTop - container.offsetTop;
        },false)
        window.addEventListener('mouseup', function(e) {
            myGameArea.x = false;
            myGameArea.y = false;
        },false)
        window.addEventListener('touchstart', function(e) {
            myGameArea.x = e.pageX - canvas.offsetLeft - container.offsetLeft;
            myGameArea.y = e.pageY - canvas.offsetTop - container.offsetTop;
        },false)
        window.addEventListener('touchend', function(e) {
            myGameArea.x = false;
            myGameArea.y = false;
        },false)
    },
    clear : function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    },

    //Function check mouse position when click
    //If click in game area, return true
    clickInArea : function() {
        var clickInArea = false;
        if (!(myGameArea.x < 0 || myGameArea.x > canvas.width ||
            myGameArea.y < 0 || myGameArea.y > canvas.height))
        {
            clickInArea = true;
        }
        return clickInArea;
    }
}

function startScreen() {
    myGameArea.start();
    checkStartButton();
}


/*
function check event when we click start screen
*/
function checkStartButton() {
    context.drawImage(document.getElementById("play-screen"), 0, 0, canvas.width, canvas.height);
    if (myGameArea.x && myGameArea.y) {
        if (myGameArea.clickInArea()) {
            startGame();
        }
        else {
            reqAnimation(checkStartButton);
        }
    }
    else {
        reqAnimation(checkStartButton);
    }
}

function startGame() {
    score = 0;
    life = 5;
    monsters = [];
    isPause = false;
    isReStart = false;
    isEnd = false;
    isBoom = false;
    validBoom = true;

    document.getElementById("score").innerHTML = score;
    updateLife();
    myGameArea.clear();
    monsters[0] = new monster();
    monsters[1] = new monster();
    reqAnimation(updateGame);
}

function gameEnd() {
    subScoreLifePermit = 0;
    context.drawImage(document.getElementById("play-screen"), 0, 0, canvas.width, canvas.height);
    if (myGameArea.x && myGameArea.y) {
        if (!(myGameArea.x < 0 || myGameArea.x > canvas.width ||
            myGameArea.y < 0 || myGameArea.y > canvas.height))
        {
            startGame();
        }
        else {
            reqAnimation(gameEnd);
            myGameArea.x = false;
        }
    }
    else {
        if (score >= localStorage.highScore) {
            localStorage.highScore = score;
            document.getElementById("highScore").innerHTML = localStorage.highScore;
            context.fillStyle = 'RED';
            context.font = "bold 40px Arial";
            context.fillText('CONGRATULATION !!', 60, 120);
            context.font = "bold 30px Arial";
            context.fillText('High Score: ' + score, 155, 300);
            reqAnimation(gameEnd);
        }
        else {
            context.fillStyle = 'RED';
            context.font = "bold 30px Arial";
            context.fillText('Your Score: ' + score, 155, 300);
            reqAnimation(gameEnd);
        }
    }
}

/*
Function choice random direction and random speed
from lowSpeed to highSpeed for center monster
*/
function randomDirection(lowSpeed, highSpeed) {
    var l = Math.floor(highSpeed - lowSpeed) + 1;
    selectSign = Math.floor(Math.random() * 2);
    switch (selectSign) {
        case 0:
            return (Math.random() * l) + lowSpeed;
            break;
        case 1:
            return -((Math.random() * l) + lowSpeed);
            break;
    }
}

/*
Function inrease monster speed with increValue
*/
function increSpeed (originSpeed, increValue) {
    if (increValue < 0){
        increValue = 0;
    }
    return originSpeed +  Math.sign(originSpeed)*increValue;
}

/*
function create monster object
include some property
*/
function monster(){
    var increValue = score/10;
    this.id = Math.floor((Math.random() * 4) + 1);
    this.directID = Math.floor(Math.random() * 10);
    if (this.directID > 8) {
        this.directID = 8;
    }
    var mon = document.getElementById("monster-" + this.id);
    this.x = direction[this.directID][0];
    this.y = direction[this.directID][1];
    this.width = 90;
    this.height = 75;
    if (this.directID == 8) {
        this.speedX = increSpeed(randomDirection(1, 2), increValue);
        this.speedY = increSpeed(randomDirection(1, 2), increValue);
    }
    else {
        this.speedX = increSpeed(direction[this.directID][2], increValue);
        this.speedY = increSpeed(direction[this.directID][3], increValue);
        this.limitX = direction[this.directID][4];
        this.limitY = direction[this.directID][5];
    }

    this.checkLimit = function() {
        var myTop = this.y;
        var myBottom = this.y + this.height;
        var limitY = this.limitY;
        var myLeft = this.x;
        var myRight = this.x + this.width;
        var limitX = this.limitX;
        if (this.directID == 8) {
            if (myLeft <= 0 || myRight > canvas.width) {
                this.speedX = -this.speedX;
            }
            if (myTop <= 0 || myBottom > canvas.height) {
                this.speedY = -this.speedY;
            }
        }
        else {
            if (Math.abs(limitY - myBottom) < 10 || Math.abs(myTop - limitY) < 10 ||
                Math.abs(myLeft - limitX) < 10 || Math.abs(limitX - myRight) < 10 )
            {
                this.speedX = -this.speedX;
                this.speedY = -this.speedY;
            }
        }
    }

    this.outOfAreaEvent = function() {
        var myTop = this.y;
        var myBottom = this.y + this.height;
        var myLeft = this.x;
        var myRight = this.x + this.width;
        if (myTop > (canvas.height + 5) || myBottom < -5 ||
            myLeft > (canvas.width + 5) || myRight < -5)
        {
            return true;
        }
        else {
            return false;
        }
    }
    this.clickDown = function() {
        var myTop = this.y;
        var myBottom = this.y + this.height;
        var myLeft = this.x;
        var myRight = this.x + this.width;
        var clickDown = true;
        if (myTop > myGameArea.y || myBottom < myGameArea.y ||
            myLeft > myGameArea.x || myRight < myGameArea.x)
        {
            clickDown = false;
        }
        return clickDown;
    }
    this.newPosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.update = function() {
        context.drawImage(mon, this.x, this.y, this.width, this.height);
    }
}

/*
Function draw Blood
*/
function blood(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    bloodImg = document.getElementById("blood");
    context.drawImage(bloodImg, this.x, this.y, this.width, this.height);
}


function pause() {
    isPause = true;
}

function start() {
    isPause  = false;
}
function reStart() {
    isReStart = true;
}

function boom() {
	if (!isPause) {
    	isBoom = true;
	}
}

/*
Game loop
*/
function updateGame() {
    if (isPause) {
        subScoreLifePermit = 0;
        context.drawImage(document.getElementById("play-screen"), 0, 0, canvas.width, canvas.height);
        if (myGameArea.x && myGameArea.y) {
            if (myGameArea.clickInArea()) {
                isPause = false;
            }
        }
        reqAnimation(updateGame);
    }
    else if(isReStart) {
        startGame();
    }
    else if (isEnd){
        gameEnd();
    }
    else if (isBoom && validBoom){
        for (i = 0; i < 2; i++) {
            validBoom = false;
            score++;
            document.getElementById("score").innerHTML = score;
            Bloob = new blood(monsters[i].x, monsters[i].y, monsters[i].width, monsters[i].height);
            monsters[i] = new monster();
        }
        isBoom = false;
        reqAnimation(updateGame);
    }
    else {
        myGameArea.clear();

        for (i = 0; i < 2; i++) {
            monsters[i].checkLimit();
            monsters[i].newPosition();
            monsters[i].update();
            if (monsters[i].outOfAreaEvent()) {
                subScoreLife()
                monsters[i] = new monster();
            }
        }

        //Clicked process
        if (myGameArea.x && myGameArea.y) {
            subScoreLifePermit++;
            if (subScoreLifePermit > 1) {
                if (monsters[0].clickDown()) {
                    monsterDieAndAddScore(0);
                }
                else if (monsters[1].clickDown()) {
                    monsterDieAndAddScore(1);
                }
                else if (myGameArea.clickInArea()) {
                    subScoreLife();
                }
            }
            myGameArea.x = false;
        }
        reqAnimation(updateGame);
    }
}

/*
function describe button effect
*/
function btmEffect(x, status) {
    if (status == "onpress") {
        x.src = "images/press-btm.png";
    }
    else {
        x.src = "images/unpress-btm.png";
    }
}

// Suctract 1 score and life
function subScoreLife() {
    score--;
    document.getElementById("score").innerHTML = score;
    life--;
    updateLife();
    if (life == 0) {
        isEnd = true;
    }
}


// remove monster x and add 1 score
function monsterDieAndAddScore(x) {
    score++;
    document.getElementById("score").innerHTML = score;
    Bloob = new blood(monsters[x].x, monsters[x].y, monsters[x].width, monsters[x].height);
    monsters[x] = new monster();
}
/*
Function control life icon appear by life variable
*/
function updateLife() {
    lifePos = 240 - life*40;
    document.getElementById("life-area").style.backgroundPosition = "0px " + lifePos + "px";
}