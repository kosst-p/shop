class App {
    constructor(props) {
        this.ROOT_RIGHT_SIDE = props.ROOT_RIGHT_SIDE;
        this.productsArray = props.productsArray;
        pubSub.subscribeByEvent("typeChanged", this.onTypeChanged.bind(this));
        pubSub.subscribeByEvent("inBasket", this.checkProdInLS.bind(this));
    }

    checkProdInLS(data) {
        const basketFromLS = localStorageUtil.getDataFromLocalStorage();

        let found = false; // флаг проверки добавления
        for (let i = 0; i < basketFromLS.length; i++) {
            if (basketFromLS[i].id === data.id) {
                basketFromLS[i].quantity += data.quantity;
                basketFromLS[i].total += data.quantity * data.price;
                found = true; // нашли искомый элемент и обновили его, изменили флаг
                break;
            }
        }
        // если не нашли, добавляем новый элемент
        if (!found) {
            basketFromLS.push(data);
        }
        localStorageUtil.putDataToLocalStorage(basketFromLS);
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
            acc.appendChild(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек
    }

    async firstPageLoading() {
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
            acc.appendChild(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек
    }
}

const app = new App({
    ROOT_RIGHT_SIDE: ROOT_RIGHT_SIDE, // в какой родительский враппер вставляем контент
    productsArray: productsType
});

app.firstPageLoading();
