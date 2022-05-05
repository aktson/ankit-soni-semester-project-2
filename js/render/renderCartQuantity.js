export function renderCartQuantity(itemsSavedInStorage) {
    if (itemsSavedInStorage) {
        let totalQuantity = 0;

        const cartItems = document.querySelector(".cart-quantity");
        cartItems.innerHTML = "";

        for (let i = 0; i < itemsSavedInStorage.length; i++) {

            totalQuantity += itemsSavedInStorage[i].quantity;

            cartItems.classList.remove("visually-hidden");
            cartItems.innerHTML = totalQuantity;

        }
        if (totalQuantity === 0) {
            cartItems.classList.add("visually-hidden");
        }
    }


}