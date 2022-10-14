import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderNav } from "../render/renderNav.js";
import { renderFooter } from "../render/renderFooter.js";
import { baseUrl } from "../settings.js";
import { searchProduct } from "../generalFunctions/searchProduct.js";
import { sortByPrice } from "../generalFunctions/sortByPrice.js";
import { renderProducts } from "../render/renderProducts.js";




renderNav();
renderFooter();


(async function fetchProducts() {

  const url = baseUrl + "api/nosos?populate=*";

  try {
    const response = await fetch(url);

    if (response.ok) {
      const results = await response.json();

      const filterMenData = results.data.filter(result => {
        return result.attributes.category === "men";
      })

      renderProducts(filterMenData);
      searchProduct(filterMenData);
      sortByPrice(filterMenData);



    } else {
      throw new Error(response.statusText);
    }

  }
  catch (error) {
    console.log(error);
    displayMessage("danger", "Unknown error occured", ".products-container");
  }

})();

