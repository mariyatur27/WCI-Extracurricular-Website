function expandBoxes() {
    var club_boxes = document.getElementsByClassName("question_block");

    for (const club_box of club_boxes) {
        var drop_down_button = club_box.getElementsByClassName("faq-btn")[0];
        drop_down_button.addEventListener("click", function() {
            var isActive = club_box.classList.contains("active");
            for (const club_box of club_boxes) {
                club_box.classList.remove("active");
            }
            if (!isActive) {
                club_box.classList.add("active");
            }
        })
    }
}

expandBoxes();