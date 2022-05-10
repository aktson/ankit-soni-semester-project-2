import { baseUrl } from "../settings.js";
import { renderMenu } from "../render/renderMenu.js";
import { renderFooter } from "../render/renderFooter.js";
import { getUser, getToken } from "../storage/storage.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { checkInput, checkLength, emptyInnerhtml } from "../generalFunctions/formFunctions.js";



renderMenu();
renderFooter();

const token = getToken();

const user = getUser();

if (!user) {
    location.href = "/";
}

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");
const existingImageId = param.get("imageId");



const form = document.querySelector("form");

// container to show success or error message
const messageContainer = document.querySelector("#message-container");

const btn = document.querySelector(".form-btn");
// input containers
const title = document.querySelector("#title");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const alttext = document.querySelector("#alttext");
const inputid = document.querySelector("#id");

//input error container
const titleError = document.querySelector("#title-error");
const priceError = document.querySelector("#price-error");
const descriptionError = document.querySelector("#description-error");
const alttextError = document.querySelector("#alttext-error");


// fetch product with queryString parameter and popullate form
(async function fetchProduct() {

    const url = baseUrl + `api/items/${id}?populate=*`;

    try {
        const response = await fetch(url);

        if (response.ok) {
            const results = await response.json();

            const featured = document.querySelector("#featured");


            inputid.value = results.data.id;
            title.value = results.data.attributes.title;
            description.value = results.data.attributes.description;
            price.value = results.data.attributes.price;
            alttext.value = results.data.attributes.image_alttext;
            featured.checked = results.data.attributes.featured;

        } else {
            throw new Error(response.statusText);
        }

    }
    catch (error) {
        console.log(error);
        displayMessage("danger", "Unknown error occured", "#message-container");
    }

})();


// form validation
form.addEventListener("submit", handleEdit);

function handleEdit(event) {
    event.preventDefault();

    const featured = document.querySelector("#featured").checked;

    checkInput(title.value, 4, "title must be atleast 4 letters", "#title-error");
    checkInput(description.value, 10, "description must be atleast 10 letters", "#description-error");
    checkInput(alttext.value, 4, "must be atleast 4 letters", "#alttext-error");
    checkInput(price.value, 1, "price missing", "#price-error");

    if (isNaN(price.value)) {
        displayMessage("trasparent text-danger", "must be decimal number", "#price-error")
    }

    if (checkLength(title.value, 4) && checkLength(description.value, 10) && checkLength(alttext.value, 4) && checkLength(price.value, 1)) {

        if (image.value !== "") {
            editProductWithImage(title.value, description.value, price.value, featured, image.value, alttext.value, id);
            emptyInnerhtml([titleError, descriptionError, alttextError, priceError]);

        }
        else {
            editProductWithoutImage(title.value, description.value, price.value, featured, alttext.value, id);
            emptyInnerhtml([titleError, descriptionError, alttextError, priceError]);
        }
    }
}

// if image input value is empty then only data without image will be updated and image will get its existing id
async function editProductWithoutImage(title, description, price, featured, altText, id) {

    try {

        messageContainer.innerHTML = "";

        const data = JSON.stringify({ data: { title: title, description: description, price: price, featured: featured, image: existingImageId, image_alttext: altText } });

        const optionsProduct = {
            method: "PUT",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const productUrl = baseUrl + `api/items/${id}`;
        const res = await fetch(productUrl, optionsProduct);


        if (res.ok) {

            displayMessage("success text-center", "Product updated successfully!", "#message-container");
            location.replace(document.referrer);
        }

    }
    catch (error) {
        console.log(error)
        displayMessage("danger", "Unknow error occured", "#message-container");
    }


}

// If new image is added then follwing function will upload image and id will be passed in put request
async function editProductWithImage(title, description, price, featured, image, altText, id) {

    try {
        messageContainer.innerHTML = "";

        //POST request :image ,  upload new image get id and connect to post 
        const formdata = new FormData(form);

        formdata.append("files", image);

        const postImageoptions = {
            method: "POST",
            body: formdata,
            headers: {
                "Authorization": `Bearer ${token}`,
            }

        }
        const url = baseUrl + "api/upload";
        const response = await fetch(url, postImageoptions);

        const result = await response.json();

        const newimageId = result[0].id;

        //PUT request:data and image,  make put request with data and connect image with image id

        const data = JSON.stringify({ data: { title: title, description: description, price: price, featured: featured, image: newimageId, image_alttext: altText } });

        const optionsProduct = {
            method: "PUT",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const productUrl = baseUrl + `api/items/${id}`;
        const res = await fetch(productUrl, optionsProduct);


        if (res.ok) {
            displayMessage("success text-center", "Product updated successfully!", "#message-container");
            location.replace(document.referrer);

        }

    }
    catch (error) {
        console.log(error)
        displayMessage("danger", "Unknow error occured", "#message-container");
    }

}

