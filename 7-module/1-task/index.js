import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.renderRibbon();
  }

  renderRibbon() {
    const ribbon = document.createElement('div');
    ribbon.classList.add('ribbon');

    const ribbonInner = document.createElement('div');
    ribbonInner.classList.add('ribbon__inner');

    for (const category of this.categories) {
      const a = document.createElement('a');
      a.href = '#';
      a.classList.add('ribbon__item');
      a.dataset.id = category.id;
      a.textContent = `${category.name}`;
      ribbonInner.append(a);

      a.addEventListener('click', (event) => {
        event.preventDefault();
        for (const a of ribbonInner.children) {
          a.classList.remove('ribbon__item_active');
        }
        event.target.classList.add('ribbon__item_active');
        let customEvent = new CustomEvent('ribbon-select', {
          detail: category.id,
          bubbles: true
        });
        this.elem.dispatchEvent(customEvent);
      });}


    const arrowLeft = this.renderRibbonArrowLeft();
    const arrowRight = this.renderRibbonArrowRight();

    arrowRight.addEventListener('click', event => {
      arrowLeft.classList.add('ribbon__arrow_visible');
      ribbonInner.scrollBy(350, 0);
      if (ribbonInner.scrollLeft > 349) {
        arrowRight.classList.toggle('ribbon__arrow_visible');
      }
    });

    arrowLeft.addEventListener('click', () => {
      arrowRight.classList.add('ribbon__arrow_visible');
      ribbonInner.scrollBy(-350, 0);
      if (ribbonInner.scrollLeft < 350) {
        arrowLeft.classList.toggle('ribbon__arrow_visible');
      }
    });

    ribbon.append(arrowLeft);
    ribbon.append(arrowRight);
    ribbon.append(ribbonInner);

    return ribbon;
  }

  renderRibbonArrowLeft() {
    const ribbonArrowLeft = document.createElement('button');
    ribbonArrowLeft.classList.add('ribbon__arrow', 'ribbon__arrow_left', 'ribbon__arrow_visible');
    const arrowImg = document.createElement('img');
    arrowImg.src = '/assets/images/icons/angle-icon.svg';
    arrowImg.alt = 'icon';
    ribbonArrowLeft.append(arrowImg);
    return ribbonArrowLeft;
  }

  renderRibbonArrowRight() {
    const ribbonArrowRight = document.createElement('button');
    ribbonArrowRight.classList.add('ribbon__arrow', 'ribbon__arrow_right', 'ribbon__arrow_visible');
    const arrowImg = document.createElement('img');
    arrowImg.src = '/assets/images/icons/angle-icon.svg';
    arrowImg.alt = 'icon';
    ribbonArrowRight.append(arrowImg);
    return ribbonArrowRight;
  }
}
