class ProductTypesList extends HTMLElement {
    constructor() {
        super();
        this.productsArray = productsType;
    }
    connectedCallback() {
        this.render();
    }
    createList() {
        let ul = document.createElement("ul");
        ul.classList.add("menu-list");
        this.appendChild(ul); // добавил в DOM
    }
    // создание li и добавление в ul
    createListItems() {
        let parent = document.querySelector(".menu-list");
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
    render() {
        this.createList();
        this.createListItems();
    }
}

customElements.define("product-types-list", ProductTypesList);
