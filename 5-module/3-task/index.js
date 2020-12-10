function initCarousel() {
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');
  const slides = [...document.querySelectorAll('.carousel__slide')];
  const slidesWidth = slides.map(slide => slide.offsetWidth);
  let currentSlide = 0;
  let currentCarouselWidth = slidesWidth[currentSlide];

  carouselArrowLeft.style.display = 'none';

  carouselArrowRight.addEventListener('click', () => {
    carouselArrowLeft.style.display = '';
    if (currentSlide < slides.length - 1) {
      carouselInner.style.transform = `translateX(-${currentCarouselWidth}px)`;
      currentSlide++;
      currentCarouselWidth += slidesWidth[currentSlide];
    }

    if (currentSlide === slides.length - 1) {
      carouselArrowRight.style.display = 'none';
    }
  });

  carouselArrowLeft.addEventListener('click', () => {
    carouselArrowRight.style.display = '';
    if (currentSlide !== 0) {
      currentSlide--;
      currentCarouselWidth -= slidesWidth[currentSlide];
      carouselInner.style.transform = `translateX(-${currentCarouselWidth - slidesWidth[currentSlide]}px)`;
    }

    if (currentSlide === 0) {
      carouselArrowLeft.style.display = 'none';
    }
  });

}
