/*!
* Start Bootstrap - Agency v7.0.10 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Code for the search bar
const extracurriculars = [
    { name: "Web-dev club", class: "#contact", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Robotics club", class: "#about", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Computer science club", class: "#team", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Math club", class: "#portfolio", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Debate club", class: "#team", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Science club", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
    { name: "Art club", image: "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"},
]

// Establishing event-listeners for the button
const searchInput = document.querySelector(".search_bar")
const searchButton = document.getElementById("search")

function searchMainPage(value) {
    clearList();
    console.log(value);

    // Checking if there's any input inside the search bar
    if (value && value.trim().length > 0){
        value = value.trim().toLowerCase();

        // Only returning those results of the showResults that match the user input in the search bar
        showResults(extracurriculars.filter(extracurriculars => {
            return extracurriculars.name.toLowerCase().includes(value);
        }))
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

showSlides(5);
function showSlides(amount) {
    // Get the div we're using
    var slideShowCards = document.getElementById("slide_show_cards");

    // Clear it
    slideShowCards.innerHTML = "";

    for (var club_index = 0; club_index < amount; club_index++) {
        generateSlide(club_index, slideShowCards);
    }
    // Schedule slides to move in 2 seconds
    setTimeout(() => {moveSlides(amount+1, 1);}, 2000);
}

function moveSlides(startIndex, offset) {
    // Get the div we're using
    var slideShowCards = document.getElementById("slide_show_cards");

    // Ensure that offset isn't overly large
    while (offset >= extracurriculars.length) {offset -= extracurriculars.length}

    for (var club_offset = 0; club_offset < offset; club_offset++) {
        var club_index = startIndex + club_offset;
        // Get all c_item elements
        var c_items = document.getElementsByClassName("c_item");

        // Remove the first c_item from the carousel
        slideShowCards.removeChild(c_items[0]);

        // Add a new item
        generateSlide(club_index, slideShowCards);
    }
    // Schedule slides to move again in 2 seconds
    setTimeout(() => {moveSlides(startIndex+offset, offset)}, 2000)
}

function generateSlide(club_index, slideShowCards) {
    // Loop over to the start again if needed 
    while (club_index >= extracurriculars.length) {club_index -= extracurriculars.length}

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
    image.src = extracurriculars[club_index]["image"];
    club_name_header.innerText = extracurriculars[club_index]["name"];

    // Add the image to the link
    link.appendChild(image);

    // Add the link & name header to the slide
    carousel_item.appendChild(link);
    carousel_item.appendChild(club_name_header);

    // Add the slide
    slideShowCards.appendChild(carousel_item);
}

// Id Function
function createId() {
        var c_box = document.getElementsByClassName("club_box");
        var e_box = document.getElementsByClassName("expand_box");
        for (n=0, length = e_box.length; n < length; n++){
            e_box[n].id = "e" + (n + 1);
            console.log(e_box.id);
        }
    }; 

createId();

// Expand function
// function expand() {
//     var content = document.getElementById("test");
//     var arrow_up = document.getElementById("up")
//     var arrow_down = document.getElementById("down")
//     if (content.style.display === "block") {
//       content.style.display = "none";
//       arrow_up.style.display = "none";
//       arrow_down.style.display = "block";
//     } else {
//       content.style.display = "block";
//       arrow_down.style.display = "none";
//       arrow_up.style.display = "block";
//     }
// }

function expand() {
    var idList = ["e1", "e2"];
    var listLen = idList.length;
    for (var i = 0; i < listLen; i++){
        console.log(idList[i]);
        a = idList[i]
    }
    var content = document.getElementById(a)

    var idList2 = ["d1", "d2"];
    var list2Len = idList2.length;
    for (var i = 0; i < list2Len; i++){
        console.log(idList2[i]);
        b = idList2[i]
    }
    var arrow_down = document.getElementById(b)

    var idList3 = ["u1", "u2"];
    var list3Len = idList3.length;
    for (var i = 0; i < list3Len; i++){
        console.log(idList3[i]);
        c = idList3[i]
    }
    var arrow_up = document.getElementById(c)

    if (content.style.display === "block") {
      content.style.display = "none";
      arrow_up.style.display = "none";
      arrow_down.style.display = "block";
    } else {
      content.style.display = "block";
      arrow_down.style.display = "none";
      arrow_up.style.display = "block";
    }
};
