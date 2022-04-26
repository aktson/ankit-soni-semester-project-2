import { renderMenu } from "../generalFunctions/renderMenu.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { baseUrl } from "../settings.js";
import { getToken } from "../storage/storage.js";



renderMenu();
scrollToTop();

const token = getToken();

if (!token) {
    location.href = "/";
}

const form = document.querySelector("form");

const title = document.querySelector("#title");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const alttext = document.querySelector("#alttext");

const titleError = document.querySelector("#title-error");
const imageError = document.querySelector("#image-error");
const priceError = document.querySelector("#price-error");
const descriptionError = document.querySelector("#description-error");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();


    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = price.value.trim();
    const alttextValue = alttext.value.trim();
    const featured = document.querySelector("#featured").checked;
    const imageValue = image.value;

    console.log(titleValue, descriptionValue, priceValue, featured)
    // if (!usernameValue) {
    //     displayMessage("transperant text-danger ", "* username missing", "#username-error")
    // }
    // if (!passwordValue) {
    //     displayMessage("transparent text-danger ", "* password missing", "#password-error")
    // }
    // else if (usernameValue.length > 0 && passwordValue.length > 0) {
    //     usernameError.innerHTML = "";
    //     passwordError.innerHTML = "";

    //     doLogin(usernameValue, passwordValue);

    // }

    addProduct(titleValue, descriptionValue, priceValue, featured, imageValue, alttextValue);

    title.focus();
    form.reset();

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
        console.log(result)
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
        console.log(results)

    }
    catch (error) {
        console.log(error)
    }


}