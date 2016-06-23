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