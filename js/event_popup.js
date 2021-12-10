	function loadPopupData(){
		if (event_popup == {}){
			return;
		}
		else {
		fetch("data/event_popup.json")
		.then(response => {
			return response.json();
		})
		.then(data => console.log(data));
		var div = document.getElementById("event-popup");
		var txt = document.getElementById("event-popup-text");
		var icon = document.getElementById("event-popup-icon");
		div.style.display = "flex";
		txt.innerHTML = event_popup.text;
		div.style.backgroundColor = event_popup.color;
		icon.src = event_popup.icon;

		console.log(event_popup["icon"]);
		console.log("sjfaifaiudhfaiuf")
		console.log(icon.src);
		if (event_popup["icon"] == ""){
			icon.style.display = "none";
			txt.style.left = "8px";
			// If there is no image to show, move the text over to the left to avoid an awkward gap
		}
	  }
	};

	function closePopup(){
		var div = document.getElementById("event-popup");
		div.style.display = "none";
	}