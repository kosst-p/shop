class Modal {
    constructor() {
        this.closeBtn = document.querySelector(".modal-close-btn");
        this.modalContent = document.querySelector(".modal-content");
        this.prevButton = document.querySelector(".prev");
        this.nextButton = document.querySelector(".next");
        this.ROOT_MODAL_WINDOW = ROOT_MODAL_WINDOW;
        this.ROOT_INGREDIENT_TYPES = ROOT_INGREDIENT_TYPES;
        this.ROOT_MODAL_TITLE = ROOT_MODAL_TITLE;
        this.ROOT_MODAL_PRICE = ROOT_MODAL_PRICE;
        this.ROOT_MODAL_BUTTONS_WRAPPER = ROOT_MODAL_BUTTONS_WRAPPER;
        this.ROOT_INGREDIENTS_WRAPPER = ROOT_INGREDIENTS_WRAPPER;
    }

    closeModal() {
        this.ROOT_MODAL_WINDOW.addEventListener("click", e => {
            if (
                e.target === this.closeBtn ||
                !e.target.closest(".modal-content")
            ) {
                this.ROOT_INGREDIENT_TYPES.innerHTML = "";
                this.ROOT_MODAL_TITLE.innerHTML = "";
                this.ROOT_MODAL_PRICE.innerHTML = "";
                this.ROOT_MODAL_BUTTONS_WRAPPER.innerHTML = "";
                this.ROOT_INGREDIENTS_WRAPPER.innerHTML = "";
                this.ROOT_MODAL_WINDOW.classList.remove("open");
            }
        });
    }
}

const modal = new Modal();
modal.closeModal();
