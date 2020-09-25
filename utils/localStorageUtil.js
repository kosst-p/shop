class LocalStorageUtil {
    constructor() {
        this.basket = "basket";
        this.ingredients = "ingredients";
    }

    putBasketToLocalStorage(params) {
        const basket = {
            products: params.products,
            totalPrice: params.totalPrice
        };
        localStorage.setItem(this.basket, JSON.stringify(basket));
    }

    getBasketFromLocalStorage() {
        const data = localStorage.getItem(this.basket);
        if (data !== null) {
            return JSON.parse(data);
        }
        return {
            products: [],
            totalPrice: 0
        };
    }

    checkBasketFromLocalStorage() {
        return localStorage.getItem(this.basket);
    }

    removeBasketFromLocalStorage() {
        localStorage.removeItem(this.basket);
    }

    putPreOrderToLocalStorage(params) {
        const preOrder = {
            products: params.products,
            totalPrice: params.totalPrice
        };
        localStorage.setItem(this.basket, JSON.stringify(preOrder));
    }

    getPreOrderFromLocalStorage() {
        const data = localStorage.getItem(this.ingredients);
        if (data !== null) {
            return JSON.parse(data);
        }
        return {
            productName: "",
            productImg: "",
            ingredientsItem: {
                sizes: "", // one
                breads: "", // one
                vegetables: [], // many
                sauces: [], // many, limit 3
                fillings: [] // many
            },
            totalPrice: 0,
            prevPrice: 0
        };
    }
}
const localStorageUtil = new LocalStorageUtil();
