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

function generateMatchScore(value, name, originalName) {
    // generate a score based on how good the match is
    // 1. search value matches the beginning of the string
    // 2. search value matches a substring beginning with an uppercase 
    var score = -1;
    var start, end;
    for (var idx = 0; idx < name.length - value.length + 1; idx++) {
        var tmpScore = 0;
        var nameSubstring = name.substring(idx, idx + value.length).toLowerCase();
        if (nameSubstring == value) {
            if (idx == 0) tmpScore++;
            if (originalName[idx] == originalName[idx].toUpperCase()) tmpScore++;
            if (tmpScore > score) {
                score = tmpScore;
                start = idx;
                end = idx + value.length;
            }
        }
    }
    return {score, start, end};
}