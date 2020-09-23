class LocalStorageUtil {
    constructor() {
        this.keyName = "basket";
    }

    putDataToLocalStorage(data) {
        localStorage.setItem(this.keyName, JSON.stringify(data));
    }

    getDataFromLocalStorage() {
        const data = localStorage.getItem(this.keyName);
        if (data !== null) {
            return JSON.parse(data);
        }
        return [];
    }
}
const localStorageUtil = new LocalStorageUtil();
