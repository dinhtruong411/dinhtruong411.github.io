/*Photo Slider Js*/
var index = 1;
var rightIndex, leftIndex;

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
	var currentImagePosition = document.getElementById("image-" + index).style.left;
	if (Control) {
		nextImagePosition = document.getElementById("image-" + id).style.left = "1000px";
		$("#image-" + index).animate({left: '-=1000'},"slow");
		$("#image-" + id).animate({left: '-=1000'},"slow");
	}
	else {
		nextImagePosition = document.getElementById("image-" + id).style.left = "-1000px";
		$("#image-" + index).animate({left: '+=1000'},"slow");
		$("#image-" + id).animate({left: '+=1000'},"slow");
	}
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