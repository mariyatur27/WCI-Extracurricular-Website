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

// searchButton.addEventListener("input", (e))

searchInput.addEventListener("input", (e) => {
    let value = e.target.value

    // Checking if there's any input inside the search bar
    if (value && value.trim().length > 0){
        value = value.trim().toLowerCase()

        // Only returning those results of the showResults that match the user input in the search bar
        showResults(extracurriculars.filter(extracurriculars => {
            return extracurriculars.name.includes(value)
        }))
    }else{
        clearList()
    }
})

// Showing results from the search
function showResults(results){
    for (const extracurriculars of results){
        // Making each result item a list
        const resultItem = document.createElement('li')
        // const link = document.createElement('a')

        // Assigning a class to each result element
        resultItem.classList.add('result-item')

        // link.href = document.create(extracurriculars.class)

        // Making the name of the extracurricular the list item's text
        const text = document.createTextNode(extracurriculars.name)

        resultItem.appendChild(text)
        // list.appendChild(link)
        list.appendChild(resultItem)
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
    while (list.firstChild){
        list.removeChild(list.firstChild)
    }
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

var iframe = top.frames[name].document;
var css = '' +
          '<style type="text/css">' +
          'body{margin:0;padding:0;background:transparent}' +
          '</style>';
iframe.open();
iframe.write(css);
iframe.close();

// Slide Show Code
// var slideIndex = 0;
// showSlides();

// function showSlides() {
//   var i;
//   var slides = document.getElementsByClassName("carousel_item");
//   var dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}    
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
//   setTimeout(showSlides, 5000); // Change image every 2 seconds
// }