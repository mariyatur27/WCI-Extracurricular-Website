function toggleFilter(filter) {
    if (activeFilters.has(filter)) {
        activeFilters.delete(filter);
    } else {
        activeFilters.add(filter);
    }
}

function toggleFilterActive(filter) {
    var filterWrapper = document.getElementById(filter).parentElement;
    filterWrapper.classList.toggle("filter-active");
}

function toggleClubFilter(filter) {
    toggleFilter(filter + "_category");
    toggleFilterActive(filter);
    setupBoxes(clubs, 'club_boxes', 2);
}

function toggleMusicFilter(filter) {
    toggleFilter(filter);
    toggleFilterActive(filter);
    setupBoxes(music, 'music_boxes', 2);
}

function toggleAthleticsFilter(filter) {
    toggleFilter(filter);
    toggleFilterActive(filter);
    setupBoxes(athletics, 'athletics_boxes', 2);
}

function toggleDropdown(dropdown_content) {
    dropdown_content.classList.toggle('dropdown-active');
}

function hideDropdown() {
    var dropdown_content1 = document.getElementById('dropdown_content1');
    var dropdown_content2 = document.getElementById('dropdown_content2');
    var dropdown_content3 = document.getElementById('dropdown_content3');
    var dropdown_content4 = document.getElementById('dropdown_content4');
    dropdown_content1.classList.remove('dropdown-active');
    dropdown_content2.classList.remove('dropdown-active');
    dropdown_content3.classList.remove('dropdown-active');
    dropdown_content4.classList.remove('dropdown-active');
}

window.onclick = function (event) {
    // if the user clicks anywhere outside of the filters dropdown menu, hide menu
    // check if the id, className, or tagName of event.target matches any of the elements of the dropdown menu
    var exceptions = ["filterbt", "dropdown-btn", "LABEL", "dropdown_content"];
    var hide = true;
    for (let exception of exceptions) {
        var className = event.target.classList.value;
        var id = event.target.id;
        var tagName = event.target.tagName;
        if (className == exception || id == exception || tagName == exception) {
            hide = false;
        }
    }
    if (hide) {
        hideDropdown();
    }
}
