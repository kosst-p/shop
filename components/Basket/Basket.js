class Basket {
    constructor(props) {
        this.parentDOM = props.parentDOM;
        this.basketFromLocalStorage = localStorageUtil.getBasketFromLocalStorage(); // для начальной загрузки
        this.addedProducts = [];
        this.totalPrice = 0;
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
    }

    // completePurchase() {
    //     if (localStorageUtil.checkBasketFromLocalStorage()) {
    //         localStorageUtil.removeBasketFromLocalStorage();
    //         this.renderBasketItems();
    //         this.renderTotalPrice();
    //     }
    // }

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
        basketHeader.after(basketContent); // <- контент тут
        const basketTotalPrice = document.createElement("div");
        basketTotalPrice.classList.add("basket-total-price");
        basketContent.after(basketTotalPrice); // <- общая цена
        const basketBtnWrapper = document.createElement("div");
        basketBtnWrapper.classList.add("basket-btn-wrapper");
        const completeOrder = document.createElement("button");
        completeOrder.classList.add("btn-style");
        completeOrder.classList.add("btn-confirm");
        completeOrder.textContent = "Оформить заказ";
        basketBtnWrapper.prepend(completeOrder);

        basketBtnWrapper.addEventListener("click", event => {
            console.log("Ваш заказ оформлен");
            this.completePurchase();
        });
        basketTotalPrice.after(basketBtnWrapper);

        return basket;
    }

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

    addedProduct(currentProduct) {
        const foundProduct = this.addedProducts.find(
            item => item.id === currentProduct.id
        );
        if (!foundProduct) {
            this.addedProducts.push(currentProduct);
        } else {
            // меняется по ссылке
            console.log("найден");
            foundProduct.quantity += currentProduct.quantity;
            foundProduct.total +=
                currentProduct.quantity * currentProduct.price;
        }
        this.totalPrice += currentProduct.total;
    }

    deletedProduct(id) {
        const foundProduct = this.addedProducts.find(item => item.id === id);
        const foundIndex = this.addedProducts.findIndex(item => item.id === id);
        this.addedProducts.splice(foundIndex, 1);
        this.totalPrice -= foundProduct.total;
    }

    renderProductsInBasket() {
        const basketContent = document.querySelector(".basket-content");
        basketContent.innerHTML = "";
        const preparedProducts = this.addedProducts.map(product => {
            const { id, name, quantity } = product;
            return new BasketItem({ id, name, quantity });
        });
        preparedProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, basketContent); // рендер содержимого корзины
    }

    renderTotalPrice() {
        const basketContent = document.querySelector(".basket-total-price");
        basketContent.innerHTML = "";
        basketContent.append(
            new BasketTotalPrice({ totalPrice: this.totalPrice }).render()
        ); // рендер общей цены
    }

    renderBasket() {
        this.parentDOM.innerHTML = "";
        this.parentDOM.append(this.createBasket());
    }
}

const basket = new Basket({
    parentDOM: ROOT_BASKET
});

basket.renderBasket();
basket.renderTotalPrice();
