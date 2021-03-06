import { baseUrl } from "../settings.js";
import { saveToken, saveUser } from "../storage/storage.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderNav } from "../render/renderNav.js";
import { renderFooter } from "../render/renderFooter.js";
import { hideModalLoader, showModalLoader } from "../generalFunctions/modalLoader.js";


renderNav();
renderFooter();

const form = document.querySelector("form");
const username = document.querySelector("#username");
const usernameError = document.querySelector("#username-error");
const passwordError = document.querySelector("#password-error");


form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (!usernameValue) {
        displayMessage("transperant text-danger ", "* username missing", "#username-error")
    }
    if (!passwordValue) {
        displayMessage("transparent text-danger ", "* password missing", "#password-error")
    }
    else if (usernameValue.length > 0 && passwordValue.length > 0) {
        usernameError.innerHTML = "";
        passwordError.innerHTML = "";

        doLogin(usernameValue, passwordValue);

    }


}

async function doLogin(username, password) {

    const messageContainer = document.querySelector("#message-container");
    messageContainer.innerHTML = "";

    const url = baseUrl + "api/auth/local";
    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        }

    }
    showModalLoader();

    try {

        const response = await fetch(url, options);

        const result = await response.json();

        if (result.user) {
            hideModalLoader();
            displayMessage("success", "Login successful", "#message-container");
            saveToken(result.jwt);
            saveUser(result.user);
            form.reset();
            location.replace(document.referrer);
        }
        if (result.error) {
            hideModalLoader();
            displayMessage("danger", "Invalid username/password", "#message-container");
        }


    }

    catch (error) {
        hideModalLoader();
        console.log(error)
        displayMessage("danger", "Unknown error occured", "#message-container")
    }

}