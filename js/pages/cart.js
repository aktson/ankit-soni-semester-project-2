import { displayMessage } from "../generalFunctions/displayMessage.js";
import { formatPrice } from "../generalFunctions/formatPrice.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { getFromStorage, saveToStorage, productKey } from "../storage/storage.js";


scrollToTop();


const itemsSavedInStorage = getFromStorage(productKey);


if (itemsSavedInStorage.length === 0) {
  displayMessage("light", "Nothing in cart yet", ".cart-wrapper");

}

function renderCartItems(itemsToRender) {

  const cartItemContainer = document.querySelector(".cart-item-container");
  const cartTotalItemContainer = document.querySelector(".cart-total");
  const totalPriceContainer = document.querySelector(".total-price-container");
  let total = 0;


  itemsToRender.forEach(item => {

    const price = formatPrice(item.price);
    const itemTotal = formatPrice(item.price * item.quantity);



    cartItemContainer.innerHTML += `<div class="cart-item">
                                      <a href="product-specific.html?id=${item.id}" class="cart-item-link"> 
                                        <img src="${item.image}" class="cart-item-image" alt="${item.title}" />
                                        <h4>${item.title}</h4>
                                      </a>
                                      <p class="cart-price">${item.quantity} stk.</p>
                                      <p class="cart-price">NOK ${price} </p>
                                      <small class="free-delivery">
                                        <i class="fa-solid fa-check"></i>
                                        free delivery
                                      </small>
                                      <i class="fa-solid fa-trash-can delete-btn"  data-id=${item.id}></i>
                                      </div>`

    cartTotalItemContainer.innerHTML += `<div class="cart-total-item ">
                                         <p>${item.title}</p>
                                          <div class="d-flex gap-5"><p >${item.quantity} stk. * ${price}</p>
                                          <p>${itemTotal} </p></div>
                                        </div>`


    total += parseFloat(item.price) * parseFloat(item.quantity);
    totalPriceContainer.innerHTML = `NOK ${formatPrice(total)}`;

  })

  // delet items from cart 
  const deleteItemBtns = document.querySelectorAll(".delete-btn")

  if (itemsToRender.length > 0) {
    deleteItemBtns.forEach(deleteItemBtn => {

      deleteItemBtn.addEventListener("click", (event) => {

        let doDelete = window.confirm("Would you like to delete?");

        if (doDelete) {

          const id = event.target.dataset.id;

          const filteritemsSavedInStorage = itemsToRender.filter(function (item) {
            return parseInt(item.id) !== parseInt(id);
          });

          cartItemContainer.innerHTML = "";
          cartTotalItemContainer.innerHTML = "";


          saveToStorage(productKey, filteritemsSavedInStorage);

          const newSavedItems = getFromStorage(productKey);

          renderCartItems(newSavedItems);

          if (newSavedItems.length === 0) {
            displayMessage("light", "No items left in cart", ".cart-wrapper");
          }
        }
      })
    })
  }
}

renderCartItems(itemsSavedInStorage);