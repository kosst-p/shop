class FetchApi {
    constructor() {
        this.fetchData = this.fetchData.bind(this);
    }

    static async fetchDataProducts(url) {
        try {
            let response = await fetch(url);
            if (response.ok) {
                let data = await response.json();
                const products = data.menu;
                return products;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
