import { baseUrl } from "../settings.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { renderMenu } from "../generalFunctions/renderMenu.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";

scrollToTop();
renderMenu();


// hero section fetch request
(async function fetchHero() {

  const response = await fetch(baseUrl + "api/home?populate=*");
  const result = await response.json();

  const img = result.data.attributes.hero_banner.data.attributes.url;
  const altText = result.data.attributes.hero_banner_alt_text;

  const heroBanner = document.querySelector("#hero-banner");

  heroBanner.innerHTML = `<div style ="background: url('${img}') no-repeat center;background-size: cover;" class="hero__image">
                      <span  role="img" aria-label=${altText}></span>
                    </div>`;

})();

//featured products fetch request
(async function fetchFeaturedProducts() {

  try {

    const url = baseUrl + "api/items?populate=*";

    const response = await fetch(url);
    console.log(response)

    if (response.ok) {
      const results = await response.json();
      renderFeaturedProducts(results.data)

    } else {
      throw new Error(response.statusText);
    }

  } catch (error) {
    console.log(error)
    displayMessage("danger", "Unknown error occured", "#featured-product-container");
  }

})();

// render featured products function
function renderFeaturedProducts(results) {

  const productsContainer = document.querySelector("#featured-product-container");

  productsContainer.innerHTML = "";

  const filterFeaturedProducts = results.filter(result => result.attributes.featured === true);

  filterFeaturedProducts.forEach(result => {

    const img = result.attributes.image.data.attributes.url;
    const altText = result.attributes.image_alttext;
    const title = result.attributes.title;
    const price = result.attributes.price;

    productsContainer.innerHTML += `<div class="col">
                                    <a href="product-specific.html?id=${result.id}" class="text-dark">
                                      <div class="card h-100 shadow-lg">
                                      <div style ="background: url('${img}') no-repeat center;background-size: cover;" class="product-image">
                                      <span  role="img" aria-label=${altText}></span>
                                      </div>
                                        <div class="card-body">
                                          <h5 class="card-title">${title}</h5>
                                          <p class="card-text">NOK ${price}</p>
                                        </div>
                                      </div>
                                    </a>
                                  </div>`
  })
}