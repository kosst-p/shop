const URL = "../data/data.json";

const APP = document.querySelector(".app");
const ROOT_PRODUCT_TYPES = document.querySelector(".product-types");
const ROOT_RIGHT_SIDE = document.querySelector(".right-side");
const BASKET = document.querySelector(".basket-wrapper");
const MODAL_WINDOW = document.querySelector(".modal");

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
    { type: "sizes", name: "Размер", title: "Выберите размер сэндвича" },
    { type: "breads", name: "Хлеб", title: "Хлеб для сэндвича на выбор" },
    {
        type: "vegetables",
        name: "Овощи",
        title: "Дополнительные овощи бесплатно"
    },
    {
        type: "sauces",
        name: "Соусы",
        title: "Выберите 3 бесплатных соуса по вкусу"
    },
    {
        type: "fillings",
        name: "Начинка",
        title: "Добавьте начинку по вкусу"
    },
    {
        type: "ready",
        name: "Готово",
        title: "Проверьте и добавьте в корзину"
    }
];
