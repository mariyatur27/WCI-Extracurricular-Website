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
            // Building the main page
            let title = document.createElement("h2"); title.classList.add("a_title"); title.innerText = sport.name;
            page.appendChild(title);
            let h_title = document.createElement("h4"); h_title.classList.add("t_history"); h_title.innerText = sport.team_history;
            page.appendChild(h_title);
            let a_row = document.createElement("div"); a_row.classList.add("a_row");
                let members_1 = sport.members_g1;
                let t_members = " ";
                let t_pictures = " ";
                let a_block = document.createElement("div"); a_block.classList.add("a_block");
                    for (const [key, value] of Object.entries(members_1)) {
                        t_members = document.createElement("h6"); t_members.classList.add("t_members"); t_members.innerText = key;
                        // a_row.appendChild(t_members);
                        t_pictures = document.createElement("img"); t_pictures.classList.add("t_pictures"); t_pictures.src = value;
                        t_members.appendChild(t_pictures);
                        a_block.appendChild(t_members);
                        // a_row.appendChild(t_pictures);
                        // a_row.appendChild(a_block);
                    };
                a_row.appendChild(a_block);
            page.appendChild(a_row);
            if (sport.members_g2 != undefined) {
                console.log("yes it is ");
                let a_row_2 = document.createElement("div"); a_row_2.classList.add("a_row");
                let members_2 = sport.members_g2;
                let t_members_2 = " ";
                let t_pictures_2 = " ";
                    for (const [key, value] of Object.entries(members_2)) {
                        t_members_2 = document.createElement("h6"); t_members_2.classList.add("t_members"); t_members_2.innerText = key;
                        console.log(key);
                        console.log(value);
                        a_row_2.appendChild(t_members_2);
                        t_pictures_2 = document.createElement("img"); t_pictures_2.classList.add("t_pictures"); t_pictures_2.src = value;
                        a_row_2.appendChild(t_pictures_2);
                    };
                page.appendChild(a_row_2);
            };
            



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