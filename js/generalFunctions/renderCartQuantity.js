import { getFromStorage, productKey } from "../storage/storage.js";

const itemsSavedInStorage = getFromStorage(productKey);


export function renderCartQuantity() {
    let totalQuantity = 0;

    const cartItems = document.querySelector(".cart-quantity");
    cartItems.innerHTML = "";

    for (let i = 0; i < itemsSavedInStorage.length; i++) {

        totalQuantity += itemsSavedInStorage[i].quantity;

        cartItems.innerHTML = totalQuantity;

    }
    if (totalQuantity === 0) {
        cartItems.classList.add("visually-hidden");
    }
}