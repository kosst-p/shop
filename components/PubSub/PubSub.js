class PubSub {
    constructor() {
        this.listeners = {};
    }

    subscribeByEvent(type, callback) {
        //subscribe
        // console.log(this.listeners);
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }

    fireEvent(type, data) {
        // publisher
        if (type && this.listeners.hasOwnProperty(type)) {
            this.listeners[type].forEach(callback => {
                callback(data);
            });
        }
    }
}

const pubSub = new PubSub();

/* список пользовательских событий:
productTypeChanged - смена продуктов на странице относительно выбранной позиции в списке
ingredientTypeChanged - смена ингредиентов в модальном окне относительно выбранной позиции в списке
addProductInBasket - добавление продукта в корзину
deleteProductFromBasket - удаление продукта из корзины
openModal - открытие модального окна
loadPreOrderLayout - загрузка шаблона с выбранными компонентами для продукта
*/
