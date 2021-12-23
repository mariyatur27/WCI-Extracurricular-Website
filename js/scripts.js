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


// // Adding onclick functions to buttons
// const history_section = document.getElementById("team_history_button");
//     history_section.addEventListener('click', function () {
//         alert("test test test");
//         history_section.style.color = "green";
//         console.log("test")
//     });

// function show() {
//     console.log("test")
// };

var radio = document.getElementsByName("choice");
radio.onmouseup = deselectable;

// Function for the club search bar
function search_club() {
    var input = document.getElementById('club_search').value
    input=input.toLowerCase();
    var club_name = document.getElementsByClassName('lrn');
    var box = document.getElementsByClassName('club_box');
      
    for (i = 0; i < club_name.length; i++) { 
        if (!club_name[i].innerHTML.toLowerCase().includes(input)) {
            box[i].style.display="none";
        }
        else {
            box[i].style.display="list-item";                 
        }
    }
};
