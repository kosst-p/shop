class IngredientTypes {
    constructor(props) {
        this.ingredientsWrapper = props.ROOT_INGREDIENT_TYPES;
        this.buttonsWrapper = props.ROOT_MODAL_BUTTONS_WRAPPER;
        this.ingredientsArray = props.ingredientsArray;
        this.ulClassName = props.ulClassName;
        pubSub.subscribeByEvent(
            "openModal",
            this.renderIngredientTypes.bind(this)
        );
        this.ROOT_INGREDIENTS_WRAPPER = ROOT_INGREDIENTS_WRAPPER;
    }
    // создание ul
    createList() {
        const ul = document.createElement("ul");
        ul.classList.add(this.ulClassName);
        this.ingredientsWrapper.appendChild(ul); // добавил в DOM
    }

    // создание li и добавление в ul
    createListItems() {
        const parent = document.querySelector("." + this.ulClassName);
        this.ingredientsArray.map((item, index) => {
            const { id, name, title, type } = item;
            let li = document.createElement("li");
            li.setAttribute("data-id", id);
            if (index === 0) {
                li.classList.add("active-ingredient");
            }
            parent.appendChild(li); // добавил в ul
            li.textContent = name;
            li.addEventListener("click", event => {
                this.changeIngredientTypesByClick(event, title, type, index);
            });
        });
    }

    changeIngredientTypesByClick(event, title, type, index) {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        const buttonNext = document.querySelector(".next");
        const buttonPrev = document.querySelector(".prev");
        let parent = document.querySelector("." + this.ulClassName);
        // условие для последнего элемента списка
        if (index === this.ingredientsArray.length - 1) {
            pubSub.fireEvent("loadPreOrderLayout", title);
            buttonNext.classList.add("disabled");
        } else {
            pubSub.fireEvent("ingredientChanged", title); // пользовательское событие
            buttonNext.classList.remove("disabled");
        }
        // условие для первого элемента списка
        if (index === 0) {
            buttonPrev.classList.add("disabled");
        } else {
            buttonPrev.classList.remove("disabled");
        }
        this.switchActiveClass(event.target, "active-ingredient", parent);
    }

    // смена активного класса
    switchActiveClass(element, className, parent) {
        parent.childNodes.forEach(el => {
            el.classList.remove(className);
            el.removeAttribute("class");
            if (el.getAttribute("data-default")) {
                el.removeAttribute("data-default");
            }
        });
        element.classList.add(className);
    }

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
        return prev;
    }
    prevIngredientType(e) {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        const list = document.querySelector(".ingredients-list").childNodes;
        const buttonNext = document.querySelector(".next");
        for (let i = 0; i < list.length; i++) {
            if (
                list[i].classList.contains("active-ingredient") &&
                list[i - 1]
            ) {
                const prevId = list[i - 1].getAttribute("data-id");
                const params = this.ingredientTypeParams(prevId);
                const { title, type, index } = params;
                list[i].classList.remove("active-ingredient");
                list[i - 1].classList.add("active-ingredient");
                list[i].removeAttribute("class");

                // условие для последнего элемента списка
                if (index !== list.length - 1) {
                    buttonNext.classList.remove("disabled");
                    pubSub.fireEvent("ingredientChanged", title);
                }

                // условие для первого элемента списка
                if (i - 1 === 0 && index === 0) {
                    e.target.classList.add("disabled");
                }
                break;
            }
        }
    }
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

        return next;
    }
    nextIngredientType(e) {
        this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
        const list = document.querySelector(".ingredients-list").childNodes;
        const buttonPrev = document.querySelector(".prev");
        for (let i = 0; i < list.length; i++) {
            if (
                list[i].classList.contains("active-ingredient") &&
                list[i + 1]
            ) {
                const nextId = list[i + 1].getAttribute("data-id");
                const params = this.ingredientTypeParams(nextId);
                const { title, type, index } = params;
                list[i].classList.remove("active-ingredient");
                list[i + 1].classList.add("active-ingredient");
                list[i].removeAttribute("class");
                if (index === list.length - 1) {
                    // условие для последнего элемента списка
                    pubSub.fireEvent("loadPreOrderLayout", title);
                    e.target.classList.add("disabled");
                } else {
                    buttonPrev.classList.remove("disabled");
                    pubSub.fireEvent("ingredientChanged", title);
                }

                break;
            }
        }
    }
    ingredientTypeParams(id) {
        const params = {};
        for (let i = 0; i < this.ingredientsArray.length; i++) {
            if (+id === this.ingredientsArray[i].id) {
                params.type = this.ingredientsArray[i].type;
                params.title = this.ingredientsArray[i].title;
                params.index = i;
                break;
            }
        }
        return params;
    }
    renderIngredientTypes() {
        this.createList();
        this.createListItems();
        this.buttonsWrapper.append(this.createButtonPrev());
        this.buttonsWrapper.append(this.createButtonNext());
    }
}

const ingredientTypesList = new IngredientTypes({
    ROOT_INGREDIENT_TYPES: ROOT_INGREDIENT_TYPES,
    ROOT_MODAL_BUTTONS_WRAPPER: ROOT_MODAL_BUTTONS_WRAPPER,
    ingredientsArray: ingredientsType,
    ulClassName: "ingredients-list"
});
