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

        // список типов ингредиентов
        this.ingredientsType = [
            {
                id: 1,
                category: "sizes",
                name: "Размер",
                title: "Выберите размер сэндвича"
            },
            {
                id: 2,
                category: "breads",
                name: "Хлеб",
                title: "Хлеб для сэндвича на выбор"
            },
            {
                id: 3,
                category: "vegetables",
                name: "Овощи",
                title: "Дополнительные овощи бесплатно"
            },
            {
                id: 4,
                category: "sauces",
                name: "Соусы",
                title: "Выберите 3 бесплатных соуса по вкусу"
            },
            {
                id: 5,
                category: "fillings",
                name: "Начинка",
                title: "Добавьте начинку по вкусу"
            },
            {
                id: 6,
                category: "ready",
                name: "Готово",
                title: "Проверьте и добавьте в корзину"
            }
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
        console.log(this.responseData);
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
        console.log(this.productItems);
    }

    // экземпляры класса IngredientItem
    createIngredientItems() {
        for (const key in this.ingredientsType) {
            if (this.ingredientsType.hasOwnProperty(key)) {
                if (
                    // кроме последнего id
                    this.ingredientsType[key].id !== this.ingredientsType.length
                ) {
                    // this.ingredientsType[key].category - название категории
                    for (const jey in this.responseData[
                        this.ingredientsType[key].category
                    ]) {
                        if (
                            this.responseData[
                                this.ingredientsType[key].category
                            ].hasOwnProperty(jey)
                        ) {
                            // this.responseData[this.ingredientsType[key].category][jey] - каждый объект в конкретной категории из this.responseData
                            const {
                                id,
                                name,
                                price,
                                description,
                                image
                            } = this.responseData[
                                this.ingredientsType[key].category
                            ][jey];
                            // если не существует ключа внутри объекта
                            if (
                                !this.ingredientItems[
                                    this.ingredientsType[key].category
                                ]
                            ) {
                                this.ingredientItems[
                                    this.ingredientsType[key].category
                                ] = {};
                                this.ingredientItems[
                                    this.ingredientsType[key].category
                                ][jey] = new IngredientItem({
                                    code: jey,
                                    id,
                                    name,
                                    description,
                                    image,
                                    price,
                                    category: this.ingredientsType[key].category
                                });
                            } else {
                                this.ingredientItems[
                                    this.ingredientsType[key].category
                                ][jey] = {
                                    ...new IngredientItem({
                                        code: jey,
                                        id,
                                        name,
                                        description,
                                        image,
                                        price,
                                        category: this.ingredientsType[key]
                                            .category
                                    })
                                };
                            }
                        }
                    }
                }
            }
        }
        console.log(this.ingredientItems);
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
    await app.createIngredientItems();
})();
// setTimeout(() => {}, 500); // ?
/* *** */
