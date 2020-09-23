class BasketItem {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.quantity = props.quantity;
    }

    deleteFromBasket() {
        console.log("продукт удален", this.id);

        pubSub.fireEvent("deleteProductFromBasket", this.id); // пользовательское событие
    }

    render() {
        const basketContentItem = document.createElement("div");
        // basketContentItem.setAttribute("id", this.id);
        basketContentItem.classList.add("basket-content__items");
        const divName = document.createElement("div");

        divName.textContent = this.name;
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

//  куда будем рендерить const basketContent = document.querySelector(".basket-content");
