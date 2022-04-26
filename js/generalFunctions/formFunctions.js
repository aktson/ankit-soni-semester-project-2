import { displayMessage } from "./displayMessage.js";

export function checkLength(input, len) {
    if (input.trim().length >= len) {
        return true;
    }

}



export function checkInput(input, len, msg, errContainer) {

    if (input.trim().length >= len) {
        return true;
    }
    else {
        displayMessage("trasparent text-danger", msg, errContainer)
    }
}



export function emptyInnerhtml(elementArr) {

    elementArr.forEach(element => {
        element.innerHTML = "";
    })

}