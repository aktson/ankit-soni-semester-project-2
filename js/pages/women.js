import { baseUrl } from "../settings.js";
import { searchProduct } from "../generalFunctions/searchProduct.js";
import { sortByPrice } from "../generalFunctions/sortByPrice.js";
import { renderProducts } from "../render/renderProducts.js";
import { renderMenu } from "../render/renderMenu.js";
import { renderFooter } from "../render/renderFooter.js";


renderMenu();
renderFooter();


(async function fetchProducts() {

    const url = baseUrl + "api/items?populate=*";

    try {
        const response = await fetch(url);

        if (response.ok) {
            const results = await response.json();

            const filterWomenData = results.data.filter(result => {
                return result.attributes.categories.data[0].attributes.name === "women";
            })

            renderProducts(filterWomenData);
            searchProduct(results.data);
            sortByPrice(results.data);

        } else {
            throw new Error(response.statusText);
        }

    }
    catch (error) {
        console.log(error);
        displayMessage("danger", "Unknown error occured", ".products-container");
    }

})();