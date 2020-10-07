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
        pubSub.subscribeByEvent("productTypeChange", params => {
            this.renderProductCard(params);
        });

        /* рендер карточек с ингредиентами в зависимости от выбранного типа из списка */
        pubSub.subscribeByEvent("ingredientTypeChange", params => {
            this.renderIngredientCard(params);
        });

        /* открытие модального окна */
        pubSub.subscribeByEvent("openModal", product => {
            this.modalIsOpen(product);
            this.firstLoadIngredientCard();
        });

        /* закрытие модального окна */
        pubSub.subscribeByEvent("closedModal", modal => {
            this.modalIsClose(modal);
        });

        /* добавление ингредиента */
        pubSub.subscribeByEvent("addIngredient", ingredient => {
            this.addedIngredient(ingredient);
        });

        /* загрузка предзаказа */
        pubSub.subscribeByEvent("orderListRender", modal => {
            this.onActiveOrderList(modal);
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

    renderProductCard(params) {
        this.ROOT_RIGHT_SIDE.innerHTML = "";
        console.log(
            "*рендер карточке продукта. responseData*",
            this.responseData.menu
        );

        const filteredProducts = this.responseData.menu
            .filter(product => params.category === product.category)
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

                const productFromStore = store.getProductFromStoreById(id); // берем из стора, если продукт там есть
                if (productFromStore) {
                    return productFromStore;
                } else {
                    let newProduct = new ProductItem({
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
    }

    renderIngredientCard(params) {
        const { category } = params;
        const filteredIngredients = [];

        for (const key in this.responseData[category]) {
            if (this.responseData[category].hasOwnProperty(key)) {
                // проверка добавлен ли ингредиент
                let isActive = this.currentProduct.components[
                    category
                ].includes(key);
                ///////////////

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

    modalIsOpen(product) {
        this.currentProduct = product;
    }

    modalIsClose(modal) {
        modal.close();
    }

    // добавление ингредиента
    addedIngredient(ingredient) {
        if (
            this.currentProduct.components[ingredient.category] ===
                ingredient.code &&
            typeof this.currentProduct.components[ingredient.category] ===
                "string"
        ) {
            this.currentProduct.components[ingredient.category] = "";

            this.currentProduct.productPriceWithIngredients -= ingredient.price;
            this.currentProduct.modalTotalPrice = this.currentProduct.productPriceWithIngredients;
            this.currentProduct.totalPrice = this.currentProduct.modalTotalPrice;
            ingredient.deleteActiveClass(); // метод удаления активного класса на карточке ингредиента
        } else if (
            this.currentProduct.components[ingredient.category] === "" &&
            typeof this.currentProduct.components[ingredient.category] ===
                "string"
        ) {
            this.currentProduct.components[ingredient.category] =
                ingredient.code;

            this.currentProduct.productPriceWithIngredients += ingredient.price;
            this.currentProduct.modalTotalPrice = this.currentProduct.productPriceWithIngredients;
            this.currentProduct.totalPrice = this.currentProduct.modalTotalPrice;
            ingredient.addActiveClass(); // метод добавления активного класса на карточке ингредиента
        }

        // obj
        if (
            this.currentProduct.components[ingredient.category].includes(
                ingredient.code
            ) &&
            Array.isArray(this.currentProduct.components[ingredient.category])
        ) {
            const foundIndex = this.currentProduct.components[
                ingredient.category
            ].findIndex(item => item === ingredient.code);
            this.currentProduct.components[ingredient.category].splice(
                foundIndex,
                1
            );

            this.currentProduct.productPriceWithIngredients -= ingredient.price;
            this.currentProduct.modalTotalPrice = this.currentProduct.productPriceWithIngredients;
            this.currentProduct.totalPrice = this.currentProduct.modalTotalPrice;
            ingredient.deleteActiveClass(); // метод удаления активного класса на карточке ингредиента
        } else {
            if (
                this.currentProduct.components[ingredient.category].length <
                    this.currentProduct.componentsRule[ingredient.category] &&
                Array.isArray(
                    this.currentProduct.components[ingredient.category]
                )
            ) {
                this.currentProduct.components[ingredient.category].push(
                    ingredient.code
                );

                this.currentProduct.productPriceWithIngredients +=
                    ingredient.price;
                this.currentProduct.modalTotalPrice = this.currentProduct.productPriceWithIngredients;
                this.currentProduct.totalPrice = this.currentProduct.modalTotalPrice;
                ingredient.addActiveClass(); // метод добавления активного класса на карточке ингредиента
            }
            if (
                this.currentProduct.componentsRule[ingredient.category] ===
                    undefined &&
                Array.isArray(
                    this.currentProduct.components[ingredient.category]
                )
            ) {
                this.currentProduct.components[ingredient.category].push(
                    ingredient.code
                );

                this.currentProduct.productPriceWithIngredients +=
                    ingredient.price;
                this.currentProduct.modalTotalPrice = this.currentProduct.productPriceWithIngredients;
                this.currentProduct.totalPrice = this.currentProduct.modalTotalPrice;
                ingredient.addActiveClass(); // метод добавления активного класса на карточке ингредиента
            }
        }
        // console.log("после*** клик по ингредиенту", this.responseData.menu);
    }

    // загрузка вкладки с предзаказом
    onActiveOrderList(modal) {
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
        modal.renderOrderList(params);
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
