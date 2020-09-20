class LocalStorageUtil {
    constructor(keyName) {
        this.keyName = keyName;
    }

    putDataToLocalStorage() {
        localStorage.setItem(this.keyName, JSON.stringify(id));
    }

    getDataFromLocalStorage() {
        const data = localStorage.getItem(this.keyName);
        if (data !== null) {
            return JSON.parse(data);
        }
        return [];
    }
}
