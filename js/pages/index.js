import { baseUrl } from "../settings.js";
import { renderNav } from "../render/renderNav.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderFooter } from "../render/renderFooter.js";
import { renderSliderHome } from "../render/renderSliderHome.js";

renderNav();
renderFooter();


// hero section fetch request
(async function fetchHero() {

  try {
    const response = await fetch(baseUrl + "api/noso-homes?populate=*");


    const result = await response.json();

    const img = result.data[0].attributes.hero_banner.data.attributes.url;
    const altText = result.data[0].attributes.hero_banner_alt_text;

    const heroBanner = document.querySelector(".hero-banner");

    heroBanner.innerHTML = `<div style ="background: url('${img}') no-repeat center;background-size: cover;" class="hero__image">
                            <span  role="img" aria-label=${altText}></span>
                          </div>`;


  } catch (error) {
    console.log(error)

  }


})();

//featured products fetch request
(async function fetchFeaturedProducts() {

  try {

    const url = baseUrl + "api/nosos?populate=*";

    const response = await fetch(url);


    if (response.ok) {
      const results = await response.json();
      console.log(results)

      renderFeaturedProducts(results.data)
      renderSliderHome(results.data);

    } else {
      throw new Error(response.statusText);
    }

  } catch (error) {
    console.log(error)
    displayMessage("danger", "Unknown error occured", ".featured-products-container");
  }

})();

// render featured products function
function renderFeaturedProducts(results) {

  const productsContainer = document.querySelector(".featured-products-container");

  productsContainer.innerHTML = "";

  const filterFeaturedProducts = results.filter(result => result.attributes.featured === true);

  filterFeaturedProducts.forEach(result => {

    const img = result.attributes.image.data.attributes.url;
    const altText = result.attributes.image_alttext;
    const title = result.attributes.title;
    const price = result.attributes.price;

    productsContainer.innerHTML += `<div class="col">
                                        <a href="product-specific.html?id=${result.id}"  id="product__link">
                                          <div class="card ">
                                              <div style ="background: url('${img}') no-repeat center;background-size: cover;" class="product-image">
                                                <span role="img" aria-label=${altText}></span>
                                              </div>
                                              <div class="card-body">
                                                <h5 class="card-title">${title}</h5>
                                                <p class="card-text">NOK ${price}</p> 
                                                <a></a>
                                              </div>              
                                          </div>
                                        </a>
                                    </div>`
  })
}