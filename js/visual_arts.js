async function buildGallery(galleryID) {
    if (!dataFetched) {
        await fetchData();
    }

    let section = document.getElementById("the_gallery");
    
    for (const art of gallery) {
            console.log(art);
            let box = document.createElement("div"); box.classList.add("box");
                let imgDiv = document.createElement("div");
                if ("class" in art){
                    imgDiv.classList.add("img-box"); imgDiv.classList.add(art.class);
                }else{
                    imgDiv.classList.add("img-box");  
                }
                    let image = document.createElement("img"); image.src = art.image;
                    imgDiv.appendChild(image);
                box.appendChild(imgDiv);
                let info = document.createElement("div"); info.classList.add("text");
                    let content = document.createElement("div"); content.classList.add("content");
                        let title = document.createElement("h1"); title.innerText = "Art Work By: ".concat(art.title);
                        content.appendChild(title);
                        let dscr = document.createElement("p"); dscr.innerText = art.description;
                        content.appendChild(dscr);
                        let link = document.createElement("a"); link.href = art.instagram; link.setAttribute("target", "_blank");
                        let button = document.createElement("button"); button.classList.add("web_link"); button.type = "button"; button.name = "club_btn"; button.innerHTML = "Visit Instagram";
                        link.appendChild(button);
                        content.appendChild(link);                
                    info.appendChild(content);
                box.appendChild(info);
            section.appendChild(box);
        }
}