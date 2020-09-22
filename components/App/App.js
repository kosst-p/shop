class App {
    constructor(props) {
        this.ROOT_RIGHT_SIDE = props.ROOT_RIGHT_SIDE;
        this.productsArray = props.productsArray;

        pubSub.subscribeByEvent("typeChanged", this.onTypeChanged.bind(this));
    }

    async onTypeChanged(params) {
        this.ROOT_RIGHT_SIDE.innerHTML = "";

        const products = await FetchApi.fetchDataProducts(URL);

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
                    name,
                    description,
                    category,
                    image,
                    price,
                    type
                } = product;
                const filteredProduct = new ProductItem({
                    id,
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
        const allProducts = products.map(product => {
            const {
                id,
                name,
                description,
                category,
                image,
                price,
                type
            } = product;
            return new ProductItem({
                id,
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
