class IngredientItem {
    constructor(props) {
        this.pubSub = props.pubSub;
        this.code = props.code;
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.image = props.image;
        this.price = props.price;
        this.category = props.category;
        this.currentIngredientWrapper = null;
    }

    // событие на выбор ингредиента
    updateIngredient() {
        this.pubSub.fireEvent("addIngredient", this); // пользовательское событие
    }

    // установить активный класс по клику
    addActiveClass() {
        this.currentIngredientWrapper.classList.add("active-name-ingredient");
    }

    // удалить активный класс по клику
    deleteActiveClass() {
        this.currentIngredientWrapper.classList.remove(
            "active-name-ingredient"
        );
    }

    render() {
        const ingredientWrapper = document.createElement("div");
        ingredientWrapper.classList.add("ingredient-wrapper");

        this.currentIngredientWrapper = ingredientWrapper;
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
            this.updateIngredient();
        });
        return ingredientWrapper;
    }
}

export default IngredientItem;