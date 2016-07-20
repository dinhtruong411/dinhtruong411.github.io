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
	var imgId = document.getElementById("image-" + id);
	var imgIndex = document.getElementById("image-" + index);
	if (Control) {
		imgId.style.left = "1000px";
		Slider(imgIndex, -1000);
		Slider(imgId, -1000);
	}
	else {
		imgId.style.left = "-1000px";
		Slider(imgIndex, 1000);
		Slider(imgId, 1000);
	}
}


function Slider(Object, slideValue) {
	var curImgPos = Object.style.left;
	var len = Object.style.left.length;
	var currentImagePosition = Number(curImgPos.slice(0, len - 2));
	var w;
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("http://gmo-truongpd.freevnn.com/workers/count_worker.js");
        }
        w.onmessage = function(event) {
            var Data = event.data;
			var curPos = currentImagePosition + Math.sign(slideValue)*Data;
			Object.style.left = curPos + "px";
			if (Data == Math.abs(slideValue)) {
				w.terminate();
				w = undefined;
			}
        };
    } else {
        alert("Sorry, your browser does not support Web Workers...");
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