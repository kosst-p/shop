class LocalStorageUtil {
    constructor() {
        this.basket = "basket";
        this.ingredients = "ingredients";
    }

    putDataToLocalStorage(params) {
        const basket = {
            products: params.products,
            totalPrice: params.totalPrice
        };
        localStorage.setItem(this.basket, JSON.stringify(basket));
    }

    getDataFromLocalStorage() {
        const data = localStorage.getItem(this.basket);
        if (data !== null) {
            return JSON.parse(data);
        }
        return {
            products: [],
            totalPrice: 0
        };
    }

    checkDataFromLocalStorage() {
        return localStorage.getItem(this.basket);
    }

    removeDataFromLocalStorage() {
        localStorage.removeItem(this.basket);
    }
}
const localStorageUtil = new LocalStorageUtil();
