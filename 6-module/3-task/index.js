import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.renderCarousel();
  }
  
  renderCarousel() {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
  
    const arrowRight = document.createElement('div');
    arrowRight.classList.add('carousel__arrow', 'carousel__arrow_right');
  
    const arrowRightImg = document.createElement('img');
    arrowRightImg.src = '/assets/images/icons/angle-icon.svg';
    arrowRightImg.alt = 'icon';
  
    arrowRight.append(arrowRightImg);
    carousel.append(arrowRight);
  
    const arrowLeft = document.createElement('div');
    arrowLeft.classList.add('carousel__arrow', 'carousel__arrow_left');
  
    const arrowLeftImg = document.createElement('img');
    arrowLeftImg.src = '/assets/images/icons/angle-left-icon.svg';
    arrowLeftImg.alt = 'icon';
  
    arrowLeft.append(arrowLeftImg);
    carousel.append(arrowLeft);
  
    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel__inner');
  
    for (let item of this.slides) {
  
      let slide = document.createElement('div');
      slide.classList.add('carousel__slide');
      slide.dataset.id = item.id;
  
      let img = document.createElement('img');
      img.classList.add('carousel__img');
      img.alt = 'slide';
      img.src = `/assets/images/carousel/${item.image}`;
  
      let carouselCaption = document.createElement('div');
      carouselCaption.classList.add('carousel__caption');
    
      let carouselPrice = document.createElement('span');
      carouselPrice.classList.add('carousel__price');
      carouselPrice.textContent = `€${item.price.toFixed(2)}`;
  
      let carouselTitle = document.createElement('div');
      carouselTitle.classList.add('carousel__title');
      carouselTitle.textContent = item.name;
  
      let button = document.createElement('button');
      button.type = 'button';
      button.classList.add('carousel__button');
  
      let buttonImg = document.createElement('img');
      buttonImg.alt = 'icon';
      buttonImg.src = '/assets/images/icons/plus-icon.svg';
  
      carouselCaption.append(carouselPrice);
      carouselCaption.append(carouselTitle);
  
      button.append(buttonImg);
      carouselCaption.append(button);
  
      slide.append(img);
      slide.append(carouselCaption);
      carouselInner.append(slide);
  
      slide.addEventListener('click', (event) => {
        if (event.target.closest('button')) {
          let event = new CustomEvent('product-add', {
            detail: item.id,
            bubbles: true
          });
          this.elem.dispatchEvent(event);
        }
      });
      carousel.append(carouselInner);
    }
  
    const carouselArrowRight = carousel.querySelector('.carousel__arrow_right');
    const carouselArrowLeft = carousel.querySelector('.carousel__arrow_left');
    const slides = [...carousel.querySelectorAll('div.carousel__slide')];
    let currentSlide = 0;
    let currentCarouselWidth = 0;
  
    arrowLeft.style.display = 'none';
  
    carouselArrowRight.addEventListener('click', () => {
      arrowLeft.style.display = '';
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        currentCarouselWidth += carouselInner.offsetWidth;
        carouselInner.style.transform = `translateX(-${currentCarouselWidth}px)
        `;
      }
  
      if (currentSlide === slides.length - 1) {
        arrowRight.style.display = 'none';
      }
    });
  
    carouselArrowLeft.addEventListener('click', () => {
      arrowRight.style.display = '';
      if (currentSlide !== 0) {
        currentSlide--;
        currentCarouselWidth -= carouselInner.offsetWidth;
        carouselInner.style.transform = `translateX(-${currentCarouselWidth}px)`;
      }
  
      if (currentSlide === 0) {
        arrowLeft.style.display = 'none';
      }
    });
    
    return carousel;
  }
}