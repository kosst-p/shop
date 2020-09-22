class PubSub {
    constructor() {
        this.listeners = {};
    }

    subscribeByEvent(type, callback) {
        //subscribe
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }

    fireEvent(type, data) {
        // publisher
        if (type && this.listeners.hasOwnProperty(type)) {
            this.listeners[type].forEach(callback => {
                callback(data);
            });
        }
    }
}

const pubSub = new PubSub();
