class App {
    constructor(props) {
        this.ROOT_RIGHT_SIDE = props.ROOT_RIGHT_SIDE;
        this.productsArray = props.productsArray;
        pubSub.subscribeByEvent("typeChanged", this.onTypeChanged.bind(this));
        pubSub.subscribeByEvent(
            "addProductInBasket",
            this.addToBasket.bind(this)
        );
        pubSub.subscribeByEvent(
            "deleteProductFromBasket",
            this.deleteFromBasket.bind(this)
        );
    }

    addToBasket(product) {
        const basket = localStorageUtil.getDataFromLocalStorage();
        let updBasket = [];
        let updTotalPrice = 0;
        let found = false; // флаг проверки добавления
        for (let i = 0; i < basket.products.length; i++) {
            if (basket.products[i].id === product.id) {
                basket.products[i].quantity += product.quantity;
                basket.products[i].total += product.quantity * product.price;
                found = true; // нашли искомый элемент и обновили его, изменили флаг
                break;
            }
        }
        // если не нашли, добавляем новый элемент
        if (!found) {
            basket.products.push(product);
        }
        updBasket = basket.products;
        updTotalPrice += product.quantity * product.price + basket.totalPrice;
        updBasket = localStorageUtil.putDataToLocalStorage({
            products: updBasket,
            totalPrice: updTotalPrice
        });
    }

    deleteFromBasket(id) {
        const basket = localStorageUtil.getDataFromLocalStorage();
        const updBasket = basket.products.filter(item => {
            if (item.id !== id) {
                return item;
            }
        });

        let updTotalPrice = 0;
        updBasket.forEach(element => {
            updTotalPrice += element.total;
        });

        localStorageUtil.putDataToLocalStorage({
            products: updBasket,
            totalPrice: updTotalPrice
        });
    }

    async onTypeChanged(params) {
        this.ROOT_RIGHT_SIDE.innerHTML = "";

        const products = await FetchApi.fetchDataProducts(URL);
        const markets = await FetchApi.fetchDataMarkets(URL);

        let desiredType = ""; // искомый тип продукта

        this.productsArray.forEach(item => {
            if (item.id === +params.id) {
                desiredType = item.type;
            }
        });

        const filteredProducts = products
            .filter(product => desiredType === product.category)
            .map(product => {
                const {
                    id,
                    market,
                    name,
                    description,
                    category,
                    image,
                    price,
                    type
                } = product;

                const marketImg = markets[market].image;

                const filteredProduct = new ProductItem({
                    id,
                    marketImg,
                    name,
                    description,
                    category,
                    image,
                    price,
                    type
                });
                return filteredProduct;
            });

        filteredProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек
    }

    async startLoadingProducts() {
        const products = await FetchApi.fetchDataProducts(URL);
        const markets = await FetchApi.fetchDataMarkets(URL);

        const allProducts = products.map(product => {
            const {
                id,
                market,
                name,
                description,
                category,
                image,
                price,
                type
            } = product;
            const marketImg = markets[market].image;
            return new ProductItem({
                id,
                marketImg,
                name,
                description,
                category,
                image,
                price,
                type
            });
        });

        allProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек
    }
}

const app = new App({
    ROOT_RIGHT_SIDE: ROOT_RIGHT_SIDE, // в какой родительский враппер вставляем контент
    productsArray: productsType
});

app.startLoadingProducts();
