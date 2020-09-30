class Modal {
    constructor(props) {
        this.ROOT_MODAL_WINDOW = document.querySelector(".modal");
        this.closeBtn = document.querySelector(".modal-close-btn");

        /* открытие модального окна*/
        pubSub.subscribeByEvent("checkModalWindow", () => {
            this.eventOpenModal();
        });
    }

    eventOpenModal() {
        pubSub.fireEvent("openedModal", this); // пользовательское событие
    }

    eventCloseModal() {
        this.closeBtn.addEventListener("click", e => {
            pubSub.fireEvent("closedModal", this); // пользовательское событие
        });
    }

    open() {
        this.ROOT_MODAL_WINDOW.classList.add("open");
    }

    close() {
        this.ROOT_MODAL_WINDOW.classList.remove("open");
    }
}

const modal = new Modal();
modal.eventCloseModal();
