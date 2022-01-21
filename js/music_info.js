async function BuildPage(musicID) {
    if(!dataFetched) {
        await fetchData();
    }

let page = document.getElementById("main_content_music");

page.innerHTML = " ";

let found = false;
for (var info of music) {
    if (info.music_id == musicID) {
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
    console.log(info);
// Starting to build the page
    let music_name = document.createElement("h2"); music_name.classList.add("a_title"); music_name.innerText = info.name;
    page.appendChild(music_name);
    let dscr = document.createElement("p"); dscr.classList.add("t_history"); dscr.innerText = info.description;
    page.appendChild(dscr);
    if ("experience" in info) {
        let experience = document.createElement("h5"); experience.classList.add("more_info"); experience.innerText = "Required Experience: ".concat(info.experience);
        page.appendChild(experience);
    }
    if ("status" in info) {
        let status = document.createElement("h5"); status.classList.add("more_info"); status.innerText = "Current Status: ".concat(info.status);
        page.appendChild(status);
    }
    if ("teacher" in info) {
        let teacher = document.createElement("h5"); teacher.classList.add("more_info"); teacher.innerText = "Teacher(s): ".concat(info.teacher);
        page.appendChild(teacher);
    }
    if ("video" in info) {
        let title = document.createElement("h3"); title.innerText = "Listen To Some Of The Recordings: "; title.classList.add("v_title");
        page.appendChild(title);
        let iframe_div = document.createElement("div"); iframe_div.classList.add("iframe_div"); iframe_div.id = info.v_id;
        for (const video of info.video) {
            let iframe = document.createElement("div"); iframe.classList.add("iframe_video");
            iframe.innerHTML = video.source;
            iframe_div.appendChild(iframe)
        }
        page.appendChild(iframe_div);
    }
}