const URL = "../data/data.json";
const ROOT_PRODUCT_TYPES = document.querySelector(".product-types");
const ROOT_RIGHT_SIDE = document.querySelector(".right-side");
const ROOT_BASKET = document.querySelector(".basket-wrapper");
const ROOT_MODAL_WINDOW = document.querySelector(".modal");
const ROOT_INGREDIENT_TYPES = document.querySelector(".ingredient-types");
const ROOT_MODAL_TITLE = document.querySelector(".modal-title");
const ROOT_MODAL_PRICE = document.querySelector(".modal-price");
const ROOT_MODAL_BUTTONS_WRAPPER = document.querySelector(
    ".modal-buttons-wrapper"
);
const ROOT_INGREDIENTS_WRAPPER = document.querySelector(".ingredients-wrapper");
const ROOT_MODAL_COUNT = document.querySelector(".modal-count");

// список типов продуктов
const productsType = [
    { id: 1, category: "pizza", name: "Пицца" },
    { id: 2, category: "shaurma", name: "Шаурма" },
    { id: 3, category: "sandwiches", name: "Сэндвичи" },
    { id: 4, category: "burgers", name: "Бургеры" },
    { id: 5, category: "chicken", name: "Курица & Картофель" },
    { id: 6, category: "salads", name: "Тортилья & Салаты" },
    { id: 7, category: "drinks", name: "Напитки & Десерты" }
];

// список типов ингредиентов
const ingredientsType = [
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

import "./style/style.css";
import App from "./components/App/App";
import ProductTypesList from "./components/ProductTypesList/ProductTypesList";
import Basket from "./components/Basket/Basket";
import Modal from "./components/Modal/Modal";

import PubSub from "./components/PubSub/PubSub";

const pubSub = new PubSub();

const modal = new Modal({
    typesListOfIngredients: ingredientsType,
    pubSub: pubSub,
    modalWindowWrapper: ROOT_MODAL_WINDOW,
    modalTitleWrapper: ROOT_MODAL_TITLE,
    modalPriceWrapper: ROOT_MODAL_PRICE,
    modalButtonsWrapper: ROOT_MODAL_BUTTONS_WRAPPER,
    ingredientTypesListWrapper: ROOT_INGREDIENT_TYPES,
    ingredientCardsWrapper: ROOT_INGREDIENTS_WRAPPER,
    modalCountWrapper: ROOT_MODAL_COUNT
});
modal.eventCloseModal();

const app = new App({
    typesListOfProducts: productsType,
    typesListOfIngredients: ingredientsType,
    pubSub: pubSub,
    productCardsWrapper: ROOT_RIGHT_SIDE,
    ingredientCardsWrapper: ROOT_INGREDIENTS_WRAPPER
});

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

const productTypesList = new ProductTypesList({
    productTypesListWrapper: ROOT_PRODUCT_TYPES,
    typesListOfProducts: productsType,
    pubSub: pubSub
});
productTypesList.render();

const basket = new Basket({
    parentDOMTag: ROOT_BASKET,
    pubSub: pubSub
});
basket.render();
