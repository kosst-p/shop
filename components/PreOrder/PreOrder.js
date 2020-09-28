class PreOrder {
    constructor() {
        this.ROOT_INGREDIENTS_WRAPPER = ROOT_INGREDIENTS_WRAPPER;
        this.preOrder = null;
        pubSub.subscribeByEvent(
            "passPreOrder",
            this.onPassedPreOrder.bind(this)
        );
        pubSub.subscribeByEvent("loadPreOrderLayout", this.render.bind(this));
    }

    onPassedPreOrder(data) {
        this.preOrder = data;
        console.log(this.preOrder);
    }

    createContent() {
        const {
            idProduct,
            nameProduct,
            imageProduct,
            ingredients: { sizes, breads, vegetables, sauces, fillings }
        } = this.preOrder;

        const preOrderWrapper = document.createElement("div");
        preOrderWrapper.classList.add("preorder-wrapper");
        const preOrderWrapperImg = document.createElement("div");
        preOrderWrapperImg.classList.add("preorder-wrapper_img");
        const img = document.createElement("img");
        img.setAttribute("src", `data${imageProduct}`); // img
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
        preOrderWrapperSize.textContent = `Размер: ${sizes.join(", ")}`; // размер
        preOrderWrapperTitle.after(preOrderWrapperSize);
        const preOrderWrapperBread = document.createElement("div");
        preOrderWrapperBread.classList.add("preorder-wrapper_bread");
        preOrderWrapperBread.textContent = `Хлеб:  ${breads.join(", ")}`; // хлеб
        preOrderWrapperSize.after(preOrderWrapperBread);
        const preOrderWrapperVeg = document.createElement("div");
        preOrderWrapperVeg.classList.add("preorder-wrapper_vegetables");
        preOrderWrapperVeg.textContent = `Овощи: ${vegetables.join(", ")}`; // овощи
        preOrderWrapperBread.after(preOrderWrapperVeg);
        const preOrderWrapperSauces = document.createElement("div");
        preOrderWrapperSauces.classList.add("preorder-wrapper_sauces");
        preOrderWrapperSauces.textContent = `Соусы: ${sauces.join(", ")}`; // соусы
        preOrderWrapperVeg.after(preOrderWrapperSauces);
        const preOrderWrapperFillings = document.createElement("div");
        preOrderWrapperFillings.classList.add("preorder-wrapper_fillings");
        preOrderWrapperFillings.textContent = `Начинка: ${fillings.join(", ")}`; // начинка
        preOrderWrapperSauces.after(preOrderWrapperFillings);
        const preOrderWrapperProdName = document.createElement("div");
        preOrderWrapperProdName.classList.add("preorder-wrapper_productname");
        preOrderWrapperProdName.textContent = `${nameProduct}`; // имя
        preOrderWrapperFillings.after(preOrderWrapperProdName);
        return preOrderWrapper;
    }

    render() {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        this.ROOT_INGREDIENTS_WRAPPER.append(this.createContent());
    }
}

const preOrder = new PreOrder();
