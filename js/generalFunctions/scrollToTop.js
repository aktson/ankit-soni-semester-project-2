export function scrollToTop() {
  const toTopBtn = document.querySelector(".to-top-btn");

  toTopBtn.onclick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }
}