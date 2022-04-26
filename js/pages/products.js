import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderMenu } from "../generalFunctions/renderMenu.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { baseUrl } from "../settings.js";
import { getUser } from "../storage/storage.js";


scrollToTop();
renderMenu();

const user = getUser();
let cssClass = "visually-hidden";

if (user) {
  cssClass = "";

};

(async function fetchProducts() {

  const url = baseUrl + "api/items?populate=*";

  try {
    const response = await fetch(url);

    if (response.ok) {
      const results = await response.json();
      console.log(results.data)

      renderProducts(results.data);
      searchProduct(results.data)

    } else {
      throw new Error(response.statusText);
    }

  }
  catch (error) {
    console.log(error);
    displayMessage("danger", "Unknown error occured", "#products-container");
  }

})();

function renderProducts(results) {

  const productsContainer = document.querySelector("#products-container");

  productsContainer.innerHTML = "";

  results.forEach(result => {

    const title = result.attributes.title;
    const price = result.attributes.price;

    const img = result.attributes.image.data.attributes.url;
    const altText = result.attributes.image_alttext;

    productsContainer.innerHTML += `<div class="col">
                                        <a href="product-specific.html?id=${result.id}">
                                          <div class="card h-100 shadow-lg">
                                              <div style ="background: url('${img}') no-repeat center;background-size: cover;" class="product-image">
                                                  <span  role="img" aria-label=${altText}></span>
                                              </div>
                                              <div class="card-body ">
                                                <div> 
                                                  <h5 class="card-title">${title}</h5>
                                                  <p class="card-text">NOK ${price}</p>
                                                </div>   
                                                <div>
                                                  <a href="editProduct.html?id=${result.id}" class="edit-product ${cssClass}"><i class="fa-solid fa-pen-to-square"></i> edit</a>
                                                  <button class="delete-product ${cssClass}" data-id=${result.id} ><i class="fa-solid fa-trash-can"></i> Delete</button>
                                                </div>
                                              </div>                                    
                                          </div>
                                        </a>
                                    </div>`
  })
}

// filter products for search results on keyup event
function searchProduct(results) {

  const search = document.querySelector("#search");

  search.addEventListener("keyup", (event) => {

    const searchValue = event.target.value.trim().toLowerCase();

    renderProducts(results)

    const filteredResults = results.filter(result => result.attributes.title.toLowerCase().includes(searchValue));

    if (filteredResults.length === 0) {
      displayMessage("light", "Sorry no results found", "#products-container")
    }
    else {
      renderProducts(filteredResults)
    }

  });
}
