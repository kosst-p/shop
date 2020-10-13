import FetchApi from "../../api/api";
import ProductItem from "../ProductItem/ProductItem";
import IngredientItem from "../IngredientItem/IngredientItem";

class App {
    constructor(props) {
        this.URL = "data.json";
        this.pubSub = props.pubSub;
        this.productCardsWrapper = props.productCardsWrapper;
        this.ingredientCardsWrapper = props.ingredientCardsWrapper;

        // список типов ингредиентов
        this.ingredientsType = props.typesListOfIngredients;

        // выгрузили все данные одним ajax запросом
        this.responseData = null;

        /* STORE */
        this.productItems = {};
        this.ingredientItems = {};
        this.currentProduct = null;
        /* *** */

        /* рендер карточек с продуктами в зависимости от выбранного типа из списка */
        this.pubSub.subscribeByEvent("productTypeChange", params => {
            this.renderProductCard(params);
        });

        /* рендер карточек с ингредиентами в зависимости от выбранного типа из списка */
        this.pubSub.subscribeByEvent("ingredientTypeChange", params => {
            this.renderIngredientCard(params);
        });

        /* открытие модального окна */
        this.pubSub.subscribeByEvent("openModal", product => {
            this.modalIsOpen(product);
            this.firstLoadIngredientCard();
        });

        /* закрытие модального окна */
        this.pubSub.subscribeByEvent("closedModal", modal => {
            this.modalIsClose(modal);
        });

        /* добавление ингредиента */
        this.pubSub.subscribeByEvent("addIngredient", ingredient => {
            this.addedIngredient(ingredient);
        });

        /* загрузка предзаказа */
        this.pubSub.subscribeByEvent("orderListRender", modal => {
            this.onActiveOrderList(modal);
        });
    }

    // api
    async request() {
        const fetch = new FetchApi({ url: this.URL });
        const data = await fetch.fetchData();
        this.responseData = data;
        // console.log(this.responseData);
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
                        pubSub: this.pubSub,
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
                        pubSub: this.pubSub,
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
        // console.log(this.productItems);
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
                                    pubSub: this.pubSub,
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
                                ][jey] = new IngredientItem({
                                    pubSub: this.pubSub,
                                    code: jey,
                                    id,
                                    name,
                                    description,
                                    image,
                                    price,
                                    category: this.ingredientsType[key].category
                                });
                            }
                        }
                    }
                }
            }
        }
        // console.log(this.ingredientItems);
    }

    // рендер всех карточек продуктов при первой загрузки страницы
    firstLoadProductCard() {
        for (const key in this.productItems) {
            if (this.productItems.hasOwnProperty(key)) {
                this.productItems[key].forEach(item => {
                    this.productCardsWrapper.append(item.render());
                });
            }
        }
    }

    // рендер карточек продуктов в зависимости от категории
    renderProductCard(params) {
        const { category } = params;
        this.productCardsWrapper.innerHTML = "";
        this.productItems[category].forEach(item => {
            this.productCardsWrapper.append(item.render());
        });
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

    // рендер карточек ингредиентов в зависимости от категории
    renderIngredientCard(params) {
        const { category } = params;
        for (const key in this.ingredientItems[category]) {
            const ingredientCard = this.ingredientItems[category][key];
            this.ingredientCardsWrapper.append(ingredientCard.render());
            // проверка на наличии выбранного ингредиента у продукта
            if (this.currentProduct.components[category].includes(key)) {
                ingredientCard.addActiveClass();
            }
        }
    }

    // открытие модалки
    modalIsOpen(product) {
        // в данной переменной лежит продукт(меняется) в котором мы открыли модальное окно
        this.currentProduct = product;
    }

    // закрытие модалки
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
        // console.log(this.productItems);
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

export default App;
