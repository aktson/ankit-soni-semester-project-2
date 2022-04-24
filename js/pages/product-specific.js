import { displayMessage } from "../generalFunctions/displayMessage.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { baseUrl } from "../settings.js";
import { getFromStorage, saveToStorage, productKey } from "../storage/storage.js";


scrollToTop();

const itemsSavedInStorage = getFromStorage(productKey);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");



(async function fetchProduct() {

  const url = baseUrl + `/products/${id}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const results = await response.json();
      renderSpecificPropduct(results);

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

  document.title = result.title;

  let cssClass = "visually-hidden";

  const isItemInStorage = itemsSavedInStorage.find(function (fav) {
    console.log(fav)
    return parseInt(fav.id) === result.id;
  })

  if (isItemInStorage) {
    cssClass = "";
  }

  const productContainer = document.querySelector("#product-container");

  const imgUrl = baseUrl + result.image.url;
  const altText = result.image.alternativeText;
  productContainer.innerHTML = "";

  productContainer.innerHTML = `<div class="col-md-8" style ="background: url('${imgUrl}') no-repeat center;background-size: cover; min-height:500px;" >
                                  <span role="img" aria-label=${altText}></span>
                                </div>
                                <div class="col-md-4"> 
                                    <h2>${result.title}</h2> 
                                    <p class="price" >NOK ${result.price} <span class = "badge ${cssClass}"><i class="fa-solid fa-circle-check me-2"></i> In the cart</span></p>
                                    <button class="add-to-cart" data-title="${result.title}" data-id=${result.id} data-price="${result.price}" data-image="${imgUrl}" data-bs-toggle="modal" data-bs-target="#exampleModal">Add to cart</button>
                                    <button class="delete-btn ${cssClass}" data-id=${result.id}>Remove item</button>
                                    <p>${result.description}</p>
                                </div>
                                </div>`;


  const addTocartBtn = document.querySelector(".add-to-cart");
  addTocartBtn.addEventListener("click", addToCart);



  const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteFromCart);

}

//add item to cart

function addToCart(event) {


  const image = event.target.dataset.image;
  const title = event.target.dataset.title;
  const price = event.target.dataset.price;
  const id = +event.target.dataset.id;
  let quantity = 1;

  let currentAddedProduct = getFromStorage(productKey);


  const findCurrentAddedProduct = currentAddedProduct.find(function (product) {
    return parseInt(product.id) === id;
  })


  if (!findCurrentAddedProduct) {
    const product = { id, title, price, image, quantity };

    currentAddedProduct.push(product);

    saveToStorage(productKey, currentAddedProduct);

    const deleteBtn = document.querySelector(".delete-btn");
    const badge = document.querySelector(".badge");

    deleteBtn.classList.remove("visually-hidden");
    badge.classList.remove("visually-hidden");

    const modalTitle = document.querySelector(".modal-body");
    modalTitle.innerHTML = `<div class ="modal-body-content">
                              <img src="${image}" class="modal-body-content__image"/>
                              <h5>${title}</h5>
                              <p class="ms-auto">${price}</p>
                            </div>  
                           <a href="cart.html" class="btn btn-primary">Proceed to cart</a>`;

  } else {
    const findCurrentAddedProduct = currentAddedProduct.find(product => parseInt(product.id) === id);

    if (findCurrentAddedProduct) {

      for (let i = 0; i < currentAddedProduct.length; i++) {
        currentAddedProduct[i].quantity++;
        console.log(quantity)
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