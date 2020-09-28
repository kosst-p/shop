class ModalCountBlock {
    constructor(props) {
        this.ROOT_MODAL_COUNT = ROOT_MODAL_COUNT;
        this.quantity = 1;
        pubSub.subscribeByEvent("loadPreOrderLayout", this.render.bind(this));
    }

    increaseQuantity(field) {
        this.quantity = this.quantity + 1;
        field.textContent = this.quantity;
        pubSub.fireEvent("changeQuantity", {
            quantity: this.quantity
        });
    }

    decreaseQuantity(field) {
        if (this.quantity > 1) {
            this.quantity -= 1;
            field.textContent = this.quantity;
            pubSub.fireEvent("changeQuantity", {
                quantity: this.quantity
            });
        }
    }

    addInBasket(e) {
        console.log(e);
        pubSub.fireEvent("addPreOrderInBasket", { close: true });
    }

    createContent() {
        const ingredientCountWrapper = document.createElement("div");
        ingredientCountWrapper.classList.add("ingredients-wrapper__count");

        const countTitle = document.createElement("span");
        countTitle.textContent = "Количество";
        ingredientCountWrapper.prepend(countTitle);

        const ingredientCountButton = document.createElement("div");
        ingredientCountButton.classList.add("ingredients-count__button");
        countTitle.after(ingredientCountButton);

        const buttonDecrease = document.createElement("button");
        buttonDecrease.classList.add("btn-count");
        ingredientCountButton.prepend(buttonDecrease);
        const iDescr = document.createElement("i");
        iDescr.classList.add("fas");
        iDescr.classList.add("fa-minus");
        buttonDecrease.prepend(iDescr);

        const spanCount = document.createElement("span");
        spanCount.textContent = this.quantity; // тут обновляется количество
        spanCount.classList.add("ingredients-count__field");
        buttonDecrease.after(spanCount);

        const buttonIncrease = document.createElement("button");
        buttonIncrease.classList.add("btn-count");
        spanCount.after(buttonIncrease);
        const iIncr = document.createElement("i");
        iIncr.classList.add("fas");
        iIncr.classList.add("fa-plus");
        buttonIncrease.prepend(iIncr);

        const buttonBasketWrapper = document.createElement("div");
        buttonBasketWrapper.classList.add("ingredients-wrapper__inbasket");
        ingredientCountButton.after(buttonBasketWrapper);
        const buttonInBasket = document.createElement("button");
        buttonInBasket.classList.add("btn-style");
        buttonInBasket.classList.add("basket-btn-add");
        buttonInBasket.textContent = "В корзину";
        buttonBasketWrapper.prepend(buttonInBasket);

        /* Events */
        buttonIncrease.addEventListener("click", e => {
            this.increaseQuantity(spanCount);
        });

        buttonDecrease.addEventListener("click", e => {
            this.decreaseQuantity(spanCount);
        });
        buttonInBasket.addEventListener("click", e => {
            this.addInBasket(e.target);
        });
        /* *** */

        return ingredientCountWrapper;
    }

    render() {
        this.ROOT_MODAL_COUNT.innerHTML = "";
        this.quantity = 1;
        this.ROOT_MODAL_COUNT.append(this.createContent());
    }
}

const modalCountBlock = new ModalCountBlock();
