/*Photo Slider Js*/
var index = 1;
var rightIndex, leftIndex;
var interv = [];
var intervId = 0;
reqAnimation = window.requestAnimationFrame || 
   window.mozRequestAnomationFrame || 
   window.webkitRequestAnimationFrame || 
   window.msRequestAnimationFrame || 
   window.oRequestAnimationFrame;

/*--Image slide to right--*/
function slideRightToward() {
	choiceIndex();
	imgSlide(leftIndex, 0);
	index = leftIndex;
	indexEffect(index);
}

/*--Image slide to left--*/
function slideLeftToward() {
	choiceIndex();
	imgSlide(rightIndex, 1);
	index = rightIndex;
	indexEffect(index);
}

/*--Function process image slide to left or right--*/
// if Control value is 1: slide to left
// if Control value is 0: slide to rigth
function imgSlide(id, Control) {
	if (Control) {
		Slider(id, 1000, 0);
		Slider(index, 0, -1000);
	}
	else {
		Slider(id, -1000, 0);
		Slider(index, 0, 1000);
	}
}


/*Function slide photo has ObjId id 
from startPos position to stopPos position*/
function Slider(ObjId, startPos, stopPos) {
	var Obj = document.getElementById("image-" + ObjId);
	Obj.style.left = startPos + "px";
	var val = stopPos - startPos;
	intervId++;
	
	//Limit 20 setInterval
	if (intervId == 20) {
		intervId = 0;
	}
	var itvId = intervId;
	var i = 0;
	interv[itvId] = setInterval(function(){ 
		i+=40;
		realPos = startPos + Math.sign(val)*i;
		Obj.style.left = realPos + "px";
		if (i >= Math.abs(val)) {
			clearInterval(interv[itvId]);
		}
    },1000/80);
}





/*--Function set index-icon position--*/
function indexEffect(id) {
	var indexPosition = 4 + ((id - 1) * 32);
	document.getElementById("index-icon").style.left = indexPosition + "px";
}

/*--Active when quick index has been chosen--*/
// slide to image have this index
function customSlide(id) {
	if (id > index) {
	imgSlide(id, 1);
	}
	else {
	imgSlide(id, 0);
	}
	index = id;
	indexEffect(index);
}

/*Check index and choice left or right index when out of range*/
function choiceIndex() {
	if (index == 1)
	{
		leftIndex = 7;
		rightIndex = 2;
	}
	else if (index == 7)
	{
		leftIndex = 6;
		rightIndex = 1;
	}
	else
	{
		leftIndex = index - 1;
		rightIndex = index + 1;
	}
}

/*Show left or rigth button when move mouse over it*/
function showIcon(id) {
	document.getElementById(id + "-icon").style.opacity = 1;
}

/*Make opacity left or rigth button when move mouse over it*/
function hideIcon(id) {
	document.getElementById(id + "-icon").style.opacity = 0.3;
}