class ModalTitle {
    constructor() {
        this.titleContent = "Выберите размер сэндвича";
        this.ROOT_MODAL_TITLE = ROOT_MODAL_TITLE;
        pubSub.subscribeByEvent("openModal", this.render.bind(this));
        pubSub.subscribeByEvent(
            "ingredientChanged",
            this.changeTitle.bind(this)
        );
        pubSub.subscribeByEvent("ingredientChanged", this.render.bind(this));
        pubSub.subscribeByEvent(
            "loadPreOrderLayout",
            this.changeTitle.bind(this)
        );
        pubSub.subscribeByEvent("loadPreOrderLayout", this.render.bind(this));
    }

    changeTitle(title) {
        this.titleContent = title;
    }
    createContent() {
        const span = document.createElement("span");
        span.textContent = this.titleContent;
        return span;
    }

    render() {
        this.ROOT_MODAL_TITLE.innerHTML = "";
        this.ROOT_MODAL_TITLE.append(this.createContent());
    }
}

const modalTitle = new ModalTitle();
