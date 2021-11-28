const clubs = [
    { name: "Web-dev club", class: "#contact", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Robotics club", class: "#about", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Computer science club", class: "#team", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Math club", class: "#portfolio", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Debate club", class: "#team", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Science club", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Art club", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
]

const athletics = [
    { name: "Basketball", class: "#about", image:"https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Volleyball", class: "#about", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Soccer", class: "#team", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Football", class: "#portfolio", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Hockey", class: "#team", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Skiing", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Cross Country", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
];

function searchMainPage(value) {
    clearList();
    console.log(value);

    // Checking if there's any input inside the search bar
    if (value && value.trim().length > 0){
        value = value.trim().toLowerCase();

        // Only returning those results of the showResults that match the user input in the search bar
        showResults(clubs.filter(club => {
            return club.name.toLowerCase().includes(value);
        }).concat(athletics.filter(sport => {
            return sport.name.toLowerCase().includes(value);
        })))
    }
}

// Showing results from the search
function showResults(results){
    for (const extracurriculars of results){
        const resultItem = document.createElement('a')
        var link = document.createTextNode(extracurriculars.name)
        var results = document.getElementById("list")

        resultItem.appendChild(link)
        // resultItem.appendChild(source)

        resultItem.classList.add('result-item')

        resultItem.href = extracurriculars.class

        resultItem.title = document.createTextNode(extracurriculars.name)
        results.appendChild(resultItem)
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

// Slide shows
showSlides(Math.floor(window.innerWidth/260), [clubs, athletics], ["club_slide_show_cards", "athletics_slide_show_cards"], true);

window.onresize = () => {showSlides(Math.floor(window.innerWidth/260), [clubs, athletics], ["club_slide_show_cards", "athletics_slide_show_cards"], false)}

function showSlides(amount, slideShowSources, slideShowIds, scheduleMoves) {
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
            generateSlide(cardIndex, slideShowSources[slideShowIndex], slideShowDiv);
        }
    }
    // Schedule the slides to move in 2 seconds, if we need to
    if (scheduleMoves) {
        setTimeout(moveSlides, 2000, amount+1, 1, slideShowSources, slideShowIds);
    }
}

function moveSlides(startIndex, offset, slideShowSources, slideShowDivIds) {
    for (var slideShowIndex = 0; slideShowIndex < slideShowSources.length; slideShowIndex++) {
        // Get the div we're using
        var slideShowDiv = document.getElementById(slideShowDivIds[slideShowIndex]);
        var slideShowSource = slideShowSources[slideShowIndex];
        // Ensure that offset isn't overly large
        while (offset >= slideShowSource.length) {offset -= slideShowSource.length}

        for (var new_offset = 0; new_offset < offset; new_offset++) {
            var index = startIndex + new_offset;
            // Get all c_item elements in our div
            var c_items = slideShowDiv.getElementsByClassName("c_item");

            // Remove the first c_item from the carousel
            slideShowDiv.removeChild(c_items[0]);

            // Add a new item
            generateSlide(index, slideShowSource, slideShowDiv);
        }
    }
    // Schedule slides to move again in 2 seconds
    setTimeout(moveSlides, 2000, startIndex+offset, offset, slideShowSources, slideShowDivIds);
}

function generateSlide(index, slideShowCards, slideShowDiv) {
    // Ensure that index is not larger than necessary
    while (index >= slideShowCards.length) {index -= slideShowCards.length}

    // Create a div for our item
    var carousel_item = document.createElement("div");
    carousel_item.classList.add("c_item");

    // Link, image and name for our item
    var link = document.createElement("a");
    var image = document.createElement("img");
    image.classList.add("c_image");
    var club_name_header = document.createElement("h5");

    // Set the link, image and name
    link.href = "index.html";
    image.src = slideShowCards[index]["image"];
    club_name_header.innerText = slideShowCards[index]["name"];

    // Add the image to the link
    link.appendChild(image);

    // Add the link & name header to the slide
    carousel_item.appendChild(link);
    carousel_item.appendChild(club_name_header);

    // Add the slide
    slideShowDiv.appendChild(carousel_item);
}

