import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderMenu } from "../generalFunctions/renderMenu.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { baseUrl } from "../settings.js";

scrollToTop();
renderMenu();

(async function fetchProducts() {

  const url = baseUrl + "api/items?populate=*";

  try {
    const response = await fetch(url);

    if (response.ok) {
      const results = await response.json();
      console.log(results.data)

      renderProducts(results.data);

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

    // <img src="${img}" alt="${altText}" class="product-image"/>
    productsContainer.innerHTML += `<a href="product-specific.html?id=${result.id}">
                                        <div class="col">
                                          <div class="card h-100 shadow-lg">
                                              <div style ="background: url('${img}') no-repeat center;background-size: cover;" class="product-image">
                                                  <span  role="img" aria-label=${altText}></span>
                                              </div>
                                              <div class="card-body">
                                                <h5 class="card-title">${title}</h5>
                                                <p class="card-text">NOK ${price}</p>
                                              </div>  
                                        </div>
                                      </div>
                                    </a>`
  })

}