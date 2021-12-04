
// Music search bar
function search_music() {
    var input = document.getElementById('club_search').value;
    input = input.toLowerCase();
    var music = document.getElementsByClassName('orch-head');
    var music_box = document.getElementsByClassName('orchestra');

    for (i = 0; i < music.length; i++) {
        if(!music[i].innerHTML.toLowerCase().includes(input)) {
            music_box[i].style.display = "none";
        } else {
            music_box[i].style.display = "list-item";
        }
    }
};




const orchbtn = document.querySelectorAll(".orchbtn");
const musicGroups = document.querySelectorAll(".music-groups")

for (i = 0; i < orchbtn.length; i++) {
    orchbtn[i].addEventListener("click", (e) => {
        e.preventDefault();

        const filter = e.target.dataset.filter;
        console.log(filter);
        musicGroups.forEach((group)=> {
            if (filter == "all") {
                group.style.display = "block"
            } else {
                if (group.classList.contains(filter)) {
                    group.style.display = "block"
                } else {
                    group.style.display = "none"
                }
            }
        })

    })
}


