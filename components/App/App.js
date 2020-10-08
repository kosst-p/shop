class App {
    constructor() {
        this.URL = "../data/data.json";
        this.ROOT_PRODUCT_TYPES = document.querySelector(".product-types");
        this.ROOT_RIGHT_SIDE = document.querySelector(".right-side");
        this.ROOT_INGREDIENTS_WRAPPER = document.querySelector(
            ".ingredients-wrapper"
        );
        // список типов продуктов
        this.productsType = [
            { id: 1, category: "pizza", name: "Пицца" },
            { id: 2, category: "shaurma", name: "Шаурма" },
            { id: 3, category: "sandwiches", name: "Сэндвичи" },
            { id: 4, category: "burgers", name: "Бургеры" },
            { id: 5, category: "chicken", name: "Курица & Картофель" },
            { id: 6, category: "salads", name: "Тортилья & Салаты" },
            { id: 7, category: "drinks", name: "Напитки & Десерты" }
        ];

        // выгрузили все данные одним ajax запросом
        this.responseData = null;

        /* STORE */
        this.productItems = {};
        this.ingredientItems = {};
        /* *** */

        /* рендер карточек с продуктами в зависимости от выбранного типа из списка */
        pubSub.subscribeByEvent("productTypeChange", params => {
            this.renderProductCard(params);
        });
    }

    // api
    async request() {
        const fetch = new FetchApi({ url: this.URL });
        const data = await fetch.fetchData();
        this.responseData = data;
    }

    // экземпляры класса ProductItem
    createProductItems() {
        this.responseData.menu.forEach(product => {
            const {
                id,
                name,
                description,
                image,
                price,
                market,
                category,
                type,
                components,
                componentsRule
            } = product;
            const marketImg = this.responseData.markets[market].image;
            if (!this.productItems[category]) {
                this.productItems[category] = [];
                // для первого элемента
                this.productItems[category].push(
                    new ProductItem({
                        id,
                        name,
                        description,
                        image,
                        price,
                        marketImg,
                        category,
                        type,
                        components,
                        componentsRule
                    })
                );
            } else {
                this.productItems[category].push(
                    new ProductItem({
                        id,
                        name,
                        description,
                        image,
                        price,
                        marketImg,
                        category,
                        type,
                        components,
                        componentsRule
                    })
                );
            }
        });
    }

    // рендер всех карточек продуктов при первой загрузки страницы
    firstLoadProductCard() {
        for (const key in this.productItems) {
            if (this.productItems.hasOwnProperty(key)) {
                this.productItems[key].forEach(item => {
                    this.ROOT_RIGHT_SIDE.append(item.render());
                });
            }
        }
    }

    // рендер карточек продуктов в зависимости от категории
    renderProductCard(params) {
        const { category } = params;
        this.ROOT_RIGHT_SIDE.innerHTML = "";
        this.productItems[category].forEach(item => {
            this.ROOT_RIGHT_SIDE.append(item.render());
        });
    }
}
const app = new App();
/* *** */
// дождемся, пока загрузятся все данные по api
(async () => {
    await app.request();
    await app.createProductItems();
    await app.firstLoadProductCard();
})();
// setTimeout(() => {}, 500); // ?
/* *** */
