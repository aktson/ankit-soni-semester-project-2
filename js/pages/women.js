import { baseUrl } from "../settings.js";
import { searchProduct } from "../generalFunctions/searchProduct.js";
import { sortByPrice } from "../generalFunctions/sortByPrice.js";
import { renderProducts } from "../render/renderProducts.js";
import { renderNav } from "../render/renderNav.js";
import { renderFooter } from "../render/renderFooter.js";


renderNav();
renderFooter();


(async function fetchProducts() {

    const url = baseUrl + "api/nosos?populate=*";

    try {
        const response = await fetch(url);

        if (response.ok) {
            const results = await response.json();
            console.log(results)

            const filterWomenData = results.data.filter(result => {
                return result.attributes.category === "women";
            })

            renderProducts(filterWomenData);
            searchProduct(filterWomenData);
            sortByPrice(filterWomenData);

        } else {
            throw new Error(response.statusText);
        }

    }
    catch (error) {
        console.log(error);
        displayMessage("danger", "Unknown error occured", ".products-container");
    }

})();
