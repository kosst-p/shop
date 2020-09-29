class App {
    constructor() {
        this.URL = "../data/data.json";
        this.ROOT_PRODUCT_TYPES = document.querySelector(".product-types");
        this.ROOT_RIGHT_SIDE = document.querySelector(".right-side");
        this.ROOT_BASKET = document.querySelector(".basket-wrapper");
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

        /* рендер карточек с продуктами в зависимости от выбранного типа из списка */
        pubSub.subscribeByEvent("productTypeChange", data => {
            this.renderProductCard(data);
        });

        /* добавить продукт в корзину */
        pubSub.subscribeByEvent("addProductInBasket", data => {
            this.productAddInBasket(data);
        });
    }

    productAddInBasket(data) {
        pubSub.fireEvent("onAddProductInBasket", data); // пользовательское событие
    }

    async request() {
        const fetch = new FetchApi({ url: this.URL });
        const data = await fetch.fetchData();
        return data;
    }

    renderProductTypesList() {
        const productTypesList = new ProductTypesList({
            parentDOMTag: this.ROOT_PRODUCT_TYPES,
            typesList: productsType
        });
        productTypesList.render();
    }

    renderBasket() {
        const basket = new Basket({
            parentDOMTag: this.ROOT_BASKET
        });
        basket.render();
    }

    async renderProductCard(data) {
        this.ROOT_RIGHT_SIDE.innerHTML = "";
        const products = await this.request();
        const markets = await this.request();
        // console.log(data);
        // console.log(products.menu);
        // console.log(markets);

        const filteredProducts = products.menu
            .filter(product => data.category === product.category)
            .map(product => {
                const { id, name, description, image, price, market } = product;
                const marketImg = markets.markets[market].image;
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
}

const app = new App();
app.renderProductTypesList();
app.renderBasket();
