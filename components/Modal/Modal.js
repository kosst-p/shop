class Modal {
    constructor(props) {
        this.ROOT_MODAL_WINDOW = document.querySelector(".modal");
        this.ROOT_MODAL_TITLE = document.querySelector(".modal-title");
        this.ROOT_MODAL_PRICE = document.querySelector(".modal-price");
        this.ROOT_MODAL_BUTTONS_WRAPPER = document.querySelector(
            ".modal-buttons-wrapper"
        );
        this.ROOT_INGREDIENT_TYPES = document.querySelector(
            ".ingredient-types"
        );

        this.ROOT_INGREDIENTS_WRAPPER = document.querySelector(
            ".ingredients-wrapper"
        );
        this.ROOT_MODAL_COUNT = document.querySelector(".modal-count");

        this.closeBtn = document.querySelector(".modal-close-btn");
        this.ingredientsListWrapper = null;
        this.ingredientsType = props.ingredientsType;
        this.modalTitle = "";
        // this.modalTotalPrice = 0;
        // this.modalQuantity = 1;
        this.buttonPrev = null;
        this.buttonNext = null;
        this.currentProduct = null;
        /* открытие модального окна*/
        pubSub.subscribeByEvent("openModal", data => {
            this.isModalOpen(data);
        });

        pubSub.subscribeByEvent("addIngredient", () => {
            setTimeout(() => {
                this.renderModalTotalPrice();
            }, 1);
        });
    }

    eventCloseModal() {
        this.closeBtn.addEventListener("click", e => {
            pubSub.fireEvent("closedModal", this); // пользовательское событие
        });
    }

    isModalOpen(data) {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        this.currentProduct = data; // продукт в котором открыли модальное окно
        // this.modalTotalPrice = this.currentProduct.totalPrice;
        // this.modalQuantity = this.currentProduct.quantity;
        this.ROOT_MODAL_WINDOW.classList.add("open");
        this.ingredientsType.forEach(element => {
            if (element.id === 1) {
                this.modalTitle = element.title;
            }
        });
        this.renderModalTitle();
        this.renderModalTotalPrice();
        this.renderButtonPrev();
        this.renderButtonNext();
        this.renderIngredientTypesList();
    }

    close() {
        this.ROOT_MODAL_WINDOW.classList.remove("open");
        this.ROOT_MODAL_TITLE.innerHTML = "";
        this.ROOT_MODAL_PRICE.innerHTML = "";
        this.ROOT_MODAL_BUTTONS_WRAPPER.innerHTML = "";
        this.ROOT_INGREDIENT_TYPES.innerHTML = "";
        this.ROOT_MODAL_COUNT.innerHTML = "";
    }

    /* Заголовок модального окна */
    changeModalTitle(value) {
        this.modalTitle = value;
    }
    renderModalTitle() {
        this.ROOT_MODAL_TITLE.innerHTML = "";
        const span = document.createElement("span");
        span.textContent = this.modalTitle;
        this.ROOT_MODAL_TITLE.append(span);
    }
    /* ***** */

    /* Итоговая цена в модальном окне */
    // changeModalTotalPrice() {
    //     console.log(this.currentProduct.totalPrice);
    //     console.log(this.modalTotalPrice);
    //     this.modalTotalPrice = this.currentProduct.totalPrice;
    //     console.log(this.currentProduct.totalPrice);
    //     console.log(this.modalTotalPrice);
    // }

    renderModalTotalPrice() {
        this.ROOT_MODAL_PRICE.innerHTML = "";
        const span = document.createElement("span");
        span.textContent = `Цена: ${this.currentProduct.totalPrice} руб.`;
        this.ROOT_MODAL_PRICE.append(span);
    }
    /* ***** */

    /* Кнопки вперед\назад в модальном окне */
    // кнопка Назад
    renderButtonPrev() {
        const prev = document.createElement("button");
        prev.classList.add("btn-style");
        prev.classList.add("btn-modal");
        prev.classList.add("prev");
        prev.classList.add("disabled");
        prev.addEventListener("click", e => {
            this.prevIngredientType();
        });
        const arrow = document.createElement("i");
        arrow.classList.add("fas");
        arrow.classList.add("fa-chevron-left");
        prev.textContent = "Назад";
        prev.prepend(arrow);
        this.buttonPrev = prev;
        this.ROOT_MODAL_BUTTONS_WRAPPER.append(prev);
    }

    prevIngredientType() {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        this.ROOT_MODAL_COUNT.innerHTML = "";
        const list = this.ingredientsListWrapper.childNodes;
        for (let i = 0; i < list.length; i++) {
            if (
                list[i].classList.contains("active-ingredient") &&
                list[i - 1]
            ) {
                list[i].classList.remove("active-ingredient");
                list[i].removeAttribute("class");
                list[i - 1].classList.add("active-ingredient");
                const params = this.ingredientTypeParams(i);
                const { title, id, category } = params;
                // условие для последнего элемента списка
                if (id !== list.length) {
                    pubSub.fireEvent("ingredientTypeChange", { category }); // пользовательское событие
                    this.buttonNext.classList.remove("disabled");
                }
                // условие для первого элемента списка
                if (i === 1 && id === 1) {
                    this.buttonPrev.classList.add("disabled");
                }
                this.changeModalTitle(title);
                this.renderModalTitle();
                break;
            }
        }
    }

    // создание кнопка Вперед
    renderButtonNext() {
        const next = document.createElement("button");
        next.classList.add("btn-style");
        next.classList.add("btn-modal");
        next.classList.add("next");
        next.addEventListener("click", e => {
            this.nextIngredientType();
        });
        const arrow = document.createElement("i");
        arrow.classList.add("fas");
        arrow.classList.add("fa-chevron-right");
        next.textContent = "Вперед";
        next.append(arrow);
        this.buttonNext = next;
        this.ROOT_MODAL_BUTTONS_WRAPPER.append(next);
    }

    nextIngredientType() {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        const list = this.ingredientsListWrapper.childNodes;
        for (let i = 0; i < list.length; i++) {
            if (
                list[i].classList.contains("active-ingredient") &&
                list[i + 1]
            ) {
                list[i].classList.remove("active-ingredient");
                list[i].removeAttribute("class");
                list[i + 1].classList.add("active-ingredient");
                const params = this.ingredientTypeParams(i + 2); // +2 так как цикл for начинается с 0
                const { title, id, category } = params;
                if (id === list.length) {
                    //условие для последнего элемента списка
                    this.renderQuantityBlock();
                    this.buttonNext.classList.add("disabled");
                } else {
                    pubSub.fireEvent("ingredientTypeChange", { category }); // пользовательское событие
                    this.buttonPrev.classList.remove("disabled");
                }
                this.changeModalTitle(title);
                this.renderModalTitle();
                break;
            }
        }
    }

    ingredientTypeParams(id) {
        const params = {};
        for (let i = 0; i < this.ingredientsType.length; i++) {
            if (id === this.ingredientsType[i].id) {
                params.title = this.ingredientsType[i].title;
                params.id = this.ingredientsType[i].id;
                params.category = this.ingredientsType[i].category;
                break;
            }
        }
        return params;
    }
    /* ***** */

    /* Список типов ингредиентов */
    renderIngredientTypesList() {
        // ul
        const ul = document.createElement("ul");
        ul.classList.add("ingredients-list");
        this.ingredientsListWrapper = ul;
        this.ROOT_INGREDIENT_TYPES.appendChild(ul); // добавил ul в DOM

        this.ingredientsType.map(item => {
            const { id, name, title, category } = item;
            let li = document.createElement("li");
            if (id === 1) {
                li.classList.add("active-ingredient");
            }
            ul.append(li); // добавили li в ul
            li.textContent = name;
            li.addEventListener("click", event => {
                this.switchActiveClass(
                    event.target,
                    "active-ingredient",
                    this.ingredientsListWrapper
                );
                this.ingredientTypeChangeByClick(id, category);
                this.changeModalTitle(title);
                this.renderModalTitle();
            });
        });
    }

    ingredientTypeChangeByClick(id, category) {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        this.ROOT_MODAL_COUNT.innerHTML = "";
        // условие для последнего элемента списка
        if (id === this.ingredientsType.length) {
            // this.renderOrderList();
            this.renderQuantityBlock();
            pubSub.fireEvent("orderListRender", this);
            this.buttonNext.classList.add("disabled");
        } else {
            pubSub.fireEvent("ingredientTypeChange", { category });
            this.buttonNext.classList.remove("disabled");
        }
        if (id === 1) {
            this.buttonPrev.classList.add("disabled");
        } else {
            this.buttonPrev.classList.remove("disabled");
        }
    }

    // смена активного класса
    switchActiveClass(element, className, domElem) {
        domElem.childNodes.forEach(el => {
            el.classList.remove(className);
            el.removeAttribute("class");
        });
        element.classList.add(className);
    }
    /* ***** */

    /* Блок изменение количества и добавить в корзину */
    renderQuantityBlock() {
        this.ROOT_MODAL_COUNT.innerHTML = "";
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
        spanCount.textContent = this.currentProduct.quantity; // тут обновляется количество
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
            this.addInBasket();
        });
        /* *** */
        this.ROOT_MODAL_COUNT.append(ingredientCountWrapper);
    }

    // увеличить количество
    increaseQuantity(field) {
        console.log(this.currentProduct.priceWithIngredients);
        this.currentProduct.quantity += 1;

        field.textContent = this.currentProduct.quantity;

        let tmp =
            this.currentProduct.priceWithIngredients *
            this.currentProduct.quantity;
        this.currentProduct.totalPrice = tmp;

        this.renderModalTotalPrice();
        pubSub.fireEvent("changeQuantity", {
            currentProd: this.currentProduct,
            increase: "increase"
        }); // пользовательское событие

        // console.log("from modal", this.currentProduct.totalPrice);
    }

    // уменьшить количество
    decreaseQuantity(field) {
        if (this.currentProduct.quantity > 1) {
            this.currentProduct.quantity -= 1;
            field.textContent = this.currentProduct.quantity;

            let tmp =
                this.currentProduct.priceWithIngredients *
                this.currentProduct.quantity;
            this.currentProduct.totalPrice = tmp;

            this.renderModalTotalPrice();
            pubSub.fireEvent("changeQuantity", {
                currentProd: this.currentProduct,
                decrease: "decrease"
            }); // пользовательское событие
            // console.log("from modal", this.currentProduct.totalPrice);
        }
    }

    addInBasket() {
        pubSub.fireEvent("addProductInBasket", this.currentProduct); // пользовательское событие
    }
    /* ***** */

    /* Блок заказа */
    renderOrderList(params) {
        const {
            name,
            image,
            ingredients: { sizes, breads, vegetables, sauces, fillings }
        } = params;
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        const preOrderWrapper = document.createElement("div");
        preOrderWrapper.classList.add("preorder-wrapper");
        const preOrderWrapperImg = document.createElement("div");
        preOrderWrapperImg.classList.add("preorder-wrapper_img");
        const img = document.createElement("img");
        img.setAttribute("src", `data${image}`); // img
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
        preOrderWrapperSize.textContent = `Размер: ${sizes}`; // размер
        preOrderWrapperTitle.after(preOrderWrapperSize);
        const preOrderWrapperBread = document.createElement("div");
        preOrderWrapperBread.classList.add("preorder-wrapper_bread");
        preOrderWrapperBread.textContent = `Хлеб:  ${breads}`; // хлеб
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
        preOrderWrapperProdName.textContent = `${name}`; // имя
        preOrderWrapperFillings.after(preOrderWrapperProdName);

        this.ROOT_INGREDIENTS_WRAPPER.append(preOrderWrapper);
    }
    /* ***** */
}

const modal = new Modal({
    ingredientsType: ingredientsType
});
modal.eventCloseModal();
