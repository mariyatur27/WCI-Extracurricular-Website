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
    if ("coach" in sport) {
        let coach = document.createElement("h5"); coach.classList.add("coach");
        coach.innerText = coach.innerText = "Coaches: ".concat(" ").concat(sport.coach);
        page.appendChild(coach);
    };
    let time = document.createElement("h5"); time.classList.add("coach");
    if ("meeting_time_title" in sport) {
        time.innerText = sport.meeting_time_title.concat(" ").concat(sport.meeting_time);
    } else {
        time.innerText = "Meeting time: ".concat(sport.meeting_time);
    }
    page.appendChild(time);

    let title2 = document.createElement("h3"); title2.classList.add("title2"); title2.innerText = "Team History";
    page.appendChild(title2);
    let h_title = document.createElement("h4"); h_title.classList.add("t_history"); h_title.innerText = sport.team_history;
    page.appendChild(h_title);
    if ("members" in sport) {
        let team_member_title = document.createElement("h3"); team_member_title.classList.add("title2"); team_member_title.innerText = "Team Members";
        page.append(team_member_title);
        let team_members_div = document.createElement("div"); team_members_div.classList.add("team_members");
        for (const member of sport.members) {
            console.log(member);
            let member_div = document.createElement("div"); member_div.classList.add("team_member");
            let member_name = document.createElement("h6"); member_name.classList.add("t_members"); member_name.innerText = member.name;
            let member_picture = document.createElement("img"); member_picture.classList.add("t_pictures"); member_picture.src = member.image;
            member_div.appendChild(member_picture);
            member_div.appendChild(member_name);
            team_members_div.appendChild(member_div);
            page.appendChild(team_members_div);
        }
    }
}