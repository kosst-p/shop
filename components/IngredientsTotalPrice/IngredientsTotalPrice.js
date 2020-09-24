class IngredientsTotalPrice {
    constructor() {
        this.price = "Цена: 0 руб.";
        this.ROOT_MODAL_PRICE = ROOT_MODAL_PRICE;
        pubSub.subscribeByEvent("openModal", this.render.bind(this));
    }
    createContent() {
        const span = document.createElement("span");
        span.textContent = this.price;
        return span;
    }
    render() {
        this.ROOT_MODAL_PRICE.innerHTML = "";
        this.ROOT_MODAL_PRICE.append(this.createContent());
    }
}

const ingredientsTotalPrice = new IngredientsTotalPrice();
