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
    // Building the main page
    let title = document.createElement("h2"); title.classList.add("a_title"); title.innerText = sport.name;
    page.appendChild(title);
    let title1 = document.createElement("h3"); title1.classList.add("title2"); title1.innerText = "Team Details";
    page.appendChild(title1);
    if (sport.coach != undefined) {
        let coach = document.createElement("h5"); coach.classList.add("coach");
        coach.innerText = coach.innerText = "Coach: ".concat(" ").concat(sport.coach);
        page.appendChild(coach);
    };
    if (sport.meeting_time != undefined) {
        let time = document.createElement("h5"); time.classList.add("coach");
        time.innerText = time.innerText = "Practices: ".concat(" ").concat(sport.meeting_time);
        page.appendChild(time);
    };

    let title2 = document.createElement("h3"); title2.classList.add("title2"); title2.innerText = "Team History";
    page.appendChild(title2);
    let h_title = document.createElement("h4"); h_title.classList.add("t_history"); h_title.innerText = sport.team_history;
    page.appendChild(h_title);
    let title3 = document.createElement("h3"); title3.classList.add("title2"); title3.innerText = "Team Members";
    page.appendChild(title3);
    let a_row = document.createElement("div"); a_row.classList.add("a_row");
        let members_1 = sport.members_g1;
        let t_members = " ";
        let t_pictures = " ";
            for (const [key, value] of Object.entries(members_1)) {
                t_members = document.createElement("h6"); t_members.classList.add("t_members"); t_members.innerText = key;
                a_row.appendChild(t_members);
                t_pictures = document.createElement("img"); t_pictures.classList.add("t_pictures"); t_pictures.src = value;
                a_row.appendChild(t_pictures);
            };
    page.appendChild(a_row);
    if (sport.members_g2 != undefined) {
        let a_row_2 = document.createElement("div"); a_row_2.classList.add("a_row");
        let a_group = document.createElement("div"); a_group.classList.add("a_group");
        let members_2 = sport.members_g2;
        let t_members_2 = " ";
        let t_pictures_2 = " ";
            for (const [key, value] of Object.entries(members_2)) {
                t_members_2 = document.createElement("h6"); t_members_2.classList.add("t_members"); t_members_2.innerText = key;
                a_group.appendChild(t_members_2);
                a_row_2.appendChild(t_members_2);
                t_pictures_2 = document.createElement("img"); t_pictures_2.classList.add("t_pictures"); t_pictures_2.src = value;
                a_group.appendChild(t_pictures_2);
                a_row_2.appendChild(t_pictures_2);
            };
            a_row_2.appendChild(a_group)
        page.appendChild(a_row_2);
    };
}
