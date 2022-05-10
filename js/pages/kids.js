import { baseUrl } from "../settings.js";
import { searchProduct } from "../generalFunctions/searchProduct.js";
import { sortByPrice } from "../generalFunctions/sortByPrice.js";
import { renderProducts } from "../render/renderProducts.js";
import { renderMenu } from "../render/renderMenu.js";
import { renderFooter } from "../render/renderFooter.js";
import { displayMessage } from "../generalFunctions/displayMessage.js"


renderMenu();
renderFooter();


(async function fetchProducts() {

    const url = baseUrl + "api/items?populate=*";

    try {
        const response = await fetch(url);

        if (response.ok) {
            const results = await response.json();

            const filterKidsData = results.data.filter(result => {
                return result.attributes.categories.data[0].attributes.name === "kids";
            })

            renderProducts(filterKidsData);
            searchProduct(filterKidsData);
            sortByPrice(filterKidsData);

        } else {
            throw new Error(response.statusText);
        }

    }
    catch (error) {
        console.log(error);
        displayMessage("danger", "Unknown error occured", ".products-container");
    }

})();
