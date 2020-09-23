class Modal {
    constructor() {
        this.closeBtn = document.querySelector(".modal-close-btn");
        this.modalContent = document.querySelector(".modal-content");
    }

    closeModal() {
        MODAL_WINDOW.addEventListener("click", e => {
            if (e.target === this.closeBtn || e.target !== this.modalContent)
                MODAL_WINDOW.classList.remove("open");
        });
    }
}

const modal = new Modal();
modal.closeModal();
