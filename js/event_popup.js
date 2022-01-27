// async function createPopup() {
//     if (!dataFetched) {
//         await fetchData();
//     }
// 	let found = false;
// 	for (var event of events) {
// 		if (new Date(event.start_time*1000) > new Date()) {
// 			found = true;
// 			break;
// 		}
// 	}
// 	if (!found) {
// 		return;
// 	}
//     var div = document.getElementById("event-popup");
// 	var txt = document.getElementById("event-popup-text");
// 	var icon = document.getElementById("event-popup-icon");
// 	var dscr = document.getElementById("event-description");
// 	div.style.display = "flex";
// 	txt.innerHTML = event.title;
// 	dscr.innerHTML = event.description;
// 	div.style.backgroundColor = "#00F";
// 	icon.src = "";
// 	icon.style.display = "none";
// 	txt.style.left = "8px";

// 	// Things to add in the future: A button that downloads the ics file about the eventS
// }
// createPopup();

// function closePopup(){
// 	var div = document.getElementById("event-popup");
// 	div.style.display = "none";
// } 