import { getFromStorage, getUser, productKey, tokenKey, userKey } from "../storage/storage.js";
import { renderCartQuantity } from "./renderCartQuantity.js";


export function renderNav() {
    // nav renders here with offcanvas, logo, hamburger and nav-items

    const nav = document.querySelector("nav");
    nav.innerHTML += `<div class="container">
                    <a class="me-auto d-md-none" href="index.html"><img src="/images/logo/logo-dark.svg" alt="noso sports logo" class="logo" /></a>
                    <button class="navbar-toggler navbar-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <i class="fa-solid fa-bars-staggered"></i>
                    </button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="nav-menu-container"> </ul>
                        </div>
                    </div>
                </div>`
    renderMenu();
}
const itemsSavedInStorage = getFromStorage(productKey);

const username = getUser();

const { pathname } = document.location;

// authenticated link if username doesn't exist

let authLink = `<li class="nav-item">
               <a class="nav-link ${pathname === "/login.html" ? "active" : ""}" href="login.html"><i class="fa-solid fa-user"></i></a>
            </li>`;

// authenticated link if username exist
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

function renderMenu() {

    const menuContainer = document.querySelector(".nav-menu-container");

    menuContainer.innerHTML = "";

    menuContainer.innerHTML = ` <a class="navbar-brand" href="index.html"><img src="/images/logo/logo-dark.svg" alt="noso sports logo" class="logo"/></a>
                                <div class="nav-menu">
                                    <li class="nav-item">
                                        <a class="nav-link ${pathname === "/index.html" || pathname === "/" ? "active" : ""}" aria-current="page" href="index.html">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link ${pathname === "/men.html" ? "active" : ""}" href="men.html">Men</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link ${pathname === "/women.html" ? "active" : ""}" href="women.html">Women</a>
                                    </li>
                                    <li class="nav-item">
                                    <a class="nav-link ${pathname === "/kids.html" ? "active" : ""}" href="kids.html">Kids</a>
                                    </li>
                                </div>
                                <div class="nav-icons">
                                    <li class="nav-item">
                                        <a class="nav-link  ${pathname === "/cart.html" ? "active" : ""}" href="cart.html">
                                            <i class="fa-solid fa-bag-shopping position-relative"><span class="cart-quantity"></span></i>
                                        </a>
                                    </li>
                                    ${authLink}
                                </div>`;

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