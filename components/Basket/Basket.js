class Basket {
    constructor(props) {
        this.parentDOMTag = props.parentDOMTag;
        this.basketContentWrapper = null;
        this.basketTotalPriceWrapper = null;
        this.addedProducts = store.getAllProductsFromStore();
        this.totalPrice = 0;

        this.render(); // рендер

        /* подписка на добавление продукта в корзину */
        pubSub.subscribeByEvent("addProductInBasket", () => {
            this.renderAddedProducts();
            this.updateTotalPrice();
            this.renderTotalPrice();
        });

        /* подписка на изменение количества */
        pubSub.subscribeByEvent("changeQuantity", () => {
            this.renderAddedProducts();
            this.updateTotalPrice();
            this.renderTotalPrice();
        });
    }

    // обновления общей цены после добавления ингредиента
    updateTotalPrice() {
        let tmp = 0;
        console.log(this.addedProducts);
        this.addedProducts.forEach(element => {
            tmp += element.totalPrice;
        });
        this.totalPrice = tmp;
    }

    // рендер общей цены
    renderTotalPrice() {
        this.basketTotalPriceWrapper.innerHTML = "";
        const span = document.createElement("span");
        span.textContent = `Итого: ${this.totalPrice} руб.`;
        this.basketTotalPriceWrapper.append(span);
    }

    // удаление продукта из корзины
    deletedProduct(product) {
        const foundIndex = this.addedProducts.findIndex(
            item => item.id === product.id
        );
        this.addedProducts.splice(foundIndex, 1); // удалится и из store тоже

        this.updateTotalPrice();
        this.renderAddedProducts();
        this.renderTotalPrice();
    }

    // рендер продуктов внутри корзины
    renderAddedProducts() {
        this.basketContentWrapper.innerHTML = "";
        this.addedProducts.map(item => {
            const basketContentItem = document.createElement("div");
            basketContentItem.classList.add("basket-content__items");
            const divName1 = document.createElement("div");
            divName1.textContent = item.name;
            basketContentItem.prepend(divName1);
            const divCount1 = document.createElement("div");
            divCount1.textContent = item.quantity;
            divName1.after(divCount1);
            const divBtnDelete = document.createElement("div");
            const btnDelete = document.createElement("button");
            btnDelete.classList.add("btn-delete-goods");
            btnDelete.textContent = "x";
            divBtnDelete.prepend(btnDelete);
            divCount1.after(divBtnDelete);
            btnDelete.addEventListener("click", e => {
                this.deletedProduct(item);
            });
            this.basketContentWrapper.append(basketContentItem);
        });
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

    // рендер корзины со всем содержимым
    render() {
        this.parentDOMTag.append(this.createBasket());
        this.renderAddedProducts();
        this.renderTotalPrice();
    }
}

const basket = new Basket({
    parentDOMTag: ROOT_BASKET
});
