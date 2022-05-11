import { getFromStorage, getUser, productKey, tokenKey, userKey } from "../storage/storage.js";
import { renderCartQuantity } from "../render/renderCartQuantity.js";



const itemsSavedInStorage = getFromStorage(productKey);

const username = getUser();

const { pathname } = document.location;

let authLink = `<li class="nav-item">
                   <a class="nav-link ${pathname === "/login.html" ? "active" : ""}" href="login.html"><i class="fa-solid fa-user"></i></a>
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
    const menuContainer = document.querySelector(".nav-menu-container");

    menuContainer.innerHTML = "";

    menuContainer.innerHTML = ` <a class="navbar-brand " href="index.html"><img src="/images/logo.svg" alt="noso sports logo" class="logo"  /></a>
                                <div class="d-flex flex-column flex-md-row">
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

