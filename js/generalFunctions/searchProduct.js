import { renderProducts } from "../render/renderProducts.js";
import { displayMessage } from "./displayMessage.js";

// filter products for search results on keyup event
export function searchProduct(results) {

    const search = document.querySelector("#search");

    search.addEventListener("keyup", (event) => {

        const searchValue = event.target.value.trim().toLowerCase();

        renderProducts(results)

        const filteredResults = results.filter(result => result.attributes.title.toLowerCase().includes(searchValue));

        if (filteredResults.length === 0) {
            displayMessage("light", "Sorry no results found", "#products-container")
        }
        else {
            renderProducts(filteredResults)
        }

    });
}