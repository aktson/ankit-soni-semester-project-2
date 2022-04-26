import { baseUrl } from "../settings.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { renderMenu } from "../generalFunctions/renderMenu.js";

scrollToTop();
renderMenu();


// hero section
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
