import { displayMessage } from "../generalFunctions/displayMessage.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { getFromStorage, saveToStorage, productKey } from "../storage/storage.js";


scrollToTop();


const itemsSavedInStorage = getFromStorage(productKey);

const backBtnContainer = document.querySelector(".back-btn-container");

if (itemsSavedInStorage.length === 0) {
  displayMessage("light", "Nothing in cart yet", ".cart-wrapper");

}

function renderCartItems(itemsToRender) {

  const cartItemContainer = document.querySelector(".cart-item-container");
  const cartTotalItemContainer = document.querySelector(".cart-total");
  const totalPriceContainer = document.querySelector(".total-price-container");

  let total = 0;

  itemsToRender.forEach(item => {

    cartItemContainer.innerHTML += `<div class="cart-item">
                                      <img src="${item.image}" class="cart-item-image" alt="${item.title}" />
                                      <h4>${item.title}</h4>
                                      <p class="cart-price">NOK ${item.price}</p>
                                      <small class="free">
                                        <i class="fa-solid fa-check"></i>
                                        free delivery
                                      </small>
                                      <i class="fa-solid fa-trash-can delete-btn"  data-id=${item.id}></i>
                                      </div>`

    cartTotalItemContainer.innerHTML += `<div class="cart-total-item">
                                          <p>${item.title}</p>
                                          <p>${item.price}</p>
                                        </div>`


    total += parseFloat(item.price)
    totalPriceContainer.innerHTML = total;
  })

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