class IngredientItem {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.image = props.image;
        this.price = props.price;
    }

    // addIngredientInPreOrder() {
    //     pubSub.fireEvent("onAddInPreOrder", {
    //         name: this.name,
    //         category: this.category,
    //         price: this.price,
    //         id: this.id
    //     }); // пользовательское событие
    // }

    // для ререндара
    checkAddedIngredients(params) {
        console.log(params);
        // if (this.id === params.id) {
        //     this.checkedCurrentItem = params.added;
        // }
        // console.log(params); // передается true или false
        // debugger;
        // this.checkedCurrentItem = params;
        // console.log("return info about added item");
        // const currentCard = document.getElementById(`${this.id}-${this.name}`);
        // console.log(currentCard);
        // ROOT_INGREDIENTS_WRAPPER.replaceChild(this.render(), currentCard);
        // currentCard.classList.add("active-name-ingredient");
    }

    render() {
        const ingredientWrapper = document.createElement("div");
        ingredientWrapper.classList.add("ingredient-wrapper");

        // if (this.changedIngredients.includes(this.name)) {
        //     ingredientWrapper.classList.add("active-name-ingredient");
        // }

        // if (this.checkedCurrentItem) {
        //     console.log("check");
        //     ingredientWrapper.classList.add("active-name-ingredient");
        // }

        const ingredientWrapperImg = document.createElement("div");
        ingredientWrapperImg.classList.add("ingredient-wrapper__img");
        const img = document.createElement("img");
        img.setAttribute("src", `data${this.image}`); // img
        ingredientWrapperImg.prepend(img);
        ingredientWrapper.prepend(ingredientWrapperImg);

        const ingredientWrapperName = document.createElement("div");
        ingredientWrapperName.classList.add("ingredient-wrapper__name");
        ingredientWrapperName.textContent = this.name; // name
        ingredientWrapperImg.after(ingredientWrapperName);

        const ingredientWrapperDescr = document.createElement("div");
        ingredientWrapperDescr.classList.add("ingredient-wrapper__description");
        ingredientWrapperDescr.textContent = this.description; // descr
        ingredientWrapperName.after(ingredientWrapperDescr);

        const ingredientWrapperPrice = document.createElement("div");
        ingredientWrapperPrice.classList.add("ingredient-wrapper__price");
        ingredientWrapperPrice.textContent = `Цена: ${this.price} руб.`; // price
        ingredientWrapperDescr.after(ingredientWrapperPrice);

        ingredientWrapper.addEventListener("click", e => {
            this.addIngredientInPreOrder();
        });
        return ingredientWrapper;
    }
}
