import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderMenu } from "../render/renderMenu.js";
import { renderFooter } from "../render/renderFooter.js";
import { formatPrice } from "../generalFunctions/formatPrice.js";
import { getFromStorage, saveToStorage, productKey } from "../storage/storage.js";

import { renderCartQuantity } from "../render/renderCartQuantity.js";



renderMenu();
renderFooter();



const itemsSavedInStorage = getFromStorage(productKey);

renderCartItems(itemsSavedInStorage);
renderCartQuantity(itemsSavedInStorage);

if (itemsSavedInStorage.length === 0) {
    displayMessage("light", "Your shopping cart is empty", ".cart-wrapper");

}

function renderCartItems(itemsToRender) {

    const cartItemContainer = document.querySelector(".cart-item-container");
    const cartTotalItemContainer = document.querySelector(".cart-total");
    const totalPriceContainer = document.querySelector(".total-price-container");

    let total = 0;


    cartItemContainer.innerHTML = "";
    cartTotalItemContainer.innerHTML = "";

    itemsToRender.forEach(item => {

        const price = formatPrice(item.price);
        const itemTotal = formatPrice(item.price * item.quantity);

        cartItemContainer.innerHTML += `<div class="cart-item ">
                                      <a href="product-specific.html?id=${item.id}" class="cart-item-link"> 
                                        <img src="${item.image}" class="cart-item-image" alt="${item.title}" />
                                        <div>
                                          <h4>${item.title}</h4> 
                                          <p class="text-start">Size: ${item.size}</p>
                                        </div>
                                      </a>
                                      <div class="d-flex gap-1">
                                        <i class="fa-solid fa-circle-minus" id="minus-btn" data-size="${item.size}" data-id=${item.id}></i>  
                                        <p class="cart-price lead">${item.quantity}</p>
                                        <i class="fa-solid fa-circle-plus" id="plus-btn" data-size="${item.size}" data-id=${item.id}></i>
                                      </div>
                                      <p class="ms-auto">NOK ${price} </p>
                                      <i class="fa-solid fa-trash-can delete-btn" data-size="${item.size}" data-id=${item.id}></i>
                                    </div>`

        cartTotalItemContainer.innerHTML += `<div class="row">
                                          <p class="col text-start fw-bold">${item.title}</p>
                                          <p class="col text-start">${item.quantity}  x  ${price}</p>
                                          <p class="col text-end">${itemTotal}</p>
                                        </div>`


        total += parseFloat(item.price) * parseFloat(item.quantity);
        totalPriceContainer.innerHTML = `NOK ${formatPrice(total)} `;

        renderCartQuantity(itemsToRender)
    })
    ///////////////////// end of foreach itemstorender loop//////////////////////////////////////

    if (itemsToRender.length > 0) {

        // plus button event to add quantity in cart 
        const plusBtns = document.querySelectorAll("#plus-btn");
        plusBtns.forEach(plusBtn => {
            plusBtn.addEventListener("click", plusQuantity)
        })
        function plusQuantity(event) {

            const cartItemContainer = document.querySelector(".cart-item-container");
            const cartTotalItemContainer = document.querySelector(".cart-total");

            const size = event.target.dataset.size;
            const id = event.target.dataset.id;

            renderCartItems(itemsToRender);

            const findCurrentAddedProduct = itemsToRender.find(product => +product.size === +size && +product.id === +id);
            findCurrentAddedProduct.quantity++;

            saveToStorage(productKey, itemsToRender)
            cartItemContainer.innerHTML = "";
            cartTotalItemContainer.innerHTML = "";

            const newSavedItems = getFromStorage(productKey)

            renderCartItems(newSavedItems);
        }
        ///////////////////// end of pluss qunatity event//////////////////////////////////////

        // minus button event to reduce quantity in cart 
        const minusBtns = document.querySelectorAll("#minus-btn");
        minusBtns.forEach(minusBtn => {
            minusBtn.addEventListener("click", minusQuantity)
        })
        function minusQuantity(event) {

            const cartItemContainer = document.querySelector(".cart-item-container");
            const cartTotalItemContainer = document.querySelector(".cart-total");

            const size = event.target.dataset.size;
            const id = event.target.dataset.id;

            renderCartItems(itemsToRender)

            const findCurrentAddedProduct = itemsToRender.find(product => +product.size === +size && +product.id === +id);

            if (findCurrentAddedProduct.quantity === 1) {
                return;
            }

            findCurrentAddedProduct.quantity--;

            saveToStorage(productKey, itemsToRender)

            cartItemContainer.innerHTML = "";
            cartTotalItemContainer.innerHTML = "";

            const newSavedItems = getFromStorage(productKey)

            renderCartItems(newSavedItems);

        }
        ///////////////////////// end of minus quantity event//////////////////////////////////////

        // delet items from cart 
        const deleteItemBtns = document.querySelectorAll(".delete-btn")
        deleteItemBtns.forEach(deleteItemBtn => {
            deleteItemBtn.addEventListener("click", deleteItem)
        })

        function deleteItem(event) {

            let doDelete = window.confirm("Would you like to delete?");

            if (doDelete) {

                const size = event.target.dataset.size;
                const id = event.target.dataset.id;

                const filteritemsSavedInStorage = itemsToRender.filter(product => !(+product.size === +size && +product.id === +id))

                saveToStorage(productKey, filteritemsSavedInStorage);

                const newSavedItems = getFromStorage(productKey);

                cartItemContainer.innerHTML = "";
                cartTotalItemContainer.innerHTML = "";

                renderCartItems(newSavedItems);
                renderCartQuantity(newSavedItems);

                if (newSavedItems.length === 0) {
                    displayMessage("light", "Your shopping cart is empty", ".cart-wrapper");
                }
            }
        }
        ///////////////////// end of delete function//////////////////////////////////////
    }

}







