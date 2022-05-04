import { renderProducts } from "../pages/products.js";

// sort products by price
export function sortByPrice(results) {

    const sortProduct = document.querySelector(".sort-product");

    sortProduct.addEventListener("change", (event) => {

        const selectedValue = event.target.value;

        renderProducts(results)

        if (!selectedValue) {
            return;

        } else if (selectedValue === "lowest") {

            const lowestToHigest = results.sort((a, b) => parseInt(a.attributes.price) - parseInt(b.attributes.price));

            renderProducts(lowestToHigest)

        } else if (selectedValue === "highest") {
            const highestToLowest = results.sort((a, b) => parseInt(b.attributes.price) - parseInt(a.attributes.price));

            renderProducts(highestToLowest)
        }

    })
}