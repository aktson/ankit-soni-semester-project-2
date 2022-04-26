import { getUser, tokenKey, userKey } from "../storage/storage.js";


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
                </li>
               `
}
export function renderMenu() {
    const menuContainer = document.querySelector("#menu-container");

    menuContainer.innerHTML = `<li class="nav-item">
                            <a class="nav-link ${pathname === "/index.html" || pathname === "/" ? "active" : ""}" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link ${pathname === "/products.html" ? "active" : ""}" href="products.html">Products</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link  ${pathname === "/cart.html" ? "active" : ""}" href="cart.html">
                                Cart
                                <i class="fa-solid fa-bag-shopping"></i>
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


}




