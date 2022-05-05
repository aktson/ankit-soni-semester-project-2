
export function renderFooter() {
    const footerContainer = document.querySelector(".footer");

    footerContainer.innerHTML = `<div class="footer__content">
                                    <div class="footer__content-row">
                                        <div class="footer__content-logo">
                                            <a href="/">LOGO</a>
                                            <div class="social order-md-2">
                                                <i class="fa-brands fa-facebook-f"></i>
                                                <i class="fa-brands fa-instagram"></i>
                                                <i class="fa-brands fa-pinterest"></i>
                                            </div>
                                        </div>
                                        <div class="footer__content-menu">
                                            <h5>Site Navigation</h5>
                                            <a href="#">Home</a>
                                            <a href="#">About</a>
                                            <a href="#">Products</a>
                                            <a href="#">Contact us</a>
                                        </div>
                                        <div class="footer__content-payment">
                                            <h5>We accept</h5>
                                            <div class="social order-md-2">
                                                <img src="/images/logos/visa.svg" alt="visa logo" class="footer-icons" />
                                                <img src="/images/logos/mastercard.svg" alt="mastercard logo" class="footer-icons" />
                                                <img src="/images/logos/american-express.svg" alt="american-express logo" class="footer-icons" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer__copyright">
                                    <div class="order-1 order-md-2">&copy;2022 designed & developed by AnkSon</div>
                                </div>
                                <div class="to-top-btn"><i class="fa-solid fa-arrow-up-long"></i>top</div>`


    const toTopBtn = document.querySelector(".to-top-btn");
    toTopBtn.addEventListener("click", scrollToTop);
}

function scrollToTop() {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })


}