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

        /* рендер карточек с продуктами в зависимости от выбранного типа из списка */
        pubSub.subscribeByEvent("productTypeChange", data => {
            this.renderProductCard(data);
        });

        /* рендер карточек с ингредиентами в зависимости от выбранного типа из списка */
        pubSub.subscribeByEvent("ingredientTypeChange", data => {
            this.renderIngredientCard(data);
        });

        /* открытие модального окна*/
        pubSub.subscribeByEvent("openModal", data => {
            this.modalIsOpen(data);
            this.firstLoadIngredientCard();
        });
        /* закрытие модального окна*/
        pubSub.subscribeByEvent("closedModal", data => {
            this.modalIsClose(data);
        });
        /* замена содержимого поля с количеством в карточке с продуктом*/
        pubSub.subscribeByEvent("changeQuantity", data => {
            this.changedTextField(data);
        });
    }

    changedTextField(data) {
        data.currentProd.changeTextFieldQuantity(data.currentProd.quantity);
    }

    async request() {
        const fetch = new FetchApi({ url: this.URL });
        const data = await fetch.fetchData();
        this.responseData = data;
    }

    renderProductCard(data) {
        this.ROOT_RIGHT_SIDE.innerHTML = "";
        // console.log(this.responseData);
        // console.log(this.responseData.menu);
        // console.log(this.responseData.markets);

        const filteredProducts = this.responseData.menu
            .filter(product => data.category === product.category)
            .map(product => {
                const {
                    id,
                    name,
                    description,
                    image,
                    price,
                    market,
                    category,
                    type,
                    componentsRule
                } = product;
                const marketImg = this.responseData.markets[market].image;
                const instanceProductItem = new ProductItem({
                    id,
                    name,
                    description,
                    image,
                    price,
                    marketImg,
                    category,
                    type,
                    componentsRule
                });

                return instanceProductItem;
            });

        filteredProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек продукта
    }

    // первая загрузка страницы со всеми карточками продукта
    firstLoadProductCard() {
        const allProducts = this.responseData.menu.map(product => {
            const {
                id,
                name,
                description,
                image,
                price,
                market,
                category,
                type,
                componentsRule
            } = product;
            const marketImg = this.responseData.markets[market].image;
            const instanceProductItem = new ProductItem({
                id,
                name,
                description,
                image,
                price,
                marketImg,
                category,
                type,
                componentsRule
            });

            return instanceProductItem;
        });
        allProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек продукта
    }

    modalIsOpen(data) {}

    firstLoadIngredientCard() {
        let category = "";
        this.ingredientsType.forEach(element => {
            if (element.id === 1) {
                category = element.category;
            }
        });
        this.renderIngredientCard({ category });
    }

    modalIsClose(data) {
        data.close();
    }

    renderIngredientCard(data) {
        const { category } = data;
        const filteredIngredients = [];

        for (const key in this.responseData[category]) {
            if (this.responseData[category].hasOwnProperty(key)) {
                const {
                    id,
                    name,
                    price,
                    description,
                    image
                } = this.responseData[category][key];
                filteredIngredients.push(
                    new IngredientItem({
                        id,
                        name,
                        description,
                        image,
                        price
                    })
                );
            }
        }

        filteredIngredients.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_INGREDIENTS_WRAPPER); // рендер карточек ингредиент
    }
}

const app = new App();
/* *** */
// дождемся, пока загрузятся все данные по api
(async () => {
    await app.request();
    app.firstLoadProductCard();
})();
// setTimeout(() => {}, 500); // ?
/* *** */
