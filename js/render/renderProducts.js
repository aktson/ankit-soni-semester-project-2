import { getUser, getToken, getFromStorage, productKey } from "../storage/storage.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { baseUrl } from "../settings.js";


const itemsSavedInStorage = getFromStorage(productKey);

const token = getToken();
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
                                                  <div>
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
        btn.addEventListener("click", deleteProduct);
    })

};


// delete request to delete item from api only for authenticated user
async function deleteProduct(event) {

    try {
        const id = event.target.dataset.id;

        let doDelete = window.confirm("are you sure??");

        if (doDelete) {
            const url = baseUrl + `api/items/${id}?populate=*`;

            const options = {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
            const response = await fetch(url, options);
            const result = await response.json();

            const imageId = result.data.attributes.image.data.id;

            const imageUrl = baseUrl + `api/upload/files/${imageId}`;
            const res = await fetch(imageUrl, options);

            if (res.ok) {
                displayMessage("success", "Product deleted!!", "#message-container");
                location.reload();
            }
        }
    }
    catch (error) {
        console.log(error)
        displayMessage("danger", "Unknown error occured", "#message-container")
    }

}
