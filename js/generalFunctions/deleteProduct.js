import { baseUrl } from "../settings.js";
import { getUser } from "../storage/storage.js";
import { displayMessage } from "./displayMessage.js";

const user = getUser();

let cssClass = "visually-hidden";

if (user) {
    cssClass = "";
};

export async function deleteProduct(event) {

    try {
        const id = event.target.dataset.id;

        let doDelete = window.confirm("are you sure??");

        if (doDelete) {
            const url = baseUrl + `api/items/${id}?populate=*`;

            const options = {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
            const response = await fetch(url, options);
            const result = await response.json();

            const imageId = result.data.attributes.image.data.id;

            const imageUrl = baseUrl + `api/upload/files/${imageId}`;
            const res = await fetch(imageUrl, options);

            if (res.ok) {
                displayMessage("success", "Product deleted!!", "#message-container");
                location.reload();
            }
        }
    }
    catch (error) {
        console.log(error)
        displayMessage("danger", "Unknown error occured", "#message-container")
    }

}