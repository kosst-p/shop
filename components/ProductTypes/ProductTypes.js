class ProductTypes {
    constructor(props) {
        this.parentDOM = props.parentDOM;
        this.productsArray = props.productsArray;
        this.activeType = props.activeType;
        this.ulClassName = props.ulClassName;
    }

    // создание ul
    createList() {
        let ul = document.createElement("ul");
        ul.classList.add(this.ulClassName);
        this.parentDOM.appendChild(ul); // добавил в DOM
    }

    // создание li и добавление в ul
    createListItems() {
        let parent = document.querySelector("." + this.ulClassName);
        this.productsArray.map(item => {
            const { attribute, name } = item;
            let li = document.createElement("li");
            if (attribute === this.activeType) {
                li.setAttribute("data-name", attribute);
                li.setAttribute("data-default", this.activeType);
                li.textContent = name;
                li.classList.add("active-product");
                parent.appendChild(li); // добавил в ul
            } else {
                li.textContent = name;
                li.setAttribute("data-name", attribute);
                parent.appendChild(li); // добавил в ul
            }
        });
    }

    // событие клика на li с сменой
    changeProductTypeByClick() {
        let parent = document.querySelector("." + this.ulClassName);
        parent.addEventListener("click", event => {
            if (event.target.tagName === "LI") {
                const type = event.target.getAttribute("data-name");
                this.switchActiveClass(event.target, "active-product", parent);
            }
        });
    }

    // при первой загрузке страницы вызовется функция
    firstLoadProductType() {
        this.getProductsItem(this.activeType);
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

    render() {
        this.createList(); // ?
        this.createListItems(); // ?
        // this.firstLoadProductType(); // ?
        this.changeProductTypeByClick(); // ?
    }
}

const productTypesList = new ProductTypes({
    parentDOM: ROOT_PRODUCT_TYPES,
    productsArray: productsType,
    activeType: "sandwiches",
    ulClassName: "menu-list"
});

productTypesList.render();
