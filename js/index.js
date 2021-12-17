async function searchMainPage(value) {
    if (!dataFetched) {
        await fetchData();
    }
    clearList();

    // Checking if there's any input inside the search bar
    var smLinks = document.getElementsByClassName("main_sm_links");
    if (value && value.trim().length > 0){
        for (const link of smLinks ) {link.style.display = "none";};
        value = value.trim().toLowerCase();

        // Only returning those results of the showResults that match the user input in the search bar
        showResults([clubs.filter(activity => {
            return activity.name.toLowerCase().includes(value);
        }), athletics.filter(activity => {
            return activity.name.toLowerCase().includes(value);
        }), music.filter(activity => {
            return activity.name.toLowerCase().includes(value);
        })],
        ["clubs.html", "athletics.html", "music.html"]);
    } else {
        for (const link of smLinks ) {link.style.display = "inline";};
    }
}

// Showing results from the search
function showResults(resultsList, pageUrls){
    for (var resultIndex = 0; resultIndex<resultsList.length; resultIndex++) {
        for (const result of resultsList[resultIndex]) {
            const resultItem = document.createElement('a');
            resultItem.innerText = result.name;
            
            resultItem.classList.add('result-item');
            resultItem.href = pageUrls[resultIndex].concat("?box=").concat(result.id);

            var results = document.getElementById("list");
            results.appendChild(resultItem);
        }
    }
    if (results.length === 0) {
        noResults()
    }
}

// Showing no results
function noResults() {
    const error = document.createElement('li')
    error.classList.add('error-message')

    const text = document.createTextNode('We were not able to find what you are looking for. Sorry.')

    error.appendChild(text)

    list.appendChild(error)
}

// Clearing results from the page 
function clearList(){
    list.innerHTML = "";
}
var slideIndexes = [];
// Slide shows
showSlides(Math.floor(window.innerWidth/260), [clubs, athletics, music], ["club_slide_show_cards", "athletics_slide_show_cards", "music_slide_show_cards"], true, ["clubs.html", "athletics.html", "index.html"]);

window.onresize = () => {showSlides(Math.floor(window.innerWidth/260), [clubs, athletics, music], ["club_slide_show_cards", "athletics_slide_show_cards", "music_slide_show_cards"], false, ["clubs.html", "athletics.html", "index.html"])}

async function showSlides(amount, slideShowSources, slideShowIds, reset, pageLocations) {
    if (!dataFetched) {
        await fetchData();
    }
    if (slideShowSources.length != slideShowIds.length) {
        throw "Slide show contents and ids are not the same length!"
    }
    for (var slideShowIndex = 0; slideShowIndex < slideShowSources.length; slideShowIndex++) {
        // Get the div for this slideshow
        var slideShowDiv = document.getElementById(slideShowIds[slideShowIndex]);

        // Clear the div
        slideShowDiv.innerHTML = "";

        // Generate slides for the div
        for (var cardIndex = 0; cardIndex < amount; cardIndex++) {
            if (!reset) {
                var slideIndex = cardIndex + slideIndexes[slideShowIndex]
            } else {
                var slideIndex = cardIndex
            }
            generateSlide(slideIndex, slideShowSources[slideShowIndex], slideShowDiv, pageLocations[slideShowIndex]);
        }
        if (reset) {
            slideIndexes.push(0);
        }
    }
    // Schedule the slides to move in 2 seconds, if we need to
    if (reset) {
        setTimeout(moveSlides, 2000, amount+1, 1, slideShowSources, slideShowIds, pageLocations);
    }
}

// var expand = document.getElementById("contributors");
var contributors = document.getElementById("people");
var expand = document.getElementById("contributors");
expand.addEventListener('click', function() {
    var contributors = document.getElementById("people");
    if (contributors.style.display = "none"){
        contributors.style.display = "block";
    }
    else if (contributors.style.display = "block"){
        contributors.style.display = "none";
    }
    
});

function moveSlides(startIndex, offset, slideShowSources, slideShowDivIds, pageLocations) {
    for (var slideShowIndex = 0; slideShowIndex < slideShowSources.length; slideShowIndex++) {
        slideIndexes[slideShowIndex] += offset;
        // Get the div we're using
        var slideShowDiv = document.getElementById(slideShowDivIds[slideShowIndex]);
        var slideShowSource = slideShowSources[slideShowIndex];
        // Ensure that offset and index aren't overly large
        while (slideIndexes[slideShowIndex] >= slideShowSource.length) {slideIndexes[slideShowIndex] -= slideShowSource.length} 
        while (offset >= slideShowSource.length) {offset -= slideShowSource.length}

        for (var new_offset = 0; new_offset < offset; new_offset++) {
            var index = startIndex + new_offset;
            // Get all c_item elements in our div
            var c_items = slideShowDiv.getElementsByClassName("c_item");

            // Remove the first c_item from the carousel
            slideShowDiv.removeChild(c_items[0]);

            // Add a new item
            generateSlide(index, slideShowSource, slideShowDiv, pageLocations[slideShowIndex]);
        }
    }
    // Schedule slides to move again in 2 seconds
    setTimeout(moveSlides, 2000, startIndex+offset, offset, slideShowSources, slideShowDivIds, pageLocations);
}

function generateSlide(index, slideShowCards, slideShowDiv, pageLocation) {
    // Ensure that index is not larger than necessary
    while (index >= slideShowCards.length) {index -= slideShowCards.length}

    // Create a div for our item
    var carousel_item = document.createElement("div");
    carousel_item.classList.add("c_item");

    // Link, image and name for our item
    var link = document.createElement("a");
    link.classList.add("hidden_link")
    var image = document.createElement("img");
    image.classList.add("c_image");
    var club_name_header = document.createElement("h5");

    // Set the link, image and name
    link.href = pageLocation.concat("?box=".concat(slideShowCards[index].id));
    image.src = slideShowCards[index].image;
    club_name_header.innerText = slideShowCards[index].name;

    link.appendChild(image);
    link.appendChild(club_name_header);
    carousel_item.appendChild(link);

    // Add the slide
    slideShowDiv.appendChild(carousel_item);
};

async function createCalendar(daysAhead) {
    if (!dataFetched) {
        await fetchData();
    }
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    var maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + daysAhead);

    var eventDates = {};

    for (var event of events) {
        var eventdate = new Date(event.start_time*1000);
        console.log(eventdate);
        if (eventdate <= maxDate && eventdate >= today) {
            let distance = eventdate.getDate()-today.getDate();
            if (distance in eventDates) {
                eventDates[distance].push(event);
            } else {
                eventDates[distance] = [event];
            }
        }
    }

    var table = document.getElementById("calendar");
    var date = new Date();
    var maxHeight = 0;
    var overrides = {0: "Today", 1: "Tomorrow"};
    var row = document.createElement("tr");
    for (var i = 0; i<daysAhead; i++) {
        var col = document.createElement("td");
        col.classList.add("calendar_col", "calendar_header");
        if (i in overrides) {
            col.innerText = overrides[i];
        } else {
            col.innerText = date.toLocaleDateString("en-CA", {weekday: 'long'});
        }
        row.appendChild(col);
        date.setDate(date.getDate() + 1);
    }
    table.appendChild(row);
    for (var date in eventDates) {
        if (maxHeight < eventDates[date].length) {
            for (var i = 0; i<eventDates[date].length-maxHeight; i++) {
                console.log("hi");
                row = document.createElement("tr");
                for (var c = 0; c<daysAhead; c++){
                    var col = document.createElement("td")
                    col.classList.add("calendar_col")
                    row.appendChild(col);
                }
                table.appendChild(row);
            }
            maxHeight = eventDates[date].length
        }
        console.log(maxHeight);

        eventDates[date].sort((a, b) => a.start_time - b.start_time);
        
        var tableRowIndex = 1;

        for (var event of eventDates[date]) {
            var start_date = new Date(events[0].start_time*1000);
            var start_date_string = start_date.toISOString().replaceAll(/[-:]/g, "").split(".")[0] + "Z";
            var end_date = new Date(events[0].end_time*1000);
            end_date.setDate(end_date.getDate() + 7);
            var end_date_string = end_date.toISOString().replaceAll(/[-:]/g, "").split(".")[0] + "Z";
            var google_calendar_href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.title}&dates=${start_date_string}/${end_date_string}&details=${event.description}`;

            let main_div = document.createElement("div"); main_div.classList.add("calendar_event")
            let time_p = document.createElement("p");
            let title_p = document.createElement("p");
            let expand_link = document.createElement("button");
            let hidden_div = document.createElement("div");
            let add_to_calendar_link = document.createElement("a");
            let add_to_calendar_icon = document.createElement("img");
            let download_ics_link = document.createElement("a");
            let download_ics_icon = document.createElement("img");
            add_to_calendar_icon.src = "assets/icons/google_calendar.png";
            add_to_calendar_icon.title = "Add to Google Calendar";
            download_ics_icon.src = "assets/icons/download.png";
            download_ics_icon.title = "Download ICS file";
            add_to_calendar_icon.classList.add("icons");
            download_ics_icon.classList.add("icons");
            time_p.innerText = start_date.toLocaleTimeString("en-CA", {timeStyle: "short"}).replaceAll(".", "") + " - " + end_date.toLocaleTimeString("en-CA", {timeStyle: "short"}).replaceAll(".", "") + "\n";
            title_p.innerText = event.title;
            time_p.classList.add("calendar_time");
            title_p.classList.add("calendar_time");
            expand_link.classList.add("calendar_expand_button");
            expand_link.addEventListener("click", () => {hidden_div.classList.toggle("expanded"); return false;});
            expand_link.appendChild(time_p);
            expand_link.appendChild(title_p);
            main_div.appendChild(expand_link);
            hidden_div.innerText = event.description;
            add_to_calendar_link.href = google_calendar_href;
            add_to_calendar_link.target = "_blank";
            add_to_calendar_link.appendChild(add_to_calendar_icon);
            download_ics_link.appendChild(download_ics_icon);
            hidden_div.appendChild(document.createElement("br"));
            hidden_div.appendChild(add_to_calendar_link);
            hidden_div.appendChild(download_ics_link);
            hidden_div.classList.add("calendar_event_expand");
            main_div.appendChild(hidden_div);
            let cell = table.getElementsByTagName("tr")[tableRowIndex].getElementsByTagName("td")[date];
            cell.appendChild(main_div);
            tableRowIndex++;
        }
    }

    console.log(eventDates);

    
}
createCalendar(5);