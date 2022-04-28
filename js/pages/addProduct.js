import { renderMenu } from "../generalFunctions/renderMenu.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { baseUrl } from "../settings.js";
import { getUser } from "../storage/storage.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { checkLength, emptyInnerhtml, checkInput } from "../generalFunctions/formFunctions.js"
import { removeMessage } from "../generalFunctions/removeMessage.js";



renderMenu();
scrollToTop();

const user = getUser();

if (!user) {
    location.href = "/";
}

const form = document.querySelector("form");
const messageContainer = document.querySelector("#message-container");

const title = document.querySelector("#title");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const alttext = document.querySelector("#alttext");

const titleError = document.querySelector("#title-error");
const imageError = document.querySelector("#image-error");
const priceError = document.querySelector("#price-error");
const descriptionError = document.querySelector("#description-error");
const alttextError = document.querySelector("#alttext-error");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = price.value.trim();
    const alttextValue = alttext.value.trim();
    const featured = document.querySelector("#featured").checked;
    const imageValue = image.value;

    messageContainer.innerHTML = "";

    checkInput(titleValue, 4, "title must be atleast 4 letters", "#title-error");
    checkInput(descriptionValue, 10, "description must be atleast 10 letters", "#description-error");
    checkInput(alttextValue, 4, "must be atleast 4 letters", "#alttext-error");
    checkInput(priceValue, 1, "price missing", "#price-error");

    if (isNaN(priceValue)) {
        displayMessage("trasparent text-danger", "must be decimal number", "#price-error")
    }


    checkInput(imageValue, 1, "image missing", "#image-error");

    if (checkLength(titleValue, 4) && checkLength(descriptionValue, 10) && checkLength(alttextValue, 4) && checkLength(priceValue, 1) && priceValue === Number && checkLength(imageValue, 4)) {
        addProduct(titleValue, descriptionValue, priceValue, featured, imageValue, alttextValue);
        displayMessage("success text-center", "Product added!!", "#message-container");
        emptyInnerhtml([titleError, descriptionError, alttextError, priceError, imageError]);
        removeMessage("#message-container");
        title.focus();
        form.reset();
    }

}
async function addProduct(title, description, price, featured, image, altText) {

    try {

        const formdata = new FormData(form);

        formdata.append("files", image);

        const options = {
            method: "POST",
            body: formdata,
            headers: {
                "Authorization": `Bearer ${token}`,
            }

        }
        const url = baseUrl + "api/upload";
        const response = await fetch(url, options);
        const result = await response.json();
        const imageId = result[0].id;

        const data = JSON.stringify({ data: { title: title, description: description, price: price, featured: featured, image: imageId, image_alttext: altText } });

        const optionsProduct = {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const productUrl = baseUrl + `api/items`;
        const res = await fetch(productUrl, optionsProduct);
        const results = await res.json();

    }
    catch (error) {
        console.log(error)
        displayMessage("danger", "Unknow error occured", "#message-container");
    }


}

