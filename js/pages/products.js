import { displayMessage } from "../generalFunctions/displayMessage.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { baseUrl } from "../settings.js";

scrollToTop();

(async function fetchProducts() {

  const url = baseUrl + "/products";

  try {
    const response = await fetch(url);

    if (response.ok) {
      const results = await response.json();

      renderProducts(results);

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

    const imgUrl = baseUrl + result.image.url;
    const altText = result.image.alternativeText;


    productsContainer.innerHTML += `<a href="product-specific.html?id=${result.id}">
                                        <div class="col">
                                          <div class="card h-100 shadow-lg">
                                          <img src="${imgUrl}" alt="${altText}" class="product-image"/>
                                          <div class="card-body">
                                            <h5 class="card-title">${result.title}</h5>
                                            <p class="card-text">NOK ${result.price}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </a>`
  })

}