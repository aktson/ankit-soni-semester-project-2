import { baseUrl } from "../settings.js";

// hero section
(async function fetchHero() {

  const response = await fetch(baseUrl + "/home");
  const result = await response.json();

  const image = result.hero_banner.url;
  const altText = result.hero_banner_alt_text;

  const imgUrl = baseUrl + image;

  renderHero(imgUrl, altText)

})();

function renderHero(image, altText) {
  const heroBanner = document.querySelector("#hero-banner");

  heroBanner.innerHTML = `<div style ="background: url('${image}') no-repeat center;background-size: cover;" class="hero__image" >
                      <span  role="img" aria-label=${altText}></span>
                    <div>`;

}

