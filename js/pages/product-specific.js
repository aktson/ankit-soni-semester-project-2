import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderNav } from "../render/renderNav.js";
import { renderFooter } from "../render/renderFooter.js";
import { baseUrl } from "../settings.js";
import { renderSpecificProduct } from "../render/renderSpecificProduct.js"



renderNav();
renderFooter();


const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");


(async function fetchProduct() {

  const url = baseUrl + `api/items/${id}?populate=*`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const results = await response.json();

      renderSpecificProduct(results.data);


    } else {
      throw new Error(response.statusText);
    }

  }
  catch (error) {
    console.log(error);
    displayMessage("danger", "Unknown error occured", ".product-container");
  }

})();

