async function BuildPage(musicID) {
    if(!dataFetched) {
        await fetchData();
    }
}

let page = document.getElementById("main_content_music");

page.innerHTML = " ";

let found = false;
for (var music of music) {
    if (music.id == musicID) {
        found = true;
        break;
    }
}
if (!found) {
    errorHeader = document.createElement("h1");
    errorHeader.innerText = "404 Not Found";
    errorText = document.createElement("p");
    errorText.innerText = "Sorry, the page that you were looking for could not be found.";
    page.appendChild(errorHeader);
    page.appendChild(errorText);
    return;
}

