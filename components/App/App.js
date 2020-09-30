class App {
    constructor() {
        this.URL = "../data/data.json";
        this.ROOT_PRODUCT_TYPES = document.querySelector(".product-types");
        this.ROOT_RIGHT_SIDE = document.querySelector(".right-side");
        this.ROOT_MODAL_WINDOW = document.querySelector(".modal");
        this.ROOT_INGREDIENT_TYPES = document.querySelector(
            ".ingredient-types"
        );
        this.ROOT_MODAL_TITLE = document.querySelector(".modal-title");
        this.ROOT_MODAL_PRICE = document.querySelector(".modal-price");
        this.ROOT_MODAL_BUTTONS_WRAPPER = document.querySelector(
            ".modal-buttons-wrapper"
        );
        this.ROOT_INGREDIENTS_WRAPPER = document.querySelector(
            ".ingredients-wrapper"
        );
        this.ROOT_MODAL_COUNT = document.querySelector(".modal-count");

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
                const { id, name, description, image, price, market } = product;
                const marketImg = this.responseData.markets[market].image;
                const instanceProductItem = new ProductItem({
                    id,
                    name,
                    description,
                    image,
                    price,
                    marketImg
                });

                return instanceProductItem;
            });

        filteredProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек продукта
    }

    // первая загрузка страницы со всеми карточками продукта
    async firstLoadProductCard() {
        const allProducts = await this.responseData.menu.map(product => {
            const { id, name, description, image, price, market } = product;
            const marketImg = this.responseData.markets[market].image;
            const instanceProductItem = new ProductItem({
                id,
                name,
                description,
                image,
                price,
                marketImg
            });

            return instanceProductItem;
        });
        allProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек продукта
    }
}

const app = new App();
app.request();

setTimeout(() => {
    app.firstLoadProductCard();
}, 500); // ?
