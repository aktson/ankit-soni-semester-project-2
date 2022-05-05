import { renderModal, showMessageWithModal } from "./modalProductSpecific.js"
import { renderCartQuantity } from "./renderCartQuantity.js";
import { getFromStorage, saveToStorage, productKey } from "../storage/storage.js";




const itemsSavedInStorage = getFromStorage(productKey);


export function renderSpecificProduct(result) {

    let cssClass = "visually-hidden";

    const isItemInStorage = itemsSavedInStorage.find(function (fav) {
        return parseInt(fav.id) === result.id;
    })

    if (isItemInStorage) {
        cssClass = "";
    }

    const productContainer = document.querySelector(".product-container");

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

    //size select to get value on user input
    const size = document.querySelector(".size").value;
    const modalBody = document.querySelector(".modal-body");

    const image = event.target.dataset.image;
    const title = event.target.dataset.title;
    const price = event.target.dataset.price;
    const id = +event.target.dataset.id;
    let quantity = 1;

    let currentAddedProduct = getFromStorage(productKey);

    const findCurrentAddedProduct = currentAddedProduct.find(function (product) {
        return parseInt(product.id) === id;
    })

    renderCartQuantity(findCurrentAddedProduct);

    //check if user have choosen the size else give message
    if (!size) {

        modalBody.innerHTML = "";
        showMessageWithModal("<i class='fa-solid fa-circle-exclamation me-2'></i>Please select size")
    }

    //if user have choosen size then let user add the product and show modal with added product
    else if (size) {

        if (!findCurrentAddedProduct) {
            const product = { id, title, price, image, quantity, size };

            currentAddedProduct.push(product);

            saveToStorage(productKey, currentAddedProduct);
            renderCartQuantity(currentAddedProduct);

            const deleteBtn = document.querySelector(".delete-btn");
            const badge = document.querySelector(".badge");

            deleteBtn.classList.remove("visually-hidden");
            badge.classList.remove("visually-hidden");

            showMessageWithModal("<i class='fa-solid fa-circle-check me-2'></i>Added to cart");
            renderModal(image, title, size, price)


        }

        //check if size matches if user adds same product again
        else {
            const findCurrentAddedProduct = currentAddedProduct.find(produt => +produt.size === +size);

            //if size does not match from item stored in storage then push new product with new size, show modal with new added product
            if (!findCurrentAddedProduct) {
                const product = { id, title, price, image, quantity, size };

                currentAddedProduct.push(product);

                renderModal(image, title, size, price)
                showMessageWithModal("<i class='fa-solid fa-circle-check me-2'></i>Added to cart");

                saveToStorage(productKey, currentAddedProduct);
                renderCartQuantity(currentAddedProduct);
            }

            //if size matches then increase quantity with one and show modal that product is in cart already
            else {
                findCurrentAddedProduct.quantity++;

                saveToStorage(productKey, currentAddedProduct);

                renderCartQuantity(currentAddedProduct);

                showMessageWithModal("<i class='fa-solid fa-circle-check me-2'></i> Quantity updated in shopping cart")

                modalBody.innerHTML = "";

                modalBody.innerHTML = `<button type="button" class=" btn-continue-shopping" data-bs-dismiss="modal" aria-label="Close">Continue Shopping</button>
                                 <a href = "cart.html" class="btn-to-cart"> Proceed to cart</a >`;

            }

        }

    }

}

// delete item from cart
function deleteFromCart(event) {

    const id = event.target.dataset.id;

    const findItemToDelete = itemsSavedInStorage.filter(product => +product.id !== +id);

    let doRemove = window.confirm("are your sure?");

    if (doRemove) {
        const badge = document.querySelector(".badge");

        saveToStorage(productKey, findItemToDelete);
        renderCartQuantity(findItemToDelete);

        event.target.classList.add("visually-hidden");
        badge.classList.add("visually-hidden");

    }

}
