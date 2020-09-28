class Modal {
    constructor() {
        this.closeBtn = document.querySelector(".modal-close-btn");
        this.ROOT_MODAL_WINDOW = ROOT_MODAL_WINDOW;
        this.ROOT_INGREDIENT_TYPES = ROOT_INGREDIENT_TYPES;
        this.ROOT_MODAL_TITLE = ROOT_MODAL_TITLE;
        this.ROOT_MODAL_PRICE = ROOT_MODAL_PRICE;
        this.ROOT_MODAL_BUTTONS_WRAPPER = ROOT_MODAL_BUTTONS_WRAPPER;
        this.ROOT_INGREDIENTS_WRAPPER = ROOT_INGREDIENTS_WRAPPER;
        this.ROOT_MODAL_COUNT = ROOT_MODAL_COUNT;

        // this.ingredients = {
        //     sizes: [],
        //     breads: [],
        //     vegetables: [],
        //     sauces: [],
        //     fillings: []
        // };
        // Object.keys(this.ingredients).forEach(ingredient => {
        //     console.log(this.ingredients[ingredient]);
        //     this.ingredients[ingredient] = new Proxy(
        //         this.ingredients[ingredient],
        //         {
        //             set(target, prop, value) {
        //                 // console.log({ target, prop, value });

        //                 // pubSub.fireEvent("test", "hello");
        //                 return true;
        //             }
        //         }
        //     );
        // });
        // this.preOrder = {
        //     idProduct: "",
        //     nameProduct: "",
        //     imageProduct: "",
        //     ingredients: this.ingredients,
        //     ingredientsRule: {},
        //     currentPrice: 0,
        //     totalPrice: 0,
        //     quantity: 1
        // };

        this.preOrder = {
            idProduct: "",
            nameProduct: "",
            imageProduct: "",
            ingredients: {
                sizes: [],
                breads: [],
                vegetables: [],
                sauces: [],
                fillings: []
            },
            ingredientsRule: {},
            currentPrice: 0,
            totalPrice: 0,
            quantity: 1
        };

        pubSub.subscribeByEvent(
            "openModal",
            this.setInfoAboutProduct.bind(this)
        ); // слушаем событие открытия модального окна

        pubSub.subscribeByEvent(
            "loadPreOrderLayout",
            this.sendPreOrder.bind(this)
        ); // слушаем событие загрузки страницы(Готово) предзаказа

        pubSub.subscribeByEvent(
            "onAddInPreOrder",
            this.addedInPreOrder.bind(this)
        ); // слушаем событие добавления ингредиента в объект preOrder(предзаказ)

        pubSub.subscribeByEvent(
            "ingredientTypeChanged",
            this.changedIngredients.bind(this)
        ); // слушаем событие перехода по вкладкам типа ингредиентов

        pubSub.subscribeByEvent(
            "changeQuantity",
            this.recalculateTotalPrice.bind(this)
        );
        pubSub.subscribeByEvent(
            "addPreOrderInBasket",
            this.addedPreOrderInBasket.bind(this)
        );
        pubSub.subscribeByEvent(
            "addPreOrderInBasket",
            this.closeModal.bind(this)
        );
    }

    recalculateTotalPrice(params) {
        this.preOrder.totalPrice = this.preOrder.currentPrice * params.quantity;
        pubSub.fireEvent("updatePrice", {
            price: this.preOrder.totalPrice
        });
        this.preOrder.quantity = params.quantity;
    }

    addedPreOrderInBasket() {
        const preOrder = {
            id: this.preOrder.idProduct,
            name: this.preOrder.nameProduct,
            price: this.preOrder.currentPrice,
            ingredients: this.preOrder.ingredients,
            quantity: this.preOrder.quantity,
            total: this.preOrder.quantity * this.preOrder.currentPrice
        };

        pubSub.fireEvent("setPreOrderInBasket", preOrder);
    }

    addedInPreOrder(params) {
        const { name, category, price, id } = params;

        // проверяем есть ли значение в массиве, если есть - то удаляем его
        if (this.preOrder.ingredients[category].includes(name)) {
            const foundIndex = this.preOrder.ingredients[category].findIndex(
                item => item === name
            );
            this.preOrder.ingredients[category].splice(foundIndex, 1);
            this.preOrder.totalPrice -= price;
            this.preOrder.currentPrice = this.preOrder.totalPrice;

            // pubSub.fireEvent("checkAdded", false); // когда кликнули по карточке ререндер !

            pubSub.fireEvent("showPreOrderTotalPrice", {
                price: this.preOrder.totalPrice
            });
        } else {
            // перед добавлением в массив проверяем есть ли правило
            if (
                this.preOrder.ingredients[category].length <
                this.preOrder.ingredientsRule[category]
            ) {
                this.preOrder.ingredients[category].push(name);
                // this.ingredients[category].push(name);

                this.preOrder.totalPrice += price;
                this.preOrder.currentPrice = this.preOrder.totalPrice;

                // pubSub.fireEvent("checkAdded", true); // когда кликнули по карточке ререндер !

                pubSub.fireEvent("showPreOrderTotalPrice", {
                    price: this.preOrder.totalPrice
                });
            }
            if (this.preOrder.ingredientsRule[category] === undefined) {
                this.preOrder.ingredients[category].push(name);
                // pubSub.fireEvent("checkAdded", true); // когда кликнули по карточке ререндер !
                this.preOrder.totalPrice += price;
                this.preOrder.currentPrice = this.preOrder.totalPrice;
                pubSub.fireEvent("showPreOrderTotalPrice", {
                    price: this.preOrder.totalPrice
                });
            }
        }
        // console.log(this.preOrder);
    }

    // записываем данные о продукте(у которого открыли модальное окно)
    setInfoAboutProduct(params) {
        const {
            idProduct,
            nameProduct,
            imageProduct,
            ingredientsRule
        } = params;
        this.preOrder.idProduct = idProduct;
        this.preOrder.nameProduct = nameProduct;
        this.preOrder.imageProduct = imageProduct;
        this.preOrder.ingredientsRule = ingredientsRule;
    }

    // прокидываем собранный объект на страницу(Готово) предзаказа
    sendPreOrder() {
        pubSub.fireEvent("passPreOrder", this.preOrder);
    }
    changedIngredients({ category }) {
        pubSub.fireEvent(
            "setChangedIngredients",
            this.preOrder.ingredients[category]
        );
    }

    closeModal(params) {
        // console.log(params);
        let close = false;
        if (params) {
            close = params.close || false;
        }
        // console.log(close);

        this.ROOT_MODAL_WINDOW.addEventListener("click", e => {
            if (
                e.target === this.closeBtn ||
                !e.target.closest(".modal-content")
            ) {
                this.ROOT_INGREDIENT_TYPES.innerHTML = "";
                this.ROOT_MODAL_TITLE.innerHTML = "";
                this.ROOT_MODAL_PRICE.innerHTML = "";
                this.ROOT_MODAL_BUTTONS_WRAPPER.innerHTML = "";
                this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
                this.ROOT_MODAL_COUNT.innerHTML = "";
                this.ROOT_MODAL_WINDOW.classList.remove("open");
                // обнуляем предзаказ
                this.preOrder = {
                    idProduct: "",
                    nameProduct: "",
                    imageProduct: "",
                    ingredients: {
                        sizes: [],
                        breads: [],
                        vegetables: [],
                        sauces: [],
                        fillings: []
                    },
                    ingredientsRule: {},
                    currentPrice: 0,
                    totalPrice: 0,
                    quantity: 0
                };
                pubSub.fireEvent("onCloseModal", {
                    price: 0,
                    title: "Выберите размер сэндвича"
                }); // !!
            }
        });
    }
}

const modal = new Modal();
modal.closeModal();
