const URL = "../data/data.json";

const APP = document.querySelector(".app");
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
    { id: 1, type: "pizza", name: "Пицца" },
    { id: 2, type: "shaurma", name: "Шаурма" },
    { id: 3, type: "sandwiches", name: "Сэндвичи" },
    { id: 4, type: "burgers", name: "Бургеры" },
    { id: 5, type: "chicken", name: "Курица & Картофель" },
    { id: 6, type: "salads", name: "Тортилья & Салаты" },
    { id: 7, type: "drinks", name: "Напитки & Десерты" }
];

// список типов ингредиентов
const ingredientsType = [
    { id: 1, type: "sizes", name: "Размер", title: "Выберите размер сэндвича" },
    {
        id: 2,
        type: "breads",
        name: "Хлеб",
        title: "Хлеб для сэндвича на выбор"
    },
    {
        id: 3,
        type: "vegetables",
        name: "Овощи",
        title: "Дополнительные овощи бесплатно"
    },
    {
        id: 4,
        type: "sauces",
        name: "Соусы",
        title: "Выберите 3 бесплатных соуса по вкусу"
    },
    {
        id: 5,
        type: "fillings",
        name: "Начинка",
        title: "Добавьте начинку по вкусу"
    },
    {
        id: 6,
        type: "ready",
        name: "Готово",
        title: "Проверьте и добавьте в корзину"
    }
];
