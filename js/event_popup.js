function loadPopupData(){
	if (event_popup == {}){
		return;
		// If there is no upcoming event, don't bother
		// with this function and don't make the div
		// visible, so it never shows up
	}
	var div = document.getElementById("event-popup");
	var txt = document.getElementById("event-popup-text");
	var icon = document.getElementById("event-popup-icon");
	div.style.display = "flex";
	txt.innerHTML = event_popup["text"];
	div.style.backgroundColor = event_popup["color"];
	icon.src = event_popup["icon"];
	console.log(event_popup["icon"]);
	console.log(icon.src);
	if (event_popup["icon"] == ""){
		icon.style.display = "none";
		txt.style.left = "8px";
		// If there is no image to show, move the text over to the left to avoid an awkward gap
	}
};
