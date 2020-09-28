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
        pubSub.subscribeByEvent(
            "setChangedIngredients",
            this.onSetChangedIngredients.bind(this)
        );
        this.changedIngredients = [];
    }

    onSetChangedIngredients(data) {
        this.changedIngredients = data;
    }

    // загрузка продуктов на страницу относительно выбранного типа из списка
    async onProductTypeChanged(currentType) {
        this.ROOT_RIGHT_SIDE.innerHTML = "";

        const products = await FetchApi.fetchDataProducts(URL);
        const markets = await FetchApi.fetchDataMarkets(URL);

        const filteredProducts = products
            .filter(product => currentType.category === product.category)
            .map(product => {
                const {
                    id,
                    market,
                    name,
                    description,
                    category,
                    image,
                    price,
                    type,
                    ingredientsRule
                } = product;

                const marketImg = markets[market].image;

                const instanceProductItem = new ProductItem({
                    id,
                    marketImg,
                    name,
                    description,
                    category,
                    image,
                    price,
                    type,
                    ingredientsRule, // ?
                    ingredientsType: this.ingredientsType
                });

                return instanceProductItem;
            });
        console.log(filteredProducts);
        filteredProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек продукта
    }

    // загрузка ингредиентов в модальном окне относительно выбранного типа из списка
    async onIngredientChanged(currentType) {
        const fetchData = await FetchApi.fetchDataIngredients(URL);
        const filteredIngredients = [];
        for (const key in fetchData[currentType.category]) {
            const { id, name, price, description, image } = fetchData[
                currentType.category
            ][key];
            if (fetchData[currentType.category].hasOwnProperty(key)) {
                filteredIngredients.push(
                    new IngredientItem({
                        id,
                        name,
                        price,
                        description,
                        image,
                        category: currentType.category,
                        changedIngredients: this.changedIngredients
                    })
                );
            }
        }
        filteredIngredients.reduce((acc, child) => {
            acc.append(child.render()); // ?
            return acc;
        }, this.ROOT_INGREDIENTS_WRAPPER); // рендер карточек ингредиент
    }

    // начальная(первая) загрузка страницы. получение всего списка продуктов
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
                type,
                ingredientsRule // ?
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
                type,
                ingredientsRule,
                ingredientsType: this.ingredientsType
            });
        });
        allProducts.reduce((acc, child) => {
            acc.append(child.render());
            return acc;
        }, this.ROOT_RIGHT_SIDE); // рендер карточек продукта
    }
}

const app = new App({
    ROOT_RIGHT_SIDE: ROOT_RIGHT_SIDE, // в какой родительский враппер вставляем карточки продукта
    ROOT_INGREDIENTS_WRAPPER: ROOT_INGREDIENTS_WRAPPER, // в какой родительский враппер вставляем карточки ингредиента
    productsType: productsType, // для построения ul
    ingredientsType: ingredientsType // для построения ul
});

app.startLoadingProducts();
