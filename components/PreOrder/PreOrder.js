class PreOrder {
    constructor() {
        this.ROOT_INGREDIENTS_WRAPPER = ROOT_INGREDIENTS_WRAPPER;
        this.image = "";
        this.nameProduct = "";
        this.idProduct = "";
        pubSub.subscribeByEvent("loadPreOrderLayout", this.render.bind(this));
        pubSub.subscribeByEvent(
            "openModal",
            this.getInfoAboutProduct.bind(this)
        );
        this.preOrder = {
            ingredients: {
                sizes: [],
                breads: [],
                vegetables: [],
                sauces: [],
                fillings: []
            }
        };
        this.collectionRule = "";
        pubSub.subscribeByEvent(
            "onAddInPreOrder",
            this.addedInPreOrder.bind(this)
        );
    }

    getInfoAboutProduct(params) {
        this.idProduct = params.idProduct;
        this.image = params.image;
        this.nameProduct = params.nameProduct;
        this.collectionRule = params.collectionRule;
    }

    addedInPreOrder(params) {
        // console.log(params);
        // console.log(this.preOrder);
        // console.log(this.collectionRule);
        // console.log(params.typeOfIngredient);
        if (
            this.preOrder.ingredients[params.typeOfIngredient].length <
            this.collectionRule[params.typeOfIngredient]
        )
            this.preOrder.ingredients[params.typeOfIngredient].push(
                params.name
            );
        // this.preOrder.ingredients[params.typeOfIngredient].push(params.name);
        console.log(this.preOrder);
    }

    createContent() {
        const preOrderWrapper = document.createElement("div");
        preOrderWrapper.classList.add("preorder-wrapper");
        const preOrderWrapperImg = document.createElement("div");
        preOrderWrapperImg.classList.add("preorder-wrapper_img");
        const img = document.createElement("img");
        img.setAttribute("src", `data${this.image}`); // img
        preOrderWrapperImg.prepend(img);
        preOrderWrapper.prepend(preOrderWrapperImg);
        const preOrderWrapperContent = document.createElement("div");
        preOrderWrapperContent.classList.add("preorder-wrapper_content");
        preOrderWrapperImg.after(preOrderWrapperContent);
        const preOrderWrapperTitle = document.createElement("div");
        preOrderWrapperTitle.classList.add("preorder-wrapper_title");
        preOrderWrapperTitle.textContent = "Ваш сендвич готов!"; // титл
        preOrderWrapperContent.prepend(preOrderWrapperTitle);
        const preOrderWrapperSize = document.createElement("div");
        preOrderWrapperSize.classList.add("preorder-wrapper_sizes");
        preOrderWrapperSize.textContent = "Размер: "; // размер
        preOrderWrapperTitle.after(preOrderWrapperSize);
        const preOrderWrapperBread = document.createElement("div");
        preOrderWrapperBread.classList.add("preorder-wrapper_bread");
        preOrderWrapperBread.textContent = "Хлеб: "; // хлеб
        preOrderWrapperSize.after(preOrderWrapperBread);
        const preOrderWrapperVeg = document.createElement("div");
        preOrderWrapperVeg.classList.add("preorder-wrapper_vegetables");
        preOrderWrapperVeg.textContent = "Овощи: "; // овощи
        preOrderWrapperBread.after(preOrderWrapperVeg);
        const preOrderWrapperSauces = document.createElement("div");
        preOrderWrapperSauces.classList.add("preorder-wrapper_sauces");
        preOrderWrapperSauces.textContent = "Соусы: "; // соусы
        preOrderWrapperVeg.after(preOrderWrapperSauces);
        const preOrderWrapperFillings = document.createElement("div");
        preOrderWrapperFillings.classList.add("preorder-wrapper_fillings");
        preOrderWrapperFillings.textContent = "Начинка: "; // начинка
        preOrderWrapperSauces.after(preOrderWrapperFillings);
        const preOrderWrapperProdName = document.createElement("div");
        preOrderWrapperProdName.classList.add("preorder-wrapper_productname");
        preOrderWrapperProdName.textContent = `${this.nameProduct} + id:${this.idProduct}`; // имя
        preOrderWrapperFillings.after(preOrderWrapperProdName);
        return preOrderWrapper;
    }

    render() {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        this.ROOT_INGREDIENTS_WRAPPER.append(this.createContent());
    }
}

const preOrder = new PreOrder();
