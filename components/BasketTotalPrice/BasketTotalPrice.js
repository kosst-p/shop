class BasketTotalPrice {
    constructor(props) {
        this.totalPrice = props.totalPrice;
    }

    render() {
        const span = document.createElement("span");
        span.textContent = `Итого: ${this.totalPrice} руб.`;
        return span;
    }
}
