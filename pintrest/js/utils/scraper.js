// URL = pintrest.com
var Scraper = (function () {
    var $imgs = document.querySelectorAll("div[role='img']");
    var categories = ["food", "homeDecor", "fashion", "gardening"];
    
    function matchImageUrl(string) {
        var match = string.match(/https?:\/\/.*\.(?:png|jpg)/i);
        return match && match[0];
    }
    
    function getCategories() {
        // TODO
    }

    function getImageByCategory(category) {
        if (!$imgs) {
            console.error("Invalid $imgs selector");
            return false;
        }

        var images = Array.from($imgs);

        images = images.filter(img => img.getAttribute("aria-label") == category);

        if (images.length == 0) {
            console.error("No images found after filtering by aria-label");
            return false;
        }

        images = images.map(img => img.style.backgroundImage);
        images = images.map(matchImageUrl);
        images = images.filter(Boolean);

        if (images.length == 0) {
            console.error(`No image found for category: ${category}`);
            return false;
        }

        return images;
    }

    function getImageURLs() {
        var images = categories.reduce((result, category) => {
            result[category] = getImageByCategory(category);
            return result;
        }, {});

        return JSON.stringify(images, null, 2);
    }

    var publicApi = {
        getImageURLs
    };

    return publicApi;
})();
