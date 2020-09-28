class IngredientsTotalPrice {
    constructor() {
        this.price = 0;
        this.ROOT_MODAL_PRICE = ROOT_MODAL_PRICE;
        pubSub.subscribeByEvent("openModal", this.render.bind(this));
        pubSub.subscribeByEvent(
            "showPreOrderTotalPrice",
            this.replaceTotalPrice.bind(this)
        );
        pubSub.subscribeByEvent(
            "showPreOrderTotalPrice",
            this.render.bind(this)
        );
        pubSub.subscribeByEvent(
            "updatePrice",
            this.replaceTotalPrice.bind(this)
        );

        pubSub.subscribeByEvent("updatePrice", this.render.bind(this));

        pubSub.subscribeByEvent(
            "onCloseModal",
            this.replaceTotalPrice.bind(this)
        );
        pubSub.subscribeByEvent("onCloseModal", this.render.bind(this));
    }

    replaceTotalPrice(params) {
        this.price = params.price;
    }

    createContent() {
        const span = document.createElement("span");
        span.textContent = `Цена: ${this.price} руб.`;

        return span;
    }
    render() {
        this.ROOT_MODAL_PRICE.innerHTML = "";
        this.ROOT_MODAL_PRICE.append(this.createContent());
    }
}

const ingredientsTotalPrice = new IngredientsTotalPrice();
