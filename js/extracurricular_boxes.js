async function setupBoxes(boxesSource, divID, countPerRow, filter=null, search=null) {
    if (!dataFetched) {
        await fetchData();
    }

    let boxes = document.getElementById(divID);
    document.getElementById(divID).innerHTML = "";

    let boxCount = 0;

    let row;
    
    boxesSource.forEach((boxData) => {
        if ((filter == null || boxData.categories.includes(filter)) && (search == null || boxData.name.toLowerCase().includes(search))) {
            if (boxCount % countPerRow == 0) {
                row = document.createElement("div"); row.classList.add("club_row");
            }
            let box = document.createElement("div"); box.classList.add("club_box", "seperate");
                let header = document.createElement("div"); header.classList.add("club_header");
                    let main_image = document.createElement("img"); main_image.classList.add("club_img"); main_image.src = boxData.image;
                    header.appendChild(main_image);
                    let info_div = document.createElement("div"); info_div.classList.add("club_info");
                        let name_header = document.createElement("h2"); name_header.classList.add("lrn"); name_header.innerText = boxData.name;
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
                    let summary_title = document.createElement("h4"); summary_title.innerText = "Summary: ";
                    expand_box.appendChild(summary_title);
                    let summary = document.createElement("p"); summary.innerHTML = boxData.description;
                    expand_box.appendChild(summary);
                    let meeting_time_text = document.createElement("h5"); meeting_time_text.innerText = "Meeting time: ".concat(boxData.meeting_time);
                    expand_box.appendChild(meeting_time_text);
                    let box_links = document.createElement("div"); box_links.classList.add("together");
                        for (link of boxData.connection_links) {
                            if (link in connection_links) {
                                let link_a = document.createElement("a"); link_a.classList.add("icons"); link_a.href = boxData[link];
                                let link_image = document.createElement("img"); link_image.classList.add("icons"); link_image.src = connection_links[link].icon;
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
}