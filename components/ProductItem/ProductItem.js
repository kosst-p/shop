class ProductItem {
    constructor(props) {
        this.id = props.id;
        this.marketImg = props.marketImg;
        this.name = props.name;
        this.description = props.description;
        this.category = props.category;
        this.image = props.image;
        this.price = props.price;
        this.type = props.type;
        this.quantity = 1;
        this.render = this.render.bind(this);
        this.increaseQuantity = this.increaseQuantity.bind(this);
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
    }

    addInBasket() {
        const product = {
            id: this.id,
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            total: this.quantity * this.price
        };
        // localStorageUtil.putDataToLocalStorage(product);
        pubSub.fireEvent("addProductInBasket", product); // пользовательское событие
    }

    increaseQuantity() {
        this.quantity = this.quantity + 1;
        console.log(this.quantity);
        const parent = document.getElementById(this.id);
        parent.replaceWith(this.render());
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity -= 1;
            const parent = document.getElementById(this.id);
            parent.replaceWith(this.render());
        }
        console.log(this.quantity);
    }

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
            this.increaseQuantity();
        });

        buttonDecrease.addEventListener("click", e => {
            this.decreaseQuantity();
        });
        buttonInBasket.addEventListener("click", e => {
            this.addInBasket();
        });
        /* *** */

        return itemWrapper;
    }
}
