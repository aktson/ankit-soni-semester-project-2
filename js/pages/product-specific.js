import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderMenu } from "../generalFunctions/renderMenu.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { baseUrl } from "../settings.js";
import { getFromStorage, saveToStorage, productKey } from "../storage/storage.js";


scrollToTop();
renderMenu();

const itemsSavedInStorage = getFromStorage(productKey);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");


(async function fetchProduct() {

  const url = baseUrl + `api/items/${id}?populate=*`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const results = await response.json();

      renderSpecificPropduct(results.data);


    } else {
      throw new Error(response.statusText);
    }

  }
  catch (error) {
    console.log(error);
    displayMessage("danger", "Unknown error occured", "#product-container");
  }

})();


function renderSpecificPropduct(result) {

  let cssClass = "visually-hidden";

  const isItemInStorage = itemsSavedInStorage.find(function (fav) {
    return parseInt(fav.id) === result.id;
  })

  if (isItemInStorage) {
    cssClass = "";
  }

  const productContainer = document.querySelector("#product-container");

  const title = result.attributes.title;
  const price = result.attributes.price;
  const description = result.attributes.description;
  const img = result.attributes.image.data.attributes.url;
  const altText = result.attributes.image_alttext;

  document.title = `${title} | e-commerce`;

  productContainer.innerHTML = "";

  productContainer.innerHTML = `<div class="col-lg-8" style ="background: url('${img}') no-repeat center;background-size: cover; min-height:500px;" >
                                    <span role="img" aria-label=${altText}></span>
                                  </div>
                                  <div class="col-lg-4 product-content"> 
                                      <h2>${title}</h2> 
                                      <p class="price" >NOK ${price} <span class = "badge ${cssClass}"><i class="fa-solid fa-circle-check me-2"></i> In the cart</span></p>
                                      <select aria-label=".form-select-sm " class="size">
                                          <option value="">Select size</option>
                                          <option value="41">41</option>
                                          <option value="42">42</option>
                                          <option value="43">43</option>
                                          <option value="44">44</option>
                                          <option value="45">45</option>
                                        </select>
                                      <button class="add-to-cart" data-title="${title}" data-id=${result.id} data-size="${result.size}" data-price="${price}" data-image="${img}" data-bs-toggle="modal" data-bs-target="#exampleModal">Add to cart</button>
                                      <button class="delete-btn ${cssClass}" data-id=${result.id} >Remove item</button>
                                      <p>${description}</p>
                                  </div>
                                  </div>`;


  const addTocartBtn = document.querySelector(".add-to-cart");
  addTocartBtn.addEventListener("click", addToCart);


  const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteFromCart);

}




//add item to cart
function addToCart(event) {


  //modal to show item added to cart
  const modalTitle = document.querySelector(".modal-title")
  const modalBody = document.querySelector(".modal-body");

  modalTitle.innerHTML = "";
  modalBody.innerHTML = "";

  //size select to get value on user input
  const size = document.querySelector(".size").value;


  const image = event.target.dataset.image;
  const title = event.target.dataset.title;
  const price = event.target.dataset.price;
  const id = +event.target.dataset.id;
  let quantity = 1;

  let currentAddedProduct = getFromStorage(productKey);

  const findCurrentAddedProduct = currentAddedProduct.find(function (product) {
    return parseInt(product.id) === id;
  })

  //check if user have choose the size else give message
  if (!size) {
    const modalTitle = document.querySelector(".modal-title")
    modalTitle.innerHTML = `<p class="ms-auto">Please select size</p>`

  }

  //if user have choosen size then let user add the product and show modal with added product
  else if (size) {

    if (!findCurrentAddedProduct) {
      const product = { id, title, price, image, quantity, size };

      currentAddedProduct.push(product);

      saveToStorage(productKey, currentAddedProduct);

      const deleteBtn = document.querySelector(".delete-btn");
      const badge = document.querySelector(".badge");

      deleteBtn.classList.remove("visually-hidden");
      badge.classList.remove("visually-hidden");

      modalTitle.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i><p>Added to cart</p>`
      modalBody.innerHTML = `<div class ="modal-body-content">
                                <img src="${image}" class="modal-body-content__image"/>
                                <div>
                                    <h5>${title}</h5>
                                    <p>Size: ${size}</p>
                                </div>
                                <p class="ms-auto">NOK ${price}</p>
                              </div>  
                              <button type="button" class="btn btn-outline-primary btn-sm me-2" data-bs-dismiss="modal" aria-label="Close">Continue Shopping</button>
                              <a href = "cart.html" class="btn btn-primary btn-sm"> Proceed to cart</a >`;

    }

    //check if size matches if user adds same product again
    else {

      const findCurrentAddedProduct = currentAddedProduct.find(product => parseInt(product.size) === parseInt(size));

      //if size does not match from item stored in storage then push new product with new size, show modal with new added product
      if (!findCurrentAddedProduct) {
        const product = { id, title, price, image, quantity, size };

        currentAddedProduct.push(product);

        modalTitle.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i><p> Added to cart</p>`
        modalBody.innerHTML = `<div class ="modal-body-content">
                                  <img src="${image}" class="modal-body-content__image"/>
                                  <div>
                                    <h5>${title}</h5>
                                    <p class="free-delivery">Size: ${size}</p>
                                  </div>
                                  <p class="ms-auto">NOK ${price}</p>
                                </div>  
                                <button type="button" class="btn btn-outline-primary btn-sm me-2" data-bs-dismiss="modal" aria-label="Close">Continue Shopping</button>
                                <a href = "cart.html" class="btn btn-primary btn-sm"> Proceed to cart</a >`;

        saveToStorage(productKey, currentAddedProduct);

      }
      //if size matches then increase quantity with one and show modal that product is in cart already
      else {
        findCurrentAddedProduct.quantity++;
        modalTitle.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i><p>Already in cart</p>`
        saveToStorage(productKey, currentAddedProduct)
      }

    }

  }

}

// delete item from cart
function deleteFromCart(event) {

  const id = +event.target.dataset.id;

  const findItemToDelete = itemsSavedInStorage.filter(function (item) {
    return parseInt(item.id) !== id;
  });

  let doRemove = window.confirm("are your sure?");

  if (doRemove) {
    const badge = document.querySelector(".badge");

    saveToStorage(productKey, findItemToDelete);

    event.target.classList.add("visually-hidden");
    badge.classList.add("visually-hidden");

  }

}