class App {
    constructor(props) {
        this.ROOT_RIGHT_SIDE = props.ROOT_RIGHT_SIDE;
        this.ROOT_INGREDIENTS_WRAPPER = props.ROOT_INGREDIENTS_WRAPPER;
        this.productsType = props.productsType;
        this.ingredientsType = ingredientsType;
        pubSub.subscribeByEvent(
            "productTypeChanged",
            this.onProductTypeChanged.bind(this)
        );
        pubSub.subscribeByEvent(
            "ingredientTypeChanged",
            this.onIngredientChanged.bind(this)
        );
        pubSub.subscribeByEvent(
            "openModal",
            this.onIngredientChanged.bind(this)
        );
    }

    async onProductTypeChanged(params) {
        this.ROOT_RIGHT_SIDE.innerHTML = "";

        const products = await FetchApi.fetchDataProducts(URL);
        const markets = await FetchApi.fetchDataMarkets(URL);

        let desiredType = ""; // искомый тип продукта

        this.productsType.forEach(item => {
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
        console.log(filteredProducts);
        filteredProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек продукта
    }

    async onIngredientChanged(params) {
        const fetchData = await FetchApi.fetchDataIngredients(URL);
        let desiredType = ""; // искомый тип ингредиента
        this.ingredientsType.forEach(item => {
            if (item.id === +params.id) {
                desiredType = item.type;
            }
        });
        console.log(desiredType);
        const filteredIngredients = [];
        for (const key in fetchData[desiredType]) {
            const { id, name, price, description, image } = fetchData[
                desiredType
            ][key];
            if (fetchData[desiredType].hasOwnProperty(key)) {
                filteredIngredients.push(
                    new IngredientItem({ id, name, price, description, image })
                );
            }
        }
        filteredIngredients.reduce((acc, child) => {
            acc.append(child.render()); // ?
            return acc;
        }, this.ROOT_INGREDIENTS_WRAPPER); // рендер карточек ингредиент
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
    ROOT_RIGHT_SIDE: ROOT_RIGHT_SIDE, // в какой родительский враппер вставляем карточки продукта
    ROOT_INGREDIENTS_WRAPPER: ROOT_INGREDIENTS_WRAPPER, // в какой родительский враппер вставляем карточки ингредиента
    productsType: productsType, // для построения ul
    ingredientsType: ingredientsType // для построения ul
});

app.startLoadingProducts();
