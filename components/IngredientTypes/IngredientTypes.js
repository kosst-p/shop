class IngredientTypes {
    constructor(props) {
        this.ROOT_INGREDIENT_TYPES = props.ROOT_INGREDIENT_TYPES;
        this.ROOT_MODAL_BUTTONS_WRAPPER = props.ROOT_MODAL_BUTTONS_WRAPPER;
        this.ingredientsArray = props.ingredientsArray;
        this.ulClassName = props.ulClassName;
        pubSub.subscribeByEvent(
            "openModal",
            this.renderIngredientTypes.bind(this)
        );
        this.ROOT_INGREDIENTS_WRAPPER = ROOT_INGREDIENTS_WRAPPER;
        this.ROOT_MODAL_COUNT = ROOT_MODAL_COUNT;
        this.ROOT_INGREDIENTS_LIST = null;
        this.buttonNext = null;
        this.buttonPrev = null;
    }

    // создание ul
    createList() {
        const ul = document.createElement("ul");
        ul.classList.add(this.ulClassName);
        this.ROOT_INGREDIENT_TYPES.appendChild(ul); // добавил в DOM
        this.ROOT_INGREDIENTS_LIST = ul;
    }

    // создание li и добавление в ul
    createListItems() {
        this.ingredientsArray.map((item, index) => {
            const { id, name, title, category } = item;
            let li = document.createElement("li");
            li.setAttribute("data-id", id);
            if (index === 0) {
                li.classList.add("active-ingredient");
            }
            this.ROOT_INGREDIENTS_LIST.appendChild(li); // добавил в ul
            li.textContent = name;
            li.addEventListener("click", event => {
                this.changeIngredientTypesByClick(
                    event,
                    title,
                    index,
                    id,
                    this.ROOT_INGREDIENTS_LIST,
                    category
                );
            });
        });
    }

    // событие клика на li с сменой активного класса
    changeIngredientTypesByClick(event, title, index, id, domElem, category) {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        this.ROOT_MODAL_COUNT.innerHTML = "";
        // условие для последнего элемента списка
        if (index === this.ingredientsArray.length - 1) {
            pubSub.fireEvent("loadPreOrderLayout", { title });
            this.buttonNext.classList.add("disabled");
        } else {
            pubSub.fireEvent("ingredientTypeChanged", { id, title, category }); // пользовательское событие
            this.buttonNext.classList.remove("disabled");
        }
        // условие для первого элемента списка
        if (index === 0) {
            this.buttonPrev.classList.add("disabled");
        } else {
            this.buttonPrev.classList.remove("disabled");
        }
        this.switchActiveClass(event.target, "active-ingredient", domElem);
    }

    // смена активного класса
    switchActiveClass(element, className, domElem) {
        domElem.childNodes.forEach(el => {
            el.classList.remove(className);
            el.removeAttribute("class");
        });
        element.classList.add(className);
    }

    // создание кнопки Назад
    createButtonPrev() {
        const prev = document.createElement("button");
        prev.classList.add("btn-style");
        prev.classList.add("btn-modal");
        prev.classList.add("prev");
        prev.classList.add("disabled");
        prev.addEventListener("click", e => {
            this.prevIngredientType(e);
        });
        const arrow = document.createElement("i");
        arrow.classList.add("fas");
        arrow.classList.add("fa-chevron-left");
        prev.textContent = "Назад";
        prev.prepend(arrow);
        this.buttonPrev = prev;
        return prev;
    }
    // событие клика на кнопке Назад
    prevIngredientType(e) {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        this.ROOT_MODAL_COUNT.innerHTML = "";
        const list = this.ROOT_INGREDIENTS_LIST.childNodes;
        for (let i = 0; i < list.length; i++) {
            if (
                list[i].classList.contains("active-ingredient") &&
                list[i - 1]
            ) {
                const prevId = list[i - 1].getAttribute("data-id");
                const params = this.ingredientTypeParams(prevId); // узнать предыдущий index и title и category
                const { title, index, category } = params;
                list[i].classList.remove("active-ingredient");
                list[i - 1].classList.add("active-ingredient");
                list[i].removeAttribute("class");

                // условие для последнего элемента списка
                if (index !== list.length - 1) {
                    this.buttonNext.classList.remove("disabled");
                    pubSub.fireEvent("ingredientTypeChanged", {
                        id: prevId,
                        title,
                        category
                    });
                }

                // условие для первого элемента списка
                if (i - 1 === 0 && index === 0) {
                    e.target.classList.add("disabled");
                }
                break;
            }
        }
    }
    // создание кнопки Вперед
    createButtonNext() {
        const next = document.createElement("button");
        next.classList.add("btn-style");
        next.classList.add("btn-modal");
        next.classList.add("next");
        next.addEventListener("click", e => {
            this.nextIngredientType(e);
        });
        const arrow = document.createElement("i");
        arrow.classList.add("fas");
        arrow.classList.add("fa-chevron-right");
        next.textContent = "Вперед";
        next.append(arrow);
        this.buttonNext = next;
        return next;
    }
    // событие клика на кнопке Вперед
    nextIngredientType(e) {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        const list = this.ROOT_INGREDIENTS_LIST.childNodes;
        for (let i = 0; i < list.length; i++) {
            if (
                list[i].classList.contains("active-ingredient") &&
                list[i + 1]
            ) {
                const nextId = list[i + 1].getAttribute("data-id");
                const params = this.ingredientTypeParams(nextId); // узнать следующий index и title и category
                const { title, index, category } = params;
                console.log(category);
                list[i].classList.remove("active-ingredient");
                list[i + 1].classList.add("active-ingredient");
                list[i].removeAttribute("class");
                if (index === list.length - 1) {
                    // условие для последнего элемента списка
                    pubSub.fireEvent("loadPreOrderLayout", { title });
                    e.target.classList.add("disabled");
                } else {
                    this.buttonPrev.classList.remove("disabled");
                    pubSub.fireEvent("ingredientTypeChanged", {
                        id: nextId,
                        title,
                        category
                    });
                }

                break;
            }
        }
    }

    ingredientTypeParams(id) {
        const params = {};
        for (let i = 0; i < this.ingredientsArray.length; i++) {
            if (+id === this.ingredientsArray[i].id) {
                params.title = this.ingredientsArray[i].title;
                params.index = i;
                params.category = this.ingredientsArray[i].category;
                break;
            }
        }
        return params;
    }
    renderIngredientTypes() {
        this.createList();
        this.createListItems();
        this.ROOT_MODAL_BUTTONS_WRAPPER.append(this.createButtonPrev());
        this.ROOT_MODAL_BUTTONS_WRAPPER.append(this.createButtonNext());
    }
}

const ingredientTypesList = new IngredientTypes({
    ROOT_INGREDIENT_TYPES: ROOT_INGREDIENT_TYPES,
    ROOT_MODAL_BUTTONS_WRAPPER: ROOT_MODAL_BUTTONS_WRAPPER,
    ingredientsArray: ingredientsType,
    ulClassName: "ingredients-list"
});
