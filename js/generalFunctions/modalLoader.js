export function showModalLoader() {
    const loader = document.querySelector(".modal-loader");
    loader.style.display = "block";
    document.body.style.overflow = "hidden";
}

export function hideModalLoader() {
    const loader = document.querySelector(".modal-loader");
    loader.style.display = "none";
    document.body.style.overflow = "auto";
}