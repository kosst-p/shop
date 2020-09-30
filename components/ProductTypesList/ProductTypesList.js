class ProductTypesList {
    constructor(props) {
        this.parentDOMTag = props.parentDOMTag;
        this.typesList = props.typesList;
        this.menuListWrapper = null;
    }

    // создание ul
    createList() {
        const ul = document.createElement("ul");
        ul.classList.add("menu-list");
        this.parentDOMTag.appendChild(ul); // добавил в DOM
        this.menuListWrapper = ul;
    }

    // создание li и добавление в ul
    createListItems() {
        this.typesList.map(item => {
            const { id, name, category } = item;
            let li = document.createElement("li");
            li.setAttribute("data-id", id);
            this.menuListWrapper.appendChild(li); // добавил в ul
            li.textContent = name;
            li.addEventListener("click", event => {
                this.switchActiveClass(
                    event.target,
                    "active-product",
                    this.menuListWrapper
                );
                this.productTypeChangeByClick(id, category);
            });
        });
    }

    productTypeChangeByClick(id, category) {
        pubSub.fireEvent("productTypeChange", { id, category }); // пользовательское событие
    }

    // смена активного класса
    switchActiveClass(element, className, domElem) {
        domElem.childNodes.forEach(el => {
            el.classList.remove(className);
            el.removeAttribute("class");
        });
        element.classList.add(className);
    }

    render() {
        this.createList();
        this.createListItems();
    }
}

const productTypesList = new ProductTypesList({
    parentDOMTag: ROOT_PRODUCT_TYPES,
    typesList: productsType
});
productTypesList.render();
