class BasketItem {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.quantity = props.quantity;
        this.ingredients = props.ingredients;
    }

    deleteFromBasket() {
        pubSub.fireEvent("onDeleteProductFromBasket", this.id); // пользовательское событие
    }

    createIngredientsContent() {
        let ingredients = "";

        for (const key in this.ingredients) {
            if (this.ingredients[key].length) {
                ingredients += this.ingredients[key].join(", ") + ", ";
            }
        }

        const ingredientsContent = document.createElement("span");
        ingredientsContent.classList.add("basket-ingredients");
        ingredientsContent.textContent = ingredients;
        return ingredientsContent;
    }

    render() {
        const basketContentItem = document.createElement("div");
        basketContentItem.classList.add("basket-content__items");
        const divName = document.createElement("div");

        divName.textContent = this.name;
        if (this.ingredients) {
            divName.append(this.createIngredientsContent());
        }
        basketContentItem.prepend(divName);
        const divCount = document.createElement("div");
        divCount.textContent = this.quantity;
        divName.after(divCount);
        const divBtnDelete = document.createElement("div");
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn-delete-goods");
        btnDelete.textContent = "x";
        divBtnDelete.prepend(btnDelete);
        divCount.after(divBtnDelete);
        btnDelete.addEventListener("click", e => {
            this.deleteFromBasket();
        });

        return basketContentItem;
    }
}
