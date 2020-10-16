class ProductItem {
    constructor(props) {
        // приходящие данные
        this.eventsManager = props.eventsManager;
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.image = props.image;
        this.marketImg = props.marketImg;
        this.price = props.price;
        this.componentsRule = props.componentsRule;
        this.category = props.category;
        this.type = props.type;
        this.components = props.components;

        // пользовательские данные
        this.quantity = 1;
        this.quantityModal = 1;
        this.totalPrice = this.price; // общая цена выводится в корзине
        this.modalTotalPrice = this.price;
        this.productPriceWithIngredients = this.price;
        this.productPriceWithOutIngredients = this.price;
    }

    // увеличить количество
    increaseQuantity(field) {
        this.quantity = this.quantity + 1;
        field.textContent = this.quantity;
        this.totalPrice = this.quantity * this.price;
        this.eventsManager.fireEvent("changeQuantity"); // пользовательское событие
    }

    // уменьшить количество
    decreaseQuantity(field) {
        if (this.quantity > 1) {
            this.quantity -= 1;
            field.textContent = this.quantity;
            this.totalPrice = this.quantity * this.price;
            this.eventsManager.fireEvent("changeQuantity"); // пользовательское событие
        }
    }

    // добавить в корзину
    addInBasket() {
        this.eventsManager.fireEvent("addProductInBasket", this); // пользовательское событие
    }

    // рендер карточки
    render() {
        /* Create item */
        const itemWrapper = document.createElement("div");
        itemWrapper.classList.add("item-wrapper");
        itemWrapper.setAttribute("id", this.id);
        const marketImgWrapper = document.createElement("div");
        marketImgWrapper.classList.add("item-wrapper__img-market");
        const imgMarket = document.createElement("img");
        imgMarket.setAttribute("src", `data${this.marketImg}`);
        marketImgWrapper.prepend(imgMarket);
        itemWrapper.prepend(marketImgWrapper);
        const itemImgWrapper = document.createElement("div");
        itemImgWrapper.classList.add("item-wrapper__img");
        const img = document.createElement("img");
        img.setAttribute("src", `data${this.image}`);
        itemImgWrapper.prepend(img);
        itemWrapper.prepend(itemImgWrapper);
        marketImgWrapper.after(itemImgWrapper);
        const nameWrapper = document.createElement("div");
        nameWrapper.classList.add("item-wrapper__name");
        nameWrapper.textContent = this.name;
        itemImgWrapper.after(nameWrapper);
        const descrWrapper = document.createElement("div");

        // модалка
        if (this.type === "single") {
            descrWrapper.classList.add("single");
        }
        if (this.type === "multiple") {
            descrWrapper.classList.add("multiple");
            descrWrapper.addEventListener("click", e => {
                this.eventsManager.fireEvent("openModal", this); // пользовательское событие
            });
        }
        //

        descrWrapper.classList.add("item-wrapper__description");
        descrWrapper.setAttribute("data-atr", this.type);
        descrWrapper.textContent = this.description;
        nameWrapper.after(descrWrapper);
        const priceWrapper = document.createElement("div");
        priceWrapper.classList.add("item-wrapper__price");
        priceWrapper.textContent = `Цена: ${this.price} руб.`;
        descrWrapper.after(priceWrapper);
        const countItemWrapper = document.createElement("div");
        countItemWrapper.classList.add("item-wrapper__count");
        priceWrapper.after(countItemWrapper);
        const countTitle = document.createElement("span");
        countTitle.textContent = "Количество";
        countItemWrapper.prepend(countTitle);
        const countButtonWrapper = document.createElement("div");
        countButtonWrapper.classList.add("item-count__button");
        countTitle.after(countButtonWrapper);
        const buttonDecrease = document.createElement("button");
        buttonDecrease.classList.add("btn-count");
        countButtonWrapper.prepend(buttonDecrease);
        const founIdescr = document.createElement("i");
        founIdescr.classList.add("fas");
        founIdescr.classList.add("fa-minus");
        buttonDecrease.prepend(founIdescr);
        const spanCount = document.createElement("span");
        spanCount.textContent = this.quantity; // тут обновляется количество
        spanCount.classList.add("item-count__field");
        buttonDecrease.after(spanCount);
        const buttonIncrease = document.createElement("button");
        buttonIncrease.classList.add("btn-count");
        spanCount.after(buttonIncrease);
        const founIinrc = document.createElement("i");
        founIinrc.classList.add("fas");
        founIinrc.classList.add("fa-plus");
        buttonIncrease.prepend(founIinrc);
        const buttonBasketWrapper = document.createElement("div");
        buttonBasketWrapper.classList.add("item-wrapper__inbasket");
        countButtonWrapper.after(buttonBasketWrapper);
        const buttonInBasket = document.createElement("button");
        buttonInBasket.classList.add("btn-style");
        buttonInBasket.classList.add("basket-btn-add");
        buttonInBasket.textContent = "В корзину";
        buttonBasketWrapper.prepend(buttonInBasket);
        /* *** */

        /* Events */
        buttonIncrease.addEventListener("click", e => {
            this.increaseQuantity(spanCount);
        });
        buttonDecrease.addEventListener("click", e => {
            this.decreaseQuantity(spanCount);
        });
        buttonInBasket.addEventListener("click", e => {
            this.addInBasket();
        });
        /* *** */

        return itemWrapper;
    }
}
export default ProductItem;
