async function generateSlideshow(cardsData, slideshowId, redirectPage, urlParamName) {
    if (!dataFetched) {
        await fetchData();
    }
    var slideAt = 1;
    var slideshow = document.getElementById(slideshowId);

    slideshow.innerHTML = "";

    function generateSlide(card) {
        var wrapper = document.createElement("div");
        wrapper.classList.add("slide-wrapper");

            var link = document.createElement("a");
            link.classList.add("slide-link");

            if (redirectPage && urlParamName) {
                link.href = redirectPage + "?" + urlParamName + "=" + card.id;
            }

            var image = document.createElement("img");
            image.classList.add("slide-img")
            image.src = card.image;
            image.alt = card.name + "'s logo";

            var clubNameHeader = document.createElement("h5");
            clubNameHeader.innerText = card.name;

            link.appendChild(image);
            link.appendChild(clubNameHeader);

            wrapper.appendChild(link);

        slideshow.appendChild(wrapper);
    }

    function generateSlides() {
        for (var card of cardsData) {
            generateSlide(card);
        }
    }

    // animates slides by translating a slide's x position,
    // and easing its transition in CSS
    // function moveSlides() {
    //     var slides = slideshow.getElementsByClassName("slide-wrapper");

    //     var idx = 1;
    //     for (var slide of slides) {
    //         // set opacity to 0 when the slide is moved back to the right
    //         if (idx == slideAt - 1 || (idx == cardsData.length && slideAt == 1)) {
    //             slide.style.opacity = "0";
    //         } else {
    //             slide.style.opacity = "1";
    //         }

    //         if (slideAt <= idx) {
    //             var transformBy = - (slideAt * 100);
    //         } else {
    //             var transformBy = (cardsData.length - slideAt) * 100;
    //         }
    //         slide.style.transform = `translateX(${transformBy}%)`;
            
    //         idx++;
    //     }

    //     slideAt++;
    //     if (slideAt > cardsData.length) {
    //         slideAt = 1;
    //     }
    // }

    generateSlides();
    setInterval(moveSlides, 2000);
}

generateSlideshow(clubs, "clubs-slideshow", "clubs.html", "box");
generateSlideshow(athletics, "athletics-slideshow", "athletics.html", "box");
generateSlideshow(music, "music-slideshow");


new Glider(document.querySelector('.glider'), {
    slidesToShow: 5,
    slidesToScroll: 5,
    draggable: true,
    dots: '.dots',
  });