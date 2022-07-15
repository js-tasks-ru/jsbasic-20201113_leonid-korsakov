import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let productIndex = this.cartItems.findIndex(item => item === product);
    if (productIndex === -1) {
      product.count = 1;
      this.cartItems.push(product);
    } else {
      this.cartItems[productIndex].count++;
    }
    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let productIndex = this.cartItems.findIndex(item => item.id === productId);
    if (productIndex != -1) {
      if (this.cartItems[productIndex].count > 0) {
        this.cartItems[productIndex].count += amount;
      }
      if (this.cartItems[productIndex].count < 1) {
        this.cartItems.splice(productIndex, 1);
      }
    }
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    let result = this.cartItems.find(item => item);
    return result ? false : true;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.map(item => {
      totalCount += item.count;
    });
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.map(item => {
      totalPrice += (item.price * item.count);
    });
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.setTitle('Your order');
    let modalBody = document.createElement('div');
    for (let product of this.cartItems) {
      let card = (this.renderProduct(product, product.count));
      modalBody.append(card);
    }

    modalBody.append(this.renderOrderForm());

    modal.setBody(modalBody);

    modal.open();

    document.querySelector('.modal__body').addEventListener('click', event => {
      let target = event.target;

      if (target.alt === 'minus') {
        let counter = target.parentNode.parentNode.parentNode.parentNode.parentNode;
        this.updateProductCount(counter.dataset.productId, -1);
      }

      if (target.alt === 'plus') {
        let counter = target.parentNode.parentNode.parentNode.parentNode.parentNode;
        this.updateProductCount(counter.dataset.productId, 1);
      }
    });
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {

      let modal = new Modal();

      if (this.cartItems.length == 0) {
        modal.close();
      }

      for (let item of cartItem) {
        let card = this.renderProduct(item, item.count);

        let count = card.querySelector('.cart-counter__count').innerHTML;
        let price = card.querySelector('.cart-product__price').
        innerHTML.slice(1);

        let productId = item.id;

        let modalBody = document.querySelector('.modal__body');

        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

        productCount.innerHTML = count;
        productPrice.innerHTML = `€${(price * count).toFixed(2)}`;
        infoPrice = `${this.getTotalPrice().toFixed(
          2)}`;
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}