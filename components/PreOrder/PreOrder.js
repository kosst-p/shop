class PreOrder {
    constructor() {
        this.ROOT_INGREDIENTS_WRAPPER = ROOT_INGREDIENTS_WRAPPER;

        pubSub.subscribeByEvent("loadPreOrderLayout", this.render.bind(this));
    }

    createContent() {
        const preOrderWrapper = document.createElement("div");
        preOrderWrapper.classList.add("preorder-wrapper");
        const preOrderWrapperImg = document.createElement("div");
        preOrderWrapperImg.classList.add("preorder-wrapper_img");
        const img = document.createElement("img");
        img.setAttribute("src", "source"); // img
        preOrderWrapperImg.prepend(img);
        preOrderWrapper.prepend(preOrderWrapperImg);
        const preOrderWrapperContent = document.createElement("div");
        preOrderWrapperContent.classList.add("preorder-wrapper_content");
        preOrderWrapperImg.after(preOrderWrapperContent);
        const preOrderWrapperTitle = document.createElement("div");
        preOrderWrapperTitle.classList.add("preorder-wrapper_title");
        preOrderWrapperTitle.textContent = "Ваш сендвич готов"; // титл
        preOrderWrapperContent.prepend(preOrderWrapperTitle);
        const preOrderWrapperSize = document.createElement("div");
        preOrderWrapperSize.classList.add("preorder-wrapper_sizes");
        preOrderWrapperSize.textContent = "Размер"; // размер
        preOrderWrapperTitle.after(preOrderWrapperSize);
        const preOrderWrapperBread = document.createElement("div");
        preOrderWrapperBread.classList.add("preorder-wrapper_bread");
        preOrderWrapperBread.textContent = "Хлеб"; // хлеб
        preOrderWrapperSize.after(preOrderWrapperBread);
        const preOrderWrapperVeg = document.createElement("div");
        preOrderWrapperVeg.classList.add("preorder-wrapper_vegetables");
        preOrderWrapperVeg.textContent = "Овощи"; // овощи
        preOrderWrapperBread.after(preOrderWrapperVeg);
        const preOrderWrapperSauces = document.createElement("div");
        preOrderWrapperSauces.classList.add("preorder-wrapper_sauces");
        preOrderWrapperSauces.textContent = "Соусы"; // соусы
        preOrderWrapperVeg.after(preOrderWrapperSauces);
        const preOrderWrapperFillings = document.createElement("div");
        preOrderWrapperFillings.classList.add("preorder-wrapper_fillings");
        preOrderWrapperFillings.textContent = "Начинка"; // начинка
        preOrderWrapperSauces.after(preOrderWrapperFillings);
        const preOrderWrapperProdName = document.createElement("div");
        preOrderWrapperProdName.classList.add("preorder-wrapper_productname");
        preOrderWrapperProdName.textContent = "Имя продукта"; // имя
        preOrderWrapperFillings.after(preOrderWrapperProdName);
        return preOrderWrapper;
    }

    render() {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        this.ROOT_INGREDIENTS_WRAPPER.append(this.createContent());
    }
}

const preOrder = new PreOrder();
