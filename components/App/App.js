class App {
    constructor(props) {
        this.ROOT_RIGHT_SIDE = props.ROOT_RIGHT_SIDE;
    }

    onTypeChanged(data) {
        this.ROOT_RIGHT_SIDE.innerHTML = "";
        document.addEventListener("typeChanged", async event => {
            const products = await data;
            console.log(products);
            products.map(product => {
                const {
                    name,
                    description,
                    category,
                    image,
                    price,
                    type
                } = product;
                new ProductItem({
                    name,
                    description,
                    category,
                    image,
                    price,
                    type
                }).render();
            });
        });
    }
}
const app = new App({
    ROOT_RIGHT_SIDE: ROOT_RIGHT_SIDE
});

app.onTypeChanged(dataApi);
