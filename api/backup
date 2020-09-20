class FetchApi {
    constructor(props) {
        this.url = props.URL;
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData(typeProduct) {
        try {
            let response = await fetch(this.url);
            if (response.ok) {
                let data = await response.json();
                const products = data.menu.filter(product => {
                    if (typeProduct === product.category) return product;
                });
                return products;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
const request = new FetchApi({ URL });
