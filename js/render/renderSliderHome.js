export function renderSliderHome(results) {
    const carouselInner = document.querySelector(".carousel-inner");

    results.forEach((result) => {
        const receivedImage = result.attributes.image.data.attributes.url;
        carouselInner.innerHTML += `<div class="carousel-item " data-bs-interval="3000">
                                        <div class="ratio ratio-16x9" style="height: 90vh; background: url('${receivedImage}') center / cover no-repeat"></div>
                                    </div>`;
    });
}
