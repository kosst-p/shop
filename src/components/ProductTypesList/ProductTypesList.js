class ProductTypesList {
    constructor(props) {
        this.productTypesListWrapper = props.productTypesListWrapper;
        this.typesListOfProducts = props.typesListOfProducts;
        this.pubSub = props.pubSub;
        this.menuListWrapper = null;
    }

    // создание ul
    createList() {
        const ul = document.createElement("ul");
        ul.classList.add("menu-list");
        this.productTypesListWrapper.appendChild(ul); // добавил в DOM
        this.menuListWrapper = ul;
    }

    // создание li и добавление в ul
    createListItems() {
        this.typesListOfProducts.map(item => {
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
                this.productTypeChangeByClick(category);
            });
        });
    }

    // ф-я для пользовательского события
    productTypeChangeByClick(category) {
        this.pubSub.fireEvent("productTypeChange", { category }); // пользовательское событие
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

export default ProductTypesList;
