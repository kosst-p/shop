class ProductTypes {
    constructor(props) {
        this.parentDOM = props.parentDOM;
        this.productsArray = props.productsArray;
        this.ulClassName = props.ulClassName;
        this.ROOT_MENU_LIST = null;
    }

    // создание ul
    createList() {
        const ul = document.createElement("ul");
        ul.classList.add(this.ulClassName);
        this.parentDOM.appendChild(ul); // добавил в DOM
        this.ROOT_MENU_LIST = ul;
    }

    // создание li и добавление в ul
    createListItems() {
        this.productsArray.map(item => {
            const { id, name, category } = item;
            let li = document.createElement("li");
            li.setAttribute("data-id", id);
            this.ROOT_MENU_LIST.appendChild(li); // добавил в ul
            li.textContent = name;
            li.addEventListener("click", event => {
                this.changeProductTypesByClick(
                    event,
                    id,
                    this.ROOT_MENU_LIST,
                    category
                ); // id типа продукта
            });
        });
    }

    // событие клика на li с сменой активного класса
    changeProductTypesByClick(event, id, domElem, category) {
        this.switchActiveClass(event.target, "active-product", domElem);
        pubSub.fireEvent("productTypeChanged", { id, category }); // пользовательское событие
    }

    // смена активного класса
    switchActiveClass(element, className, domElem) {
        domElem.childNodes.forEach(el => {
            el.classList.remove(className);
            el.removeAttribute("class");
        });
        element.classList.add(className);
    }

    // рендер списка на страницу
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
