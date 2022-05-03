import { displayMessage } from "../generalFunctions/displayMessage.js";
import { formatPrice } from "../generalFunctions/formatPrice.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { getFromStorage, saveToStorage, productKey } from "../storage/storage.js";
import { renderMenu } from "../generalFunctions/renderMenu.js";
import { renderCartQuantity } from "../generalFunctions/renderCartQuantity.js";


renderMenu();
scrollToTop();


const itemsSavedInStorage = getFromStorage(productKey);

renderCartItems(itemsSavedInStorage);


if (itemsSavedInStorage.length === 0) {
  displayMessage("light", "Your cart is empty", ".cart-wrapper");

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
                                          <p class="col text-start">Qty. ${item.quantity}  x  ${price}</p>
                                          <p class="col text-end">${itemTotal}</p>
                                        </div>`




    total += parseFloat(item.price) * parseFloat(item.quantity);
    totalPriceContainer.innerHTML = `NOK ${formatPrice(total)} `;

    let quantity = 0;

    const cartItems = document.querySelector(".cart-quantity");
    cartItems.innerHTML = "";

    cartItems.innerHTML = quantity;

    for (let i = 0; i < itemsSavedInStorage.length; i++) {
      quantity += itemsSavedInStorage[i].quantity;
      cartItems.innerHTML = quantity;
    }
    if (quantity === 0) {
      cartItems.classList.add("visually-hidden");
    }
  })



  ///////////////////// end of foreach itemstorender loop//////////////////////////////////////

  const deleteItemBtns = document.querySelectorAll(".delete-btn")
  const minusBtns = document.querySelectorAll("#minus-btn");
  const plusBtns = document.querySelectorAll("#plus-btn");

  if (itemsToRender.length > 0) {

    // plus button event to add quantity in cart 
    plusBtns.forEach(plusBtn => {
      plusBtn.addEventListener("click", plusQuantity)
    })

    // minus button event to reduce quantity in cart 
    minusBtns.forEach(minusBtn => {
      minusBtn.addEventListener("click", minusQuantity)
    })

    // delet items from cart 
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

        if (newSavedItems.length === 0) {
          displayMessage("light", "Your cart is empty", ".cart-wrapper");
        }
      }
    }
    ///////////////////// end of delete function//////////////////////////////////////
  }

}


// plus button event to add quantity in cart 
function plusQuantity(event) {

  const cartItemContainer = document.querySelector(".cart-item-container");
  const cartTotalItemContainer = document.querySelector(".cart-total");

  const size = event.target.dataset.size;
  const id = event.target.dataset.id;

  const findCurrentAddedProduct = itemsSavedInStorage.find(product => +product.size === +size && +product.id === +id);

  findCurrentAddedProduct.quantity++;

  saveToStorage(productKey, itemsSavedInStorage)

  cartItemContainer.innerHTML = "";
  cartTotalItemContainer.innerHTML = "";

  const newSavedItems = getFromStorage(productKey)

  renderCartItems(newSavedItems);



}
///////////////////// end of pluss qunatity event//////////////////////////////////////


// minus button event to reduce quantity in cart 
function minusQuantity(event) {

  const cartItemContainer = document.querySelector(".cart-item-container");
  const cartTotalItemContainer = document.querySelector(".cart-total");

  const size = event.target.dataset.size;
  const id = event.target.dataset.id;

  const findCurrentAddedProduct = itemsSavedInStorage.find(product => +product.size === +size && +product.id === +id);

  if (findCurrentAddedProduct.quantity === 1) {
    return;
  }

  findCurrentAddedProduct.quantity--;

  saveToStorage(productKey, itemsSavedInStorage)

  cartItemContainer.innerHTML = "";
  cartTotalItemContainer.innerHTML = "";

  const newSavedItems = getFromStorage(productKey)

  renderCartItems(newSavedItems);

}
///////////////////////// end of minus quantity event//////////////////////////////////////

