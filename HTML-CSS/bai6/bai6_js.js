/*Bai 6 Javascript*/
function toggleContent(id){
	var DisplayStatus=document.getElementById("little-content-"+id).style.display;
	if(DisplayStatus=="none") {
		document.getElementById("little-content-"+id).style.display="block";
		document.getElementById("arrow-"+id).style.backgroundPosition="0px 0px";
	}
	else{
		document.getElementById("little-content-"+id).style.display="none";
		document.getElementById("arrow-"+id).style.backgroundPosition="0px 8px";
	}
}


function ratingEffect(event,id){
	var x = event.clientX;
	if(x >= 760 & x<765){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px 1px";
	}	
	else if(x>=765 & x<770){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px -16px";
	}
	else if(x>=770 & x<775){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px -33px";
	}
	else if(x>=775 & x<780){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px -50px";
	}
	else if(x>=780 & x<787){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px -66px";
	}
	else if(x>=787 & x<794){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px -81px";
	}
	else if(x>=794 & x<800){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px -96px";
	}
	else if(x>=800 & x<805){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px -111px";
	}
	else if(x>=805 & x<810){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px -126px";
	}
	else if(x>=810 & x<815){
		document.getElementById("rating-"+id).style.backgroundPosition = "0px -141px";
	}
}