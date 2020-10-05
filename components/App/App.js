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

        // текущий выбранный продукт
        this.currentProduct = null;

        /* рендер карточек с продуктами в зависимости от выбранного типа из списка */
        pubSub.subscribeByEvent("productTypeChange", data => {
            this.renderProductCard(data);
        });

        /* рендер карточек с ингредиентами в зависимости от выбранного типа из списка */
        pubSub.subscribeByEvent("ingredientTypeChange", data => {
            this.renderIngredientCard(data);
        });

        /* открытие модального окна */
        pubSub.subscribeByEvent("openModal", data => {
            this.modalIsOpen(data);
            this.firstLoadIngredientCard();
        });

        /* закрытие модального окна */
        pubSub.subscribeByEvent("closedModal", data => {
            this.modalIsClose(data);
        });

        /* добавление ингредиента */
        pubSub.subscribeByEvent("addIngredient", data => {
            this.addedIngredient(data);
        });

        /* загрузка предзаказа */
        pubSub.subscribeByEvent("orderListRender", data => {
            this.onActiveOrderList(data);
        });

        /* подписка на изменение количества в модальном окне */
        pubSub.subscribeByEvent("modalChangeQuantity", data => {
            this.changeProductQuantity(data);
        });
    }

    // api
    async request() {
        const fetch = new FetchApi({ url: this.URL });
        const data = await fetch.fetchData();
        this.responseData = data;
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
                components,
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
                components,
                componentsRule
            });

            return instanceProductItem;
        });
        allProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек продукта
    }

    // первая загрузка ингредиентов при открытии модального окна
    firstLoadIngredientCard() {
        let category = "";
        this.ingredientsType.forEach(element => {
            if (element.id === 1) {
                category = element.category;
            }
        });
        this.renderIngredientCard({ category });
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
                    components,
                    componentsRule
                } = product;
                const marketImg = this.responseData.markets[market].image;

                const productFromStore = store.getProductFromStoreById(id);

                if (productFromStore) {
                    return productFromStore;
                } else {
                    const newProduct = new ProductItem({
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
                    });
                    return newProduct;
                }
            });

        filteredProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек продукта
        this.currentProduct = null;
    }

    renderIngredientCard(data) {
        const { category } = data;
        const filteredIngredients = [];

        for (const key in this.responseData[category]) {
            if (this.responseData[category].hasOwnProperty(key)) {
                // проверка добавлен ли ингредиент

                /* FIXME: this.currentProduct - не удаляется при переходе по вкладкам, он сохранен! */

                let isActive = this.currentProduct.components[
                    category
                ].includes(key);
                ///////////////
                console.log("*", this.currentProduct);
                console.log(isActive);
                const {
                    id,
                    name,
                    price,
                    description,
                    image
                } = this.responseData[category][key];
                filteredIngredients.push(
                    new IngredientItem({
                        code: key,
                        id,
                        name,
                        description,
                        image,
                        price,
                        category,
                        isActive // !
                    })
                );
            }
        }

        filteredIngredients.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_INGREDIENTS_WRAPPER); // рендер карточек ингредиент
    }

    modalIsOpen(data) {
        this.currentProduct = data;
    }

    modalIsClose(data) {
        data.close();
    }

    // добавление ингредиента
    addedIngredient(data) {
        if (
            this.currentProduct.components[data.category] === data.code &&
            typeof this.currentProduct.components[data.category] === "string"
        ) {
            this.currentProduct.components[data.category] = "";

            this.currentProduct.totalPrice -=
                data.price * this.currentProduct.quantity; // обновление общей цены

            this.currentProduct.productPriceWithIngredients -= data.price;

            data.deleteActiveClass(); // метод удаления активного класса на карточку ингредиента
        } else if (
            this.currentProduct.components[data.category] === "" &&
            typeof this.currentProduct.components[data.category] === "string"
        ) {
            this.currentProduct.components[data.category] = data.code;

            this.currentProduct.totalPrice +=
                data.price * this.currentProduct.quantity;

            this.currentProduct.productPriceWithIngredients += data.price;

            data.addActiveClass(); // метод добавления активного класса на карточку ингредиента
        }

        // obj
        if (
            this.currentProduct.components[data.category].includes(data.code) &&
            Array.isArray(this.currentProduct.components[data.category])
        ) {
            const foundIndex = this.currentProduct.components[
                data.category
            ].findIndex(item => item === data.code);
            this.currentProduct.components[data.category].splice(foundIndex, 1);

            this.currentProduct.totalPrice -=
                data.price * this.currentProduct.quantity;

            this.currentProduct.productPriceWithIngredients -= data.price;

            data.deleteActiveClass(); // метод удаления активного класса на карточку ингредиента
        } else {
            if (
                this.currentProduct.components[data.category].length <
                    this.currentProduct.componentsRule[data.category] &&
                Array.isArray(this.currentProduct.components[data.category])
            ) {
                this.currentProduct.components[data.category].push(data.code);

                this.currentProduct.totalPrice +=
                    data.price * this.currentProduct.quantity;

                this.currentProduct.productPriceWithIngredients += data.price;

                data.addActiveClass(); // метод добавления активного класса на карточку ингредиента
            }
            if (
                this.currentProduct.componentsRule[data.category] ===
                    undefined &&
                Array.isArray(this.currentProduct.components[data.category])
            ) {
                this.currentProduct.components[data.category].push(data.code);

                this.currentProduct.totalPrice +=
                    data.price * this.currentProduct.quantity;

                this.currentProduct.productPriceWithIngredients += data.price;

                data.addActiveClass(); // метод добавления активного класса на карточку ингредиента
            }
            this.currentProduct.changeTextFieldPrice(); // метод изменения цены в карточке товара
        }
    }

    // загрузка вкладки с предзаказом
    onActiveOrderList(data) {
        const params = {
            name: this.currentProduct.name,
            image: this.currentProduct.image,
            ingredients: {}
        };
        for (const j in this.currentProduct.components) {
            params.ingredients[j] = [];
            if (this.currentProduct.components[j]) {
                if (Array.isArray(this.currentProduct.components[j])) {
                    this.currentProduct.components[j].forEach(element => {
                        params.ingredients[j].push(
                            this.responseData[j][element].name
                        );
                    });
                } else {
                    params.ingredients[j] = this.responseData[j][
                        this.currentProduct.components[j]
                    ].name;
                }
            }
        }

        data.renderOrderList(params);
    }

    // смена количества в карточке товара
    changeProductQuantity(data) {
        data.changeTextFieldQuantity();
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
