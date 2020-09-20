class ProductItem {
    constructor(props) {
        this.dataIndex = props.index;
        this.name = props.name;
        this.description = props.description;
        this.category = props.category;
        this.image = props.image;
        this.price = props.price;
        this.type = props.type;
        // this.quant = props.quant;
        this.quantity = 1;
        this.events = this.events.bind(this);
        this.render = this.render.bind(this);
        this.ROOT_RIGHT_SIDE = ROOT_RIGHT_SIDE;
    }

    increaseQuantity() {
        this.quantity = this.quantity + 1;
        console.log(this.quantity);
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity -= 1;
        }
        console.log(this.quantity);
    }

    events() {
        this.ROOT_RIGHT_SIDE.addEventListener("click", e => {
            if (
                e.target.getAttribute("data-atr") === "inBasket" &&
                e.target.getAttribute("data-index") === this.dataIndex
            ) {
                // вызвать ререндер корзины
            }
            if (
                e.target.getAttribute("data-atr") === "increase" &&
                e.target.getAttribute("data-index") === `data-${this.dataIndex}`
            ) {
                this.increaseQuantity();
                // увеличение на 1
            }
            if (
                e.target.getAttribute("data-atr") === "decrease" &&
                e.target.getAttribute("data-index") === `data-${this.dataIndex}`
            ) {
                this.decreaseQuantity();
                // уменьшение на 1
            }
        });
    }

    //   getTemplate() {
    //       return `<div class="item-wrapper index-${this.dataIndex}" data-index=${this.dataIndex} data-name="${this.name}">
    //     <div class="item-wrapper__img"><img src="data${this.image}" alt="${this.category}"></div>
    //     <div class="item-wrapper__name">${this.name}</div>
    //     <div class="item-wrapper__description" data-atr="${this.type}">${this.description}</div>
    //     <div class="item-wrapper__price">Цена: ${this.price} руб.</div>
    //     <div class="item-wrapper__count">
    //         <span>Количество</span>
    //       <div class="item-count__button">
    //         <button class="btn-count" data-atr="decrease">
    //           <i class='fas fa-minus' data-atr='decrease'></i>
    //         </button>
    //         <span class="item-count__field">${this.quantity}</span>
    //         <button class="btn-count" data-atr="increase">
    //           <i class='fas fa-plus' data-atr='increase'></i>
    //         </button>
    //       </div>
    //       <div class="item-wrapper__inbasket">
    //         <button class="btn-style basket-btn-add" data-name="${this.name}" data-atr="inBasket">
    //           В корзину
    //         </button>
    //       </div>
    //     </div>
    // </div>`;
    //   }

    render() {
        const itemWrapper = document.createElement("div");
        itemWrapper.classList.add("item-wrapper");
        itemWrapper.setAttribute("data-index", this.dataIndex);
        itemWrapper.setAttribute("data-name", this.name);
        ROOT_RIGHT_SIDE.append(itemWrapper);

        const itemImgWrapper = document.createElement("div");
        itemImgWrapper.classList.add("item-wrapper__img");
        const img = document.createElement("img");
        img.setAttribute("src", `data${this.image}`);
        itemImgWrapper.prepend(img);
        itemWrapper.prepend(itemImgWrapper);

        const nameWrapper = document.createElement("div");
        nameWrapper.classList.add("item-wrapper__name");
        nameWrapper.textContent = this.name;
        itemImgWrapper.after(nameWrapper);

        const descrWrapper = document.createElement("div");
        descrWrapper.classList.add("item-wrapper__description");
        descrWrapper.setAttribute("data-atr", this.type);
        descrWrapper.textContent = this.description;
        nameWrapper.after(descrWrapper);

        const priceWrapper = document.createElement("div");
        priceWrapper.classList.add("item-wrapper__price");
        priceWrapper.textContent = `Цена: ${this.price} руб.`;
        descrWrapper.after(priceWrapper);

        const countItemWrapper = document.createElement("div");
        countItemWrapper.classList.add("item-wrapper__count");
        priceWrapper.after(countItemWrapper);

        const countTitle = document.createElement("span");
        countTitle.textContent = "Количество";
        countItemWrapper.prepend(countTitle);

        const countButtonWrapper = document.createElement("div");
        countButtonWrapper.classList.add("item-count__button");
        countTitle.after(countButtonWrapper);

        const buttonDecrease = document.createElement("button");
        buttonDecrease.classList.add("btn-count");
        buttonDecrease.setAttribute("data-atr", "decrease");
        buttonDecrease.setAttribute("data-index", `data-${this.dataIndex}`);
        countButtonWrapper.prepend(buttonDecrease);
        const founIdescr = document.createElement("i");
        founIdescr.classList.add("fas");
        founIdescr.classList.add("fa-minus");
        founIdescr.setAttribute("data-atr", "decrease");
        founIdescr.setAttribute("data-index", `data-${this.dataIndex}`);
        buttonDecrease.prepend(founIdescr);

        const spanCount = document.createElement("span");
        spanCount.textContent = this.quantity; // тут нужно обновить!
        spanCount.classList.add("item-count__field");
        buttonDecrease.after(spanCount);

        const buttonIncrease = document.createElement("button");
        buttonIncrease.classList.add("btn-count");
        buttonIncrease.setAttribute("data-atr", "increase");
        buttonIncrease.setAttribute("data-index", `data-${this.dataIndex}`);
        spanCount.after(buttonIncrease);
        const founIinrc = document.createElement("i");
        founIinrc.classList.add("fas");
        founIinrc.classList.add("fa-plus");
        founIinrc.setAttribute("data-atr", "increase");
        founIinrc.setAttribute("data-index", `data-${this.dataIndex}`);
        buttonIncrease.prepend(founIinrc);

        const buttonBasketWrapper = document.createElement("div");
        buttonBasketWrapper.classList.add("item-wrapper__inbasket");
        countButtonWrapper.after(buttonBasketWrapper);

        const buttonInBasket = document.createElement("button");
        buttonInBasket.classList.add("btn-style");
        buttonInBasket.classList.add("basket-btn-add");
        buttonInBasket.setAttribute("data-atr", "inBasket");
        buttonInBasket.setAttribute("data-index", `data-${this.dataIndex}`);
        buttonInBasket.textContent = "В корзину";
        buttonBasketWrapper.prepend(buttonInBasket);
        return this;
    }
}
