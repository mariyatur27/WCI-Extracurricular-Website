async function setupSportPage(sportID) {
    // Get data
    if (!dataFetched) {
        await fetchData();
    }
    // Get the area that can be modified
    let page = document.getElementById("main_content");
    // Clear the area
    page.innerHTML = "";
    // We've not found a sport matching sportID yet
    let found = false;
    // Go through athletics, looking for a sport that matches sportID
    for (var sport of athletics) {
        if (sport.id == sportID) {
            // If we find one, break out of the loop
            // sport will remain the last sport checked, which is the one that we want to use
            found = true;
            break;
        }
    }
    // If we can't find a sport that matches, create a fake 404 page
    if (!found) {
        errorHeader = document.createElement("h1");
        errorHeader.innerText = "404 Not Found";
        errorText = document.createElement("p");
        errorText.innerText = "Sorry, the page that you were looking for could not be found.";
        page.appendChild(errorHeader);
        page.appendChild(errorText);
        return;
    }
    console.log(sport);
    // TODO: Make a page about the sport here
}