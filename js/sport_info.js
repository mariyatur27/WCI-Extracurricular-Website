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
    let sport_name = document.createElement("h2"); sport_name.classList.add("a_title"); sport_name.innerText = sport.name;
    page.appendChild(sport_name);
    let team_details_title = document.createElement("h3"); team_details_title.classList.add("sport_info_title"); team_details_title.innerText = "Team Details";
    // The history section id will be here because when the button is clicked it lands right on the history section.
    team_details_title.id = sport.history_section_id;
    page.appendChild(team_details_title);
    if ("coach" in sport) {
        let coach = document.createElement("h5"); coach.classList.add("team_details_text");
        coach.innerText = coach.innerText = "Coaches:".concat(" ").concat(sport.coach);
        page.appendChild(coach);
    };
    let meeting_time = document.createElement("h5"); meeting_time.classList.add("team_details_text");
    if ("meeting_time_title" in sport) {
        meeting_time.innerText = sport.meeting_time_title.concat(" ").concat(sport.meeting_time);
    } else {
        meeting_time.innerText = "Practices: ".concat(sport.meeting_time);
    }
    page.appendChild(meeting_time);

    if ("team_history" in sport) {
        let team_history_title = document.createElement("h3"); team_history_title.classList.add("sport_info_title"); team_history_title.innerText = "Team History";
        page.appendChild(team_history_title);

        let team_history_text = document.createElement("h4"); team_history_text.classList.add("t_history"); team_history_text.innerText = sport.team_history;
        page.appendChild(team_history_text);
    }
    if ("members" in sport) {
        let team_member_title = document.createElement("h3"); team_member_title.classList.add("sport_info_title"); team_member_title.innerText = "Team Members";
        page.append(team_member_title);
        team_member_title.id = sport.team_section_id;
        let team_members_div = document.createElement("div"); team_members_div.classList.add("team_members");
        for (const member of sport.members) {
            console.log(member);
            let member_div = document.createElement("div"); member_div.classList.add("team_member");
            let member_name = document.createElement("h6"); member_name.classList.add("t_members");
            if ("name" in member) {
                member_name.innerText = member.name;
            }
            let member_picture = document.createElement("img"); member_picture.classList.add("t_pictures"); member_picture.src = member.image;
            member_div.appendChild(member_picture);
            member_div.appendChild(member_name);
            team_members_div.appendChild(member_div);
            page.appendChild(team_members_div);
        }
    }
}