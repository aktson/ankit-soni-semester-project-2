import { baseUrl } from "../settings.js";
import { getToken } from "../storage/storage.js";
import { displayMessage } from "./displayMessage.js";
import { showModalLoader, hideModalLoader } from "./modalLoader.js";

const token = getToken();


export async function deleteProductRequest(event) {

    showModalLoader();

    let doDelete = window.confirm("are you sure??");

    try {
        const id = event.target.dataset.id;

        hideModalLoader();

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
                hideModalLoader();
                displayMessage("success", "Product deleted!!", "#message-container");
                location.reload();
            }
        }
    }
    catch (error) {
        hideModalLoader();
        console.log(error)
        displayMessage("danger", "Unknown error occured", "#message-container")
    }

}