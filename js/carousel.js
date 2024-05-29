// https://www.w3schools.com/howto/howto_js_slideshow.asp
export let slideIndex = 1;
let timer = null;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

export function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    } else if (n < 1) {
        slideIndex = slides.length;
    } else {
        slideIndex = n;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";

    resetTimer();
}

function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => showSlides(slideIndex + 1), 4000); // Move to the next slide every 2 seconds
}

export function initializeCarouselControls() {
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const dots = document.querySelectorAll(".dot");

    if (prevButton) {
        prevButton.addEventListener("click", () => plusSlides(-1));
    }
    if (nextButton) {
        nextButton.addEventListener("click", () => plusSlides(1));
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => currentSlide(index + 1));
    });
}