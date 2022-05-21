import { getUser, getFromStorage, productKey } from "../storage/storage.js";
import { deleteProductRequest } from "../generalFunctions/deleteProductRequest.js";


const itemsSavedInStorage = getFromStorage(productKey);

const user = getUser();

let cssClass = "visually-hidden";

if (user) {
    cssClass = "";
};


// render products
export function renderProducts(results) {

    const productsContainer = document.querySelector(".products-container");

    productsContainer.innerHTML = "";

    results.forEach(result => {

        const title = result.attributes.title;
        const price = result.attributes.price;

        const img = result.attributes.image.data.attributes.url;
        const altText = result.attributes.image_alttext;
        const imageId = result.attributes.image.data.id;

        let showInCartBadge = "";

        const filterProductInStorage = itemsSavedInStorage.find(product => parseInt(product.id) === parseInt(result.id))

        if (filterProductInStorage) {
            showInCartBadge = `<p class="badge">In the cart</p>`;
        }

        productsContainer.innerHTML += `<div class="col">
                                          ${showInCartBadge} 
                                          <a href="product-specific.html?id=${result.id}" id="product__link">
                                            <div class="card">                                                                            
                                                <div style ="background: url('${img}') no-repeat center;background-size: cover;" class="product-image">
                                                    <span  role="img" aria-label=${altText}></span>
                                                </div>
                                                <div class="card-body">
                                                  <div> 
                                                    <h5 class="card-title">${title}  </h5>
                                                    <p class="card-text">NOK ${price}</p>
                                                  </div>   
                                                  <div class="btns-wrapper">
                                                    <a href="editProduct.html?id=${result.id}&imageId=${imageId}" class="edit-product ${cssClass}"><i class="fa-solid fa-pen-to-square"></i> edit</a>
                                                    <button class="delete-product ${cssClass}" data-id=${result.id} ><i class="fa-solid fa-trash-can"></i> Delete</button>
                                                  </div>
                                                </div>                                    
                                            </div>
                                          </a>
                                      </div>`
    })
    const deleteBtns = document.querySelectorAll(".delete-product");

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", deleteProductRequest);
    })

};

