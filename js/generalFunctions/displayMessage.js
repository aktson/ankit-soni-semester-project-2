export function displayMessage(className, message, container) {
  const element = document.querySelector(container);

  element.innerHTML = `<div class="bg-${className}" id="display-message">${message}</div>`
}