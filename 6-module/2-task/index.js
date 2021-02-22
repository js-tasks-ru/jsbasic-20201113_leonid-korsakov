import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.renderCard();
  }
  renderCard() {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.append(this.createCardTop());
    this.card.append(this.createCardBody());
    return this.card;
  }

  createCardTop() {
    const cardTop = document.createElement('div');
    cardTop.classList.add('card__top');

    const img = document.createElement('img');
    img.classList.add('card__image');
    img.src = `/assets/images/products/${this.product.image}`;
    img.alt = `product`;

    const span = document.createElement('span');
    span.classList.add('card__price');
    span.textContent = `€${this.product.price.toFixed(2)}`;

    cardTop.append(img);
    cardTop.append(span);

    return cardTop;
  }

  createCardBody() {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card__body');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = `${this.product.name}`;

    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('card__button');

    const buttonImg = document.createElement('img');
    buttonImg.src = `/assets/images/icons/plus-icon.svg`;
    buttonImg.alt = 'icon';

    button.append(buttonImg);
    cardBody.append(cardTitle);
    cardBody.append(button);

    this.card.addEventListener('click', (event) => {
      if (event.target.closest('button')) {
        let event = new CustomEvent('product-add', {
          detail: this.product.id,
          bubbles: true
        });
        this.elem.dispatchEvent(event);
      }
    });

    return cardBody;
  }
  
}