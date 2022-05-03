import { getFromStorage, getUser, productKey, tokenKey, userKey } from "../storage/storage.js";
import { renderCartQuantity } from "../generalFunctions/renderCartQuantity.js";



const itemsSavedInStorage = getFromStorage(productKey);

const username = getUser();

const { pathname } = document.location;

let authLink = `<li class="nav-item">
                   <a class="nav-link ${pathname === "/login.html" ? "active" : ""}" href="login.html">Log in <i class="fa-solid fa-user"></i></a>
                </li>`;

if (username) {
    authLink = `<li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >Hi ${username}</a>
                     <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                     <li>
                       <a class="dropdown-item  ${pathname === "/addProduct.html" ? "active" : ""}" href="addProduct.html"> Add product </a>
                     </li>
                     <li>
                     <span class="dropdown-item" id="logout">Logout</span>
                   </li>
                    </ul>
                </li>`
}
export function renderMenu() {
    const menuContainer = document.querySelector("#menu-container");

    menuContainer.innerHTML = "";

    menuContainer.innerHTML = `<li class="nav-item">
                            <a class="nav-link ${pathname === "/index.html" || pathname === "/" ? "active" : ""}" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link ${pathname === "/products.html" ? "active" : ""}" href="products.html">Products</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link  ${pathname === "/cart.html" ? "active" : ""}" href="cart.html">
                                Cart
                                <i class="fa-solid fa-bag-shopping position-relative"><span class="cart-quantity"></span></i>
                            </a>
                            </li>
                            ${authLink}`;

    if (username) {
        const logout = document.querySelector("#logout");

        logout.addEventListener("click", () => {
            localStorage.removeItem(tokenKey);
            localStorage.removeItem(userKey);
            location.reload();

        })

    }
    renderCartQuantity(itemsSavedInStorage);
}


// export function renderCartQuantity() {
//     let quantity = 0;

//     const cartItems = document.querySelector(".cart-quantity");
//     cartItems.innerHTML = "";

//     cartItems.innerHTML = quantity;

//     for (let i = 0; i < itemsSavedInStorage.length; i++) {

//         quantity += itemsSavedInStorage[i].quantity;

//         cartItems.innerHTML = quantity;

//     }
//     if (quantity === 0) {
//         cartItems.classList.add("visually-hidden");
//     }
// }