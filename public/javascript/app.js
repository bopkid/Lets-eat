var slideIndex = 0;
showSlides();

console.log('hi')

function showSlides() {
  const slides = document.getElementsByClassName("slideshow-container__images");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

