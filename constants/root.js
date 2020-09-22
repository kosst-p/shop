const URL = "../data/data.json";

const APP = document.querySelector(".app");
const ROOT_PRODUCT_TYPES = document.querySelector(".product-types");
const ROOT_RIGHT_SIDE = document.querySelector(".right-side");
const BASKET = document.querySelector(".basket");

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
