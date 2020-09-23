class Basket {
    constructor(props) {
        this.parentDOM = props.parentDOM;
        this.basketFromLocalStorage = localStorageUtil.getDataFromLocalStorage(); // для начальной загрузки
        pubSub.subscribeByEvent("inBasket", this.render.bind(this));
    }

    createContent() {
        const basketFromLS = localStorageUtil.getDataFromLocalStorage();
        const basketContent = document.querySelector(".basket-content");
        basketFromLS.forEach(item => {
            const basketContentItem = document.createElement("div");
            basketContentItem.classList.add("basket-content__items");
            const divName = document.createElement("div");
            divName.textContent = item.name;
            basketContentItem.prepend(divName);
            const divCount = document.createElement("div");
            divCount.textContent = item.quantity;
            divName.after(divCount);

            const divBtnDelete = document.createElement("div");
            const btnDelete = document.createElement("button");
            btnDelete.classList.add("btn-delete-goods");
            btnDelete.textContent = "x";
            divBtnDelete.prepend(btnDelete);
            divCount.after(divBtnDelete);

            basketContent.append(basketContentItem); // !
        });
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

    render() {
        this.parentDOM.innerHTML = "";
        this.parentDOM.appendChild(this.createBasket());
        this.createContent();
    }
}

const basket = new Basket({
    parentDOM: BASKET
});

basket.render();
