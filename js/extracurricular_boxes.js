var activeFilters = new Set();
var searchWord = "";

async function setupBoxes(boxesSource, divID, countPerRow, urlBox=null) {
    if (!dataFetched) {
        await fetchData();
    }

    let boxes = document.getElementById(divID);
    document.getElementById(divID).innerHTML = "";

    let boxCount = 0;

    let totalBoxes = 0;

    let row;
    
    boxesSource.sort((boxData1, boxData2) => {
        if (boxData1.name > boxData2.name) {
            return 1
        } else if (boxData1.name < boxData2.name) {
            return -1
        } else {
            return 0
        }
    })

    boxesSource.forEach((boxData) => {

        if ((urlBox == null || ("id" in boxData && boxData.id.includes(urlBox))) && (activeFilters.size == 0 || boxData.categories.some(category => {return activeFilters.has(category)})) && (boxData.name.toLowerCase().includes(searchWord))) {
            totalBoxes++;
            if (boxCount % countPerRow == 0) {
                row = document.createElement("div"); row.classList.add("club_row");
            }
            let body = document.getElementsByTagName("body")[0];
            // Making a pop-up onclick
                let popup_section = document.createElement("div"); popup_section.classList.add("team_history_section");
                popup_section.id = "history_popup";
                    let s_header = document.createElement("h2"); s_header.classList.add("s_header"); s_header.innerText = "Team History";
                    popup_section.appendChild(s_header);
                    let text = document.createElement("p"); text.classList.add("his_txt"); text.innerText = boxData.team_history;
                    popup_section.appendChild(text);
                    let close_1 = document.createElement("button"); close_1.classList.add("close_bt"); close_1.name = "close"; close_1.type = "button"; close_1.innerText = "X";
                    close_1.addEventListener('click', function() {
                        popup_section.style.display = "none";
                    });
                popup_section.appendChild(close_1);
            body.appendChild(popup_section);

            let body2 = document.getElementsByTagName("body")[0];
            // Making a pop-up onclick
                let popup_section_2 = document.createElement("div"); popup_section_2.classList.add("team_history_section");
                popup_section_2.id = "team_popup";
                    let s_header_2 = document.createElement("h2"); s_header_2.classList.add("s_header"); s_header_2.innerText = "Team Members";
                    popup_section_2.appendChild(s_header_2);
                    // let a_row = document.createElement("div"); a_row.classList.add("a_row");
                    //     let athlete_name = document.createElement("h4"); athlete_name.classList.add("athlete_name"); athlete_name.innerText = boxData.tm1.name;
                    //     a_row.appendChild(athlete_name);
                    // popup_section_2.appendChild(a_row);
                    let close_2 = document.createElement("button"); close_2.classList.add("close_bt"); close_2.name = "close"; close_2.type = "button"; close_2.innerText = "X";
                    close_2.addEventListener('click', function() {
                        popup_section_2.style.display = "none";
                    });
                popup_section_2.appendChild(close_2);
            body2.appendChild(popup_section_2);

            let box = document.createElement("div"); box.classList.add("club_box", "seperate");
                let header = document.createElement("div"); header.classList.add("club_header");
                    let main_image = document.createElement("img"); main_image.classList.add("club_img"); main_image.src = boxData.image;
                    header.appendChild(main_image);
                    let info_div = document.createElement("div"); info_div.classList.add("club_info");
                        let name_header = document.createElement("h2"); name_header.classList.add("lrn"); name_header.innerText = boxData.name;
                        if (boxData.name.length > 15) {
                            name_header.classList.add("lrn_small");
                        }
                        info_div.appendChild(name_header);
                        let drop_div = document.createElement("div"); drop_div.classList.add("together2");
                            let drop_button = document.createElement("button"); drop_button.classList.add("drop"); drop_button.addEventListener("click", () => {box.classList.toggle("active");});
                                let drop_inner_div = document.createElement("div"); drop_inner_div.classList.add("together2");
                                    let learn_more_header = document.createElement("h6"); learn_more_header.innerText = "Learn More";
                                    drop_inner_div.appendChild(learn_more_header);
                                    let down_arrow = document.createElement("i"); down_arrow.classList.add("fas", "fa-chevron-down", "down");
                                    drop_inner_div.appendChild(down_arrow);
                                    let up_arrow = document.createElement("i"); up_arrow.classList.add("fas", "fa-chevron-up", "up");
                                    drop_inner_div.appendChild(up_arrow);
                                drop_button.appendChild(drop_inner_div);
                            drop_div.appendChild(drop_button);
                        info_div.appendChild(drop_div);
                    header.appendChild(info_div);
                box.appendChild(header);
                let expand_box = document.createElement("div"); expand_box.classList.add("expand_box");
                    let expand_box_core_content = document.createElement("div"); expand_box_core_content.classList.add("expand_box_core_content");
                        let summary = document.createElement("p"); summary.innerHTML = boxData.description;
                        expand_box_core_content.appendChild(summary);
                        let meeting_time_text = document.createElement("h6"); 
                        if ("meeting_time_title" in boxData) {
                            meeting_time_text.innerText = boxData.meeting_time_title.concat(" ").concat(boxData.meeting_time);
                        } else {
                            meeting_time_text.innerText = "Meeting time: ".concat(boxData.meeting_time);
                        } meeting_time_text.classList.add("contents");
                        expand_box_core_content.appendChild(meeting_time_text);
                        if ("extra_info" in boxData) {
                            for (info of boxData.extra_info) {
                                if (info.type == "important_text") {
                                    var infotext = document.createElement("h6");
                                } else if (info.type == "normal_text") {
                                    var infotext = document.createElement("p");
                                } else {
                                    throw "Unrecognized extra info text type: ".concat(info.type);
                                }
                                infotext.innerText = info.text;
                                infotext.classList.add("contents");
                                expand_box_core_content.appendChild(infotext);
                            }
                        }
                    expand_box.appendChild(expand_box_core_content);

                    let center = document.createElement("div"); center.classList.add("center_elements");
                    if ("team_history" in boxData) {
                        let team_history = document.createElement("button"); team_history.classList.add("web_link_2"); team_history.type="button"; team_history.name = "team_history";
                        team_history.innerText = "Team History";
                        team_history.id = 'team_history_button';
                        team_history.addEventListener('click', function() {
                            document.getElementById("history_popup").style.display = "block";
                            document.getElementById("team_popup").style.display = "none";

                        });
                        center.appendChild(team_history);
                        expand_box.appendChild(team_history);
                    }
                    if ("team_m_b" in boxData) {
                        let team_m_b = document.createElement("button"); team_m_b.classList.add("web_link_2"); team_m_b.type="button"; team_m_b.name = "team_members";
                        team_m_b.innerText = "Team Members";
                        team_m_b.id = 'team_member_button';
                        team_m_b.addEventListener('click', function() {
                            document.getElementById("team_popup").style.display = "block";
                            document.getElementById("history_popup").style.display = "none";

                        });
                        center.appendChild(team_m_b);
                        expand_box.appendChild(team_m_b);
                    }


                    let box_links = document.createElement("div"); box_links.classList.add("together", "club-links");
                    for (link of boxData.connection_links) {
                        if (link in connection_links) {
                            let link_a = document.createElement("a");
                            if ("link_prefix" in connection_links[link]) {
                                link_a.href = connection_links[link].link_prefix.concat(boxData[link]);
                            } else {
                                link_a.href = boxData[link];
                            }

                            if (connection_links[link].type == "button") {
                                link_a.classList.add("web_link");
                                var link_image = document.createElement("button"); link_image.classList.add("web_link"); link_image.type="button"; link_image.name="club_btn";
                                link_image.innerText = connection_links[link].label;

                                // link_a.classList.add("web_link");
                                // var team_m_b = document.createElement("button"); team_m_b.classList.add("web_link"); team_m_b.type="button"; team_m_b.name = "team_members";
                                // team_m_b.innerText = connection_links[links].label;

                            } else if (connection_links[link].type == "icon") {
                                link_a.classList.add("icons");
                                var link_image = document.createElement("img"); link_image.classList.add("icons");
                                link_image.src = connection_links[link].icon;
                            } else {
                                throw "Unrecognized connection link type: ".concat(connection_links[link].type)
                            }

                            link_a.appendChild(link_image);
                            if ("team_m_b" in boxData) {
                                link_a.appendChild(team_m_b);
                            }
                            box_links.appendChild(link_a);
                        }
                    }
                    expand_box.appendChild(box_links);
    
                box.appendChild(expand_box);
            row.appendChild(box);
            if (boxCount % countPerRow == countPerRow-1) {
                boxes.appendChild(row);
            }
            boxCount += 1;
        }
    });
    if (boxCount % countPerRow > 0) {
        boxes.appendChild(row);
    }
    if (totalBoxes <= 2) {
        for (var box of boxes.getElementsByClassName("club_box")) {
            box.classList.add("active")
        }
    }
}
