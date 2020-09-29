class Basket {
    constructor(props) {
        this.parentDOMTag = props.parentDOMTag;
        this.basketContentWrapper = null;
        this.basketTotalPriceWrapper = null;

        this.addedProducts = [];
        this.totalPrice = 0;

        /* добавить продукт в стор и рендер добавленного продукта */
        pubSub.subscribeByEvent("onAddProductInBasket", data => {
            this.addedProductInStore(data);
            this.renderAddedProducts();
        });
    }

    // добавление продукта в стор и обновление цены
    addedProductInStore(data) {
        console.log(data);
        console.log(this.addedProducts);
        const foundProduct = this.addedProducts.find(
            item => item.id === data.id
        );
        if (!foundProduct) {
            this.addedProducts.push(data);
        } else {
            // меняется по ссылке
            foundProduct.quantity += data.quantity;
            foundProduct.total += data.quantity * data.price;
        }
        this.totalPrice += data.total;
    }

    // рендер продуктов внутри корзины
    renderAddedProducts() {
        this.basketContentWrapper.innerHTML = "";

        const preparedProducts = this.addedProducts.map(product => {
            const { id, name, quantity, ingredients } = product;

            return new BasketItem({ id, name, quantity, ingredients });
        });
        preparedProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.basketContentWrapper);
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
        this.basketContentWrapper = basketContent;
        basketHeader.after(basketContent); // <- контент тут
        const basketTotalPrice = document.createElement("div");
        basketTotalPrice.classList.add("basket-total-price");
        this.basketTotalPriceWrapper = basketTotalPrice;
        basketContent.after(basketTotalPrice); // <- общая цена
        const basketBtnWrapper = document.createElement("div");
        basketBtnWrapper.classList.add("basket-btn-wrapper");
        const completeOrder = document.createElement("button");
        completeOrder.classList.add("btn-style");
        completeOrder.classList.add("btn-confirm");
        completeOrder.textContent = "Оформить заказ";
        basketBtnWrapper.prepend(completeOrder);

        basketBtnWrapper.addEventListener("click", event => {
            "click";
        });
        basketTotalPrice.after(basketBtnWrapper);

        return basket;
    }

    render() {
        this.parentDOMTag.append(this.createBasket());
    }
}
