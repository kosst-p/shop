class Store {
    constructor() {
        this.productsInStore = [];
    }

    getAllProductsFromStore() {
        return this.productsInStore;
    }

    getProductFromStoreById(id) {
        const foundProduct = this.productsInStore.find(item => item.id === id);
        return foundProduct;
    }

    setProductFromStore(addedProduct) {
        // console.log(this.productsInStore);
        const foundProduct = this.productsInStore.find(
            item => item.id === addedProduct.id
        );

        if (foundProduct) {
            for (const key in addedProduct) {
                if (addedProduct.hasOwnProperty(key)) {
                    foundProduct[key] = addedProduct[key];
                }
            }
        } else {
            this.productsInStore.push(addedProduct);
        }
        // console.log(this.productsInStore);
    }
}

const store = new Store();
