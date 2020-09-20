class Basket {
    constructor() {}

    basketInitialState() {
        return {
            products: [],
            totalPrice: 0
        };
    }

    render() {
        const html = `
      <div class="basket-title">
          <i class="fas basket-icon fa-shopping-basket"></i>
          <span>Корзина</span>
      </div>
      <div class="basket-header">
          <div>Название</div>
          <div>Количество</div>
      </div>
      <div class="basket-content"></div>
      <div class="basket-total-price">Итого: 111 руб.</div>
      <div class="basket-btn-wrapper">1111</div>`;
        BASKET.innerHTML = html;
    }
}

const basket = new Basket();

// basket.render();
