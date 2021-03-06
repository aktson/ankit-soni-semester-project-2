
export function renderFooter() {
    const footerContainer = document.querySelector(".footer");

    footerContainer.innerHTML = `<div class="footer__content">
                                    <div class="footer__content-row">
                                        <div class="footer__content-logo-wrapper">
                                            <a href="/index.html" class="logo-footer"><img src="/images/logo/logo-dark.svg" alt="noso sports logo" /></a>
                                            <h5>Follow us: </h5>
                                            <div class="social order-md-2">
                                                <img src="/images/footer-icons/facebook.svg" alt="facebook logo" class="footer-icons" />
                                                <img src="/images/footer-icons/instagram.svg" alt="instagram logo" class="footer-icons" />
                                                <img src="/images/footer-icons/pinterest.svg" alt="pintrest logo" class="footer-icons" />
                                            </div>
                                        </div>
                                        <div class="footer__content-menu-wrapper">
                                            <h5>Site Navigation</h5>
                                            <a href="#">Site map</a>
                                            <a href="#">About</a>
                                            <a href="#">Returns</a>
                                            <a href="#">Customer service</a>
                                        </div>
                                        <div class="footer__content-menu-wrapper">
                                            <h5>More </h5>
                                            <a href="#">Press</a>
                                            <a href="#">Careers</a>
                                            <a href="#">Terms & policies</a>
                                            <a href="#">Contact us</a>
                                        </div>
                                        <div class="footer__content-payment-wrapper">
                                            <h5>We accept</h5>
                                            <div class="social order-md-2">
                                                <img src="/images/footer-icons/visa.svg" alt="visa logo" class="footer-icons" />
                                                <img src="/images/footer-icons/mastercard.svg" alt="mastercard logo" class="footer-icons" />
                                                <img src="/images/footer-icons/american-express.svg" alt="american-express logo" class="footer-icons" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer__copyright">
                                    <div class="order-1 order-md-2">&copy;2022 designed & developed by AnkSon</div>
                                </div>
                                <div class="to-top-btn"><i class="fa-solid fa-circle-chevron-up"></i></div>`


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
