function expandBoxes() {
    var club_boxes = document.getElementsByClassName("club_box");

    for (const club_box of club_boxes) {
        var drop_down_button = club_box.getElementsByClassName("drop")[0];
        drop_down_button.addEventListener("click", () => {
            club_box.classList.toggle("active");
        });
    }
}

expandBoxes();