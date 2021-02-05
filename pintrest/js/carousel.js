var Carousel = (function() {
    var $carousel;

    function init() {
        $carousel = document.querySelector(".js-carousel");

        render(generateCarouselHTML());
    }

    function generateCarouselHTML(data = {}) {
        var numColumns = 7;
        var result = "";

        for (var i = 0; i < numColumns; i++) {
            result += generateImageHTML();
        }

        return result;
    }

    function generateImageHTML(data = {}) {
        var id = data.id || 1;
        var src = data.src || "https://i.pinimg.com/236x/e3/41/4b/e3414b2fcf00375a199ba6964be551af.jpg";
        var alt = data.alt || "Trendy food";

        return (`
            <div class="carousel-img-container">
                <img class="carousel-img" src=${src} alt="${alt}">
                <img class="carousel-img" src=${src} alt="${alt}">
                <img class="carousel-img" src=${src} alt="${alt}">
            </div>
        `);
    }

    function render(html) {
        $carousel.innerHTML = html;
    }

    var publicApi = {
        init
    };

    return publicApi;
})();