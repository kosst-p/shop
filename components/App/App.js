class App {
    constructor(props) {
        this.ROOT_RIGHT_SIDE = props.ROOT_RIGHT_SIDE;
    }

    onTypeChanged() {
        document.addEventListener("typeChanged", function(event) {
            console.log(event.target);
        });
    }
}
const app = new App({
    ROOT_RIGHT_SIDE: ROOT_RIGHT_SIDE
});
app.onTypeChanged();
