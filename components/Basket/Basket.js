class Basket {
    constructor(props) {
        this.parentDOM = props.parentDOM;
        this.basketFromLocalStorage = localStorageUtil.getDataFromLocalStorage(); // для начальной загрузки
        pubSub.subscribeByEvent(
            "addProductInBasket",
            this.renderBasketItems.bind(this)
        );
        pubSub.subscribeByEvent(
            "deleteProductFromBasket",
            this.renderBasketItems.bind(this)
        );
    }

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

        basketHeader.after(basketContent); //TODO
        const basketTotalPrice = document.createElement("div");
        basketTotalPrice.classList.add("basket-total-price");
        basketTotalPrice.textContent = "Итого: 111 руб.";
        basketContent.after(basketTotalPrice);
        const basketBtnWrapper = document.createElement("div");
        basketBtnWrapper.classList.add("basket-btn-wrapper");
        const completeOrder = document.createElement("button");
        completeOrder.classList.add("btn-style");
        completeOrder.classList.add("btn-confirm");
        completeOrder.textContent = "Оформить заказ";
        basketBtnWrapper.prepend(completeOrder);

        basketBtnWrapper.addEventListener("click", event => {
            console.log("Ваш заказ оформлен");
        });
        basketTotalPrice.after(basketBtnWrapper);

        return basket;
    }

    renderBasketItems() {
        const basketFromLS = localStorageUtil.getDataFromLocalStorage();
        const basketContent = document.querySelector(".basket-content");
        basketContent.innerHTML = "";
        const basketContentItems = basketFromLS.map(element => {
            const { id, name, quantity } = element;
            return new BasketItem({ id, name, quantity });
        });

        basketContentItems.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, basketContent); // рендер содержимого корзины
    }

    renderBasket() {
        this.parentDOM.innerHTML = "";
        this.parentDOM.appendChild(this.createBasket());
    }
}

const basket = new Basket({
    parentDOM: BASKET
});

basket.renderBasket();
basket.renderBasketItems();
