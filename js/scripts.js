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
    { name: "web-dev club", class: "#contact"},
    { name: "robotics club", class: "#about"},
    { name: "computer science club", class: "#team"},
    { name: "math club", class: "#portfolio"},
    { name: "debate club", class: "#team"},
]

// Establishing event-listeners for the button
const searchInput = document.querySelector(".search_bar")
const searchButton = document.getElementById("search")

searchButton.addEventListener("click", function(e) {
    // alert("hello world")
    let value = e.target.value
    clearList()

    // Checking if there's any input inside the search bar
    if (value && value.trim().length > 0){
        value = value.trim().toLowerCase()

        // Only returning those results of the showResults that match the user input in the search bar
        showResults(extracurriculars.filter(extracurriculars => {
            return extracurriculars.name.includes(value)
        }))
    }
});

searchInput.addEventListener("input", (e) => {
    let value = e.target.value
    clearList()

    // Checking if there's any input inside the search bar
    if (value && value.trim().length > 0){
        value = value.trim().toLowerCase()

        // Only returning those results of the showResults that match the user input in the search bar
        showResults(extracurriculars.filter(extracurriculars => {
            return extracurriculars.name.includes(value)
        }))
    }
});


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

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("carousel_item");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 6 seconds
};

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
