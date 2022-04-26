import { baseUrl } from "../settings.js";
import { saveToken, saveUser } from "../storage/storage.js";
import { scrollToTop } from "../generalFunctions/scrollToTop.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderMenu } from "../generalFunctions/renderMenu.js";

scrollToTop();
renderMenu();

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

    try {
        const response = await fetch(url, options);

        const result = await response.json();

        if (result.user) {
            displayMessage("success", "Login successful", "#message-container");
            saveToken(result.jwt);
            saveUser(result.user);
            form.reset();
            window.history.go(-1);
        }
        if (result.error) {
            displayMessage("danger", "Invalid username/password", "#message-container");
        }


    }

    catch (error) {
        console.log(error)
        displayMessage("danger", "Unknown error occured", "#message-container")
    }

}