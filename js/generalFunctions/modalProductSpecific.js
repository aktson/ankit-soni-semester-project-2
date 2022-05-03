//render modal body content
export function renderModal(image, title, size, price) {
    const modalBody = document.querySelector(".modal-body");

    modalBody.innerHTML = "";

    modalBody.innerHTML = `<div class ="modal-body-content">
                          <img src="${image}" class="modal-body-content__image"/>
                          <div>
                              <h5>${title}</h5>
                              <p>Size: ${size}</p>
                          </div>
                          <p class="ms-auto">NOK ${price}</p>
                        </div>  
                        <button type="button" class="btn-continue-shopping" data-bs-dismiss="modal" aria-label="Close">Continue Shopping</button>
                        <a href = "cart.html" class="btn-to-cart"> Proceed to cart</a >`

}

//render modal title and show user message 
export function showMessageWithModal(msg) {
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.innerHTML = "";

    modalTitle.innerHTML = `<p>${msg}</p>`


}