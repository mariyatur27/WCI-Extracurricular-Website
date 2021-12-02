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

/* Commented out, as I don't think this section is used any more.
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

*/