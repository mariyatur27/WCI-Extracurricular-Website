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
                        if ("student_leaders" in boxData) {
                            let together = document.createElement("div"); together.classList.add("glue");
                                let title = document.createElement("h6"); title.innerText="Student Leaders: ";
                                together.appendChild(title);
                                let student_leaders = document.createElement("h6"); student_leaders.classList.add("contents"); student_leaders.innerText = boxData.student_leaders; 
                                together.appendChild(student_leaders);
                            expand_box_core_content.appendChild(together);
                        }
                        let meeting_time_text = document.createElement("h6"); 
                        if ("meeting_time_title" in boxData) {
                            meeting_time_text.innerText = boxData.meeting_time_title.concat(" ").concat(boxData.meeting_time);
                        }else {
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

                    let box_links = document.createElement("div"); box_links.classList.add("together", "club-links");
                    for (link of boxData.connection_links) {
                        if (link in connection_links) {
                            let connection_link = connection_links[link];
                            let link_a = document.createElement("a");
                            let link_href = boxData[link];
                            if (link_href == undefined) {
                                link_href = "";
                            }
                            if ("link_prefix" in connection_link) link_href = connection_link.link_prefix.concat(link_href);
                            if ("postfix_id" in connection_link) if (connection_link.postfix_id) link_href = link_href.concat(boxData.id);
                            
                            link_a.href = link_href;
                            
                            if (connection_link.type == "button") {
                                link_a.classList.add("web_link");
                                var link_image = document.createElement("button"); link_image.classList.add("web_link"); link_image.type="button"; link_image.name="club_btn";
                                link_image.innerText = connection_link.label;
                            } else if (connection_link.type == "icon") {
                                link_a.classList.add("icons");
                                var link_image = document.createElement("img"); link_image.classList.add("icons");
                                link_image.src = connection_link.icon;
                            } else {
                                throw "Unrecognized connection link type: ".concat(connection_link.type)
                            }
                            
                            link_a.appendChild(link_image);
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
