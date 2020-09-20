const URL = "../data/data.json";

const APP = document.querySelector(".app");
const ROOT_PRODUCT_TYPES = document.querySelector(".product-types");
const ROOT_RIGHT_SIDE = document.querySelector(".right-side");
const BASKET = document.querySelector(".basket");

// список типов продуктов
const productsType = [
    { id: 1, attribute: "pizza", name: "Пицца" },
    { id: 2, attribute: "shaurma", name: "Шаурма" },
    { id: 3, attribute: "sandwiches", name: "Сэндвичи" },
    { id: 4, attribute: "burgers", name: "Бургеры" },
    { id: 5, attribute: "chicken", name: "Курица & Картофель" },
    { id: 6, attribute: "salads", name: "Тортилья & Салаты" },
    { id: 7, attribute: "drinks", name: "Напитки & Десерты" }
];

// класс Input, render возвращает input
class Input {
    constructor(props) {
        this.props = props;
        this.notify = this.notify.bind(this); //биндим функцию оповещения
    }

    //ф-я оповещения, достаточно примитивно, просто принимает новое значение и устанавливает в элемент.
    notify(newValue) {
        this.element.value = newValue;
    }

    render() {
        //строим элементы, назначаем пропы и т.п.
        this.element = document.createElement("input");
        this.element.value = this.props.value || 0;
        this.element.disabled = true;
        this.props.subscribe(this.notify);
        //возвращаем элемент.
        return this.element;
    }
}

// класс Button, render возвращает button
class Button {
    constructor(props) {
        this.onClick = props.onClick; //в пропах принимаем ф-ю для click эвента
        this.value = props.value;
    }

    render() {
        this.element = document.createElement("input");
        this.element.type = "button";
        this.element.value = this.value;
        this.element.addEventListener("click", this.onClick); // назначаем на клик, эвент из пропов.
        return this.element; // возвращаем элемент.
    }
}

//родитель
class App1 {
    constructor() {
        this.count = 0;
        this.increase = this.increase.bind(this); //биндим функции.
        this.decrease = this.decrease.bind(this); //биндим функции.
        this.subscribe = this.subscribe.bind(this); //биндим функции.
        console.log(this.subscribe);
    }
    //ф-я подпики, передается в инпут, принимает коллбек ф-ю.
    subscribe(newSub) {
        this.subscriber = newSub;
    }
    //ф-я оповещения подписчика
    notify() {
        this.subscriber(this.count);
    }
    //ф-я увеличения
    increase() {
        console.log(this.element);
        this.count += 1;
        this.subscriber && this.notify(this.count);
    }
    //ф-я уменьшения
    decrease() {
        this.count = this.count - 1;
        this.subscriber && this.notify(this.count); //
    }

    render() {
        // Описываем чилдренов.
        this.children = [
            new Button({
                value: "minus", //отправляем кнопке имя
                onClick: this.decrease // забинженая ф-я уменьшения count
            }),
            new Input({
                value: this.count, //отправляем инпуту стартовое значение
                subscribe: this.subscribe //отправляем инпуту ф-ю для подписки на изменение count
            }),
            new Button({
                value: "plus", //отправляем кнопке имя
                onClick: this.increase //забинженая ф-я увелиячения count
            })
        ];

        //перебираем массив чилдренов, инициируим у них render(), применяем их к родителю
        this.element = this.children.reduce((acc, child) => {
            acc.appendChild(child.render());
            return acc;
        }, document.createElement("div"));
        return this.element; // возвращаем элемент
    }
}

// document.querySelector("#root").appendChild(new App1().render()); //создаем элемент App и делаем его чилдреном #root
