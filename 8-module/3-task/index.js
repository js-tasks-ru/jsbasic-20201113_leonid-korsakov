export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
      if (this.cartItems[productIndex].count === 0) {
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

