class Basket {
    constructor(props) {
        this.ROOT_BASKET = props.ROOT_BASKET;
        this.basketFromLocalStorage = localStorageUtil.getBasketFromLocalStorage(); // для начальной загрузки
        this.addedProducts = [];
        this.totalPrice = 0;
        this.ROOT_BASKET_CONTENT = null;
        this.ROOT_BASKET_TOTAL_PRICE = null;
        /* добавление продукта */
        pubSub.subscribeByEvent(
            "onAddProductInBasket",
            this.addedProduct.bind(this)
        );
        pubSub.subscribeByEvent(
            "onAddProductInBasket",
            this.renderProductsInBasket.bind(this)
        );
        pubSub.subscribeByEvent(
            "onAddProductInBasket",
            this.renderTotalPrice.bind(this)
        );
        /* *** */
        /* удаление продукта */
        pubSub.subscribeByEvent(
            "onDeleteProductFromBasket",
            this.deletedProduct.bind(this)
        );
        pubSub.subscribeByEvent(
            "onDeleteProductFromBasket",
            this.renderProductsInBasket.bind(this)
        );
        pubSub.subscribeByEvent(
            "onDeleteProductFromBasket",
            this.renderTotalPrice.bind(this)
        );
        /* *** */
        /* Изменение количества */
        pubSub.subscribeByEvent(
            "onIncreaseQuantityInBasket",
            this.updatedQuantity.bind(this)
        );
        pubSub.subscribeByEvent(
            "onDecreaseQuantityInBasket",
            this.updatedQuantity.bind(this)
        );
        pubSub.subscribeByEvent(
            "onIncreaseQuantityInBasket",
            this.renderProductsInBasket.bind(this)
        );
        pubSub.subscribeByEvent(
            "onDecreaseQuantityInBasket",
            this.renderProductsInBasket.bind(this)
        );
        pubSub.subscribeByEvent(
            "onIncreaseQuantityInBasket",
            this.renderTotalPrice.bind(this)
        );
        pubSub.subscribeByEvent(
            "onDecreaseQuantityInBasket",
            this.renderTotalPrice.bind(this)
        );
        /* *** */
        /* Добавление предзаказа */
        pubSub.subscribeByEvent(
            "setPreOrderInBasket",
            this.addedProduct.bind(this)
        );
        pubSub.subscribeByEvent(
            "setPreOrderInBasket",
            this.renderProductsInBasket.bind(this)
        );
        pubSub.subscribeByEvent(
            "setPreOrderInBasket",
            this.renderTotalPrice.bind(this)
        );
        /* *** */
    }

    // оформление заказа
    completePurchase() {
        if (this.addedProduct.length && this.totalPrice) {
            console.log("Ваш заказ оформлен");
            this.addedProducts = [];
            this.totalPrice = 0;
            this.renderProductsInBasket();
            this.renderTotalPrice();
        }
    }

    // создание корзины
    createBasket() {
        const basket = document.createElement("div");
        const basketTitle = document.createElement("div");
        basketTitle.classList.add("basket-title");
        basket.prepend(basketTitle);
        const basketIcon = document.createElement("i");
        basketIcon.classList.add("fas");
        basketIcon.classList.add("basket-icon");
        basketIcon.classList.add("fa-shopping-basket");
        basketTitle.prepend(basketIcon);
        const span = document.createElement("span");
        span.textContent = "Корзина";
        basketIcon.after(span);
        const basketHeader = document.createElement("div");
        basketHeader.classList.add("basket-header");
        const divName = document.createElement("div");
        divName.textContent = "Название";
        basketHeader.prepend(divName);
        const divCount = document.createElement("div");
        divCount.textContent = "Количество";
        divName.after(divCount);
        basketTitle.after(basketHeader);
        const basketContent = document.createElement("div");
        basketContent.classList.add("basket-content");
        this.ROOT_BASKET_CONTENT = basketContent;
        basketHeader.after(basketContent); // <- контент тут
        const basketTotalPrice = document.createElement("div");
        basketTotalPrice.classList.add("basket-total-price");
        this.ROOT_BASKET_TOTAL_PRICE = basketTotalPrice;
        basketContent.after(basketTotalPrice); // <- общая цена
        const basketBtnWrapper = document.createElement("div");
        basketBtnWrapper.classList.add("basket-btn-wrapper");
        const completeOrder = document.createElement("button");
        completeOrder.classList.add("btn-style");
        completeOrder.classList.add("btn-confirm");
        completeOrder.textContent = "Оформить заказ";
        basketBtnWrapper.prepend(completeOrder);

        basketBtnWrapper.addEventListener("click", event => {
            this.completePurchase();
        });
        basketTotalPrice.after(basketBtnWrapper);

        return basket;
    }

    // обновление количества
    updatedQuantity(product) {
        this.addedProducts.forEach(item => {
            if (item.id === product.id) {
                item.quantity = product.quantity;
                item.total = product.total;
                if (product.type === "increase")
                    this.totalPrice += product.price;
                if (product.type === "decrease")
                    this.totalPrice -= product.price;
            }
        });
    }

    addedPreOrderProduct() {}

    // добавление
    addedProduct(currentProduct) {
        const foundProduct = this.addedProducts.find(
            item => item.id === currentProduct.id
        );
        if (!foundProduct) {
            this.addedProducts.push(currentProduct);
        } else {
            // меняется по ссылке
            foundProduct.quantity += currentProduct.quantity;
            foundProduct.total +=
                currentProduct.quantity * currentProduct.price;
        }
        console.log(currentProduct.total);
        this.totalPrice += currentProduct.total;
    }

    // удаление
    deletedProduct(id) {
        const foundProduct = this.addedProducts.find(item => item.id === id);
        const foundIndex = this.addedProducts.findIndex(item => item.id === id);
        this.addedProducts.splice(foundIndex, 1);
        this.totalPrice -= foundProduct.total;
    }

    // рендер продуктов внутри корзины
    renderProductsInBasket() {
        this.ROOT_BASKET_CONTENT.innerHTML = "";
        const preparedProducts = this.addedProducts.map(product => {
            const { id, name, quantity, ingredients } = product;

            return new BasketItem({ id, name, quantity, ingredients });
        });
        preparedProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_BASKET_CONTENT);
    }

    // рендер общей цены внутри корзины
    renderTotalPrice() {
        this.ROOT_BASKET_TOTAL_PRICE.innerHTML = "";
        this.ROOT_BASKET_TOTAL_PRICE.append(
            new BasketTotalPrice({ totalPrice: this.totalPrice }).render()
        ); // рендер общей цены
    }

    // рендер козины
    renderBasket() {
        this.ROOT_BASKET.innerHTML = "";
        this.ROOT_BASKET.append(this.createBasket());
    }
}

const basket = new Basket({
    ROOT_BASKET: ROOT_BASKET
});

basket.renderBasket();
basket.renderTotalPrice();
