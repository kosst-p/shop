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
