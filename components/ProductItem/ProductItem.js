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
        this.ROOT_MODAL_WINDOW = ROOT_MODAL_WINDOW;
        this.ingredientsRule = props.ingredientsRule;
        this.ingredientsType = ingredientsType;
    }

    // добавить в корзину
    addInBasket() {
        const product = {
            id: this.id,
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            total: this.quantity * this.price
        };
        pubSub.fireEvent("onAddProductInBasket", product); // пользовательское событие
    }

    // увеличить количество
    increaseQuantity(field) {
        this.quantity = this.quantity + 1;
        field.textContent = this.quantity;

        const product = {
            id: this.id,
            price: this.price,
            quantity: this.quantity,
            total: this.quantity * this.price,
            type: "increase"
        };

        pubSub.fireEvent("onIncreaseQuantityInBasket", product); // пользовательское событие
    }

    // уменьшить количество
    decreaseQuantity(field) {
        if (this.quantity > 1) {
            this.quantity -= 1;
            field.textContent = this.quantity;
            const product = {
                id: this.id,
                price: this.price,
                quantity: this.quantity,
                total: this.quantity * this.price,
                type: "decrease"
            };
            pubSub.fireEvent("onDecreaseQuantityInBasket", product); // пользовательское событие
        }
    }

    // открыть ммодальное окно
    openModal() {
        this.ROOT_MODAL_WINDOW.classList.add("open");
        let firstLoadCategory = ""; // для первого раза открытия модалки

        this.ingredientsType.forEach(element => {
            if (element.id === 1) {
                firstLoadCategory = element.category;
            }
        });
        const randomId = Math.floor(
            Math.random() * (Math.pow(10, 9) - 1000 + 1) + 1000
        );
        pubSub.fireEvent("openModal", {
            category: firstLoadCategory,
            nameProduct: this.name + "(компл.)",
            imageProduct: this.image,
            idProduct: this.id * randomId,
            ingredientsRule: this.ingredientsRule
        }); // пользовательское событие. передает id первого элемента из списка
    }

    // рендер
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

        if (this.type === "single") {
            descrWrapper.classList.add("single");
        }
        if (this.type === "multiple") {
            descrWrapper.classList.add("multiple");
            descrWrapper.addEventListener("click", e => {
                this.openModal();
            });
        }
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
            this.addInBasket(spanCount);
        });
        /* *** */

        return itemWrapper;
    }
}
