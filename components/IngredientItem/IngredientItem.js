class IngredientItem {
    constructor(props) {
        this.name = props.name;
        this.image = props.image;
        this.price = props.price;
        this.description = props.description;
        this.id = props.id;
    }

    render() {
        const ingredientWrapper = document.createElement("div");
        ingredientWrapper.classList.add("ingredient-wrapper");

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
            console.log("ingredient");
        });

        return ingredientWrapper;
    }
}
