export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = {
      steps: steps,
      value: value,
    };
    this.elem = this.renderSlider();
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragStart = () => false;
  }
  renderSlider() {
    function Div(className) {
      const div = document.createElement('div');
      div.className = className;
      return div;
    }

    const sliderContainer = document.querySelector('.container');

    const slider = new Div('slider');
    const sliderThumb = new Div('slider__thumb');

    const sliderValue = document.createElement('span');
    sliderValue.className = 'slider__value';
    sliderValue.textContent = '0';

    const sliderProgress = new Div('slider__progress');
    const sliderSteps = new Div('slider__steps');
    for (let i = 0; i < this.config.steps; i++) {
      const step = document.createElement('span');
      step.setAttribute('data-position', i);
      if (i == 0) {
        step.className = 'slider__step-active';
      }
      sliderSteps.append(step);
    }

    sliderThumb.append(sliderValue);
    slider.append(sliderThumb, sliderProgress, sliderSteps);

    let leftPercents = 0;

    slider.addEventListener('click', event => {
      let target = event.target;
      
      if (target.nodeName === 'SPAN') {
        //Перемещаем ползунок на выбранную позицию
        leftPercents = Math.ceil((target.offsetLeft / (slider.clientWidth / 100)).toFixed(0));
        sliderValue.textContent = +target.dataset.position;
        sliderThumb.style.left = `${leftPercents}%`;
        sliderProgress.style.width = `${leftPercents}%`;

        //Задаём стиль для выбранного шага
        [...sliderSteps.children].map(span => {
          span.className = '';
          if (span.dataset.position === target.dataset.position) {
            span.className = 'slider__step-active';
          }
        });

      }

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = [...sliderSteps.children].length - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      leftPercents = this.value / segments * 100;

      sliderThumb.style.left = `${leftPercents}%`;
      sliderProgress.style.width = `${leftPercents}%`;
      sliderValue.textContent = +this.value;

      let customEvent = new CustomEvent('slider-change', {
        detail: +sliderValue.textContent,
        bubbles: true 
      });
      this.elem.dispatchEvent(customEvent);
    });

    sliderThumb.addEventListener('pointerdown', event => {
      event.preventDefault();
      slider.classList.add('slider_dragging');
    });

    sliderContainer.addEventListener('pointermove', event => {
      event.preventDefault();
      if (slider.classList.contains('slider_dragging')) {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
        let segments = [...sliderSteps.children].length - 1;
        let approximateValue = leftRelative * segments;
        this.value = Math.round(approximateValue);
        leftPercents = this.value / segments * 100;
        
        if (leftRelative > 0 && leftRelative < 1) {
          sliderThumb.style.left = `${leftRelative * 100}%`;
          sliderProgress.style.width = `${leftRelative * 100}%`;
          sliderValue.textContent = +this.value;
        }
      }

    });

    sliderContainer.addEventListener('pointerup', () => {
      slider.classList.remove('slider_dragging');
      sliderThumb.style.left = `${leftPercents}%`;
      sliderProgress.style.width = `${leftPercents}%`;

      let customEvent = new CustomEvent('slider-change', {
        detail: this.value, 
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    });

    return slider;
  }
}