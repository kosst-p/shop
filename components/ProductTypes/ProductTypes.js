class ProductTypes {
    constructor(props) {
        this.parentDOM = props.parentDOM;
        this.productsArray = props.productsArray;
        this.ulClassName = props.ulClassName;
    }

    // создание ul
    createList() {
        const ul = document.createElement("ul");
        ul.classList.add(this.ulClassName);
        this.parentDOM.appendChild(ul); // добавил в DOM
    }

    // создание li и добавление в ul
    createListItems() {
        const parent = document.querySelector("." + this.ulClassName);
        this.productsArray.map(item => {
            const { id, name } = item;
            let li = document.createElement("li");
            li.setAttribute("data-id", id);
            parent.appendChild(li); // добавил в ul
            li.textContent = name;
            li.addEventListener("click", event => {
                this.changeProductTypesByClick(event, id, parent); // id типа продукта
            });
        });
    }

    // событие клика на li с сменой активного класса
    changeProductTypesByClick(event, id, parent) {
        this.switchActiveClass(event.target, "active-product", parent);
        pubSub.fireEvent("productTypeChanged", { id }); // пользовательское событие
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
        this.createList();
        this.createListItems();
    }
}

const productTypesList = new ProductTypes({
    parentDOM: ROOT_PRODUCT_TYPES, // в какой родительский враппер вставляем контент
    productsArray: productsType,
    ulClassName: "menu-list"
});

productTypesList.render();
