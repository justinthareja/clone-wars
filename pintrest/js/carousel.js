var Carousel = (function() {
    var $title, $controls, $carousel;
    var numColumns = 7;
    var currentThemeIndex = 0;
    var themes = [
        {
            name: "homeDecor",
            subtitle: "home decor idea",
            color: "teal",
            image: "https://i.pinimg.com/236x/28/85/8c/28858cedb11e772b00edd867009c5e88.jpg" 
        },
        {
            name: "food",
            subtitle: "weeknight dinner idea",
            color: "orange",
            image: "https://i.pinimg.com/236x/e3/41/4b/e3414b2fcf00375a199ba6964be551af.jpg"
        },
        {
            name: "fashion",
            subtitle: "new look outfit",
            color: "blue",
            image: "https://i.pinimg.com/236x/7a/e3/37/7ae3370edba908ba0df9469d5d6133b0.jpg",
        },
        {
            name: "gardening",
            subtitle: "green thumb idea",
            color: "green",
            image: "https://i.pinimg.com/236x/9b/52/9d/9b529dd5d75523e9a6bf29dbf09f404a.jpg",
        }
    ];

    function init() {
        $title = document.querySelector(".js-title");
        $controls = document.querySelector(".js-controls");
        $carousel = document.querySelector(".js-carousel");

        $title.addEventListener("transitionend", handleTitleTransitionEnd);
        render();
    }

    function handleTitleTransitionEnd(event) {
        $title.classList.toggle("is-fading");
        $title.innerHTML = titleTemplate();
    }

    function getThemes() {
        return themes;
    }
    
    function getCurrentThemeIndex() {
        return currentThemeIndex;
    }
    
    function getCurrentTheme() {
        return getThemes()[currentThemeIndex];
    }

    function setCurrentTheme(i) {
        if (i < 0 || i > getThemes().length - 1) {
            return;
        }

        currentThemeIndex = i;
    }

    function next() {
        var i = getCurrentThemeIndex();
        var max = getThemes().length - 1;
        
        if (i == max) {
            setCurrentTheme(0);
        } else if (i < max) {
            setCurrentTheme(i + 1);
        } else {
            // nothin    
        }

        render();
    }

    function controlsTemplate() {
        var controls = `<ul class="controls">`;

        getThemes().forEach(function (theme, i) {
            var color = theme.color;

            controls += (`
                <li class="controls__item controls__item--${i == getCurrentThemeIndex() ? color : "" }">
                    <a href="#"></a>
                </li>
            `);
        });

        controls += `</ul>`;

        return controls;
    }

    function titleTemplate() {
        var subtitle = getCurrentTheme().subtitle;
        var color = getCurrentTheme().color

        return (`
            <h1 class="title__text">
                <span class="title__main">Get your next</span>
                <span class="title__sub title__sub--${color}">${subtitle}</span>
            </h1>
        `);
    }

    // TODO: Themes have multiple images
    function imageTemplate() {
        var src = getCurrentTheme().image;

        return (`
            <div class="carousel-img-container">
                <img class="carousel-img" src=${src}>
                <img class="carousel-img" src=${src}>
                <img class="carousel-img" src=${src}>
            </div>
        `);
    }

    function renderTitle() {
        if ($title.innerHTML == "") {
            $title.innerHTML = titleTemplate();
        } else {
            $title.classList.toggle("is-fading");
        }
    }

    function renderControls() {
        $controls.innerHTML = controlsTemplate();
    }


    function renderCarousel() {
        $carousel.innerHTML = "";
        
        for (var i = 1; i <= numColumns; i++) {
            setTimeout(function () {
                $carousel.appendChild(parse(imageTemplate()));
            }, i * 200);
        }
    }

    function parse(htmlString) {
        var doc = new DOMParser().parseFromString(htmlString, "text/html");
        return doc.body.firstChild;
    }

    function render() {
        renderTitle();
        renderControls();
        renderCarousel();
    }

    var publicApi = {
        init,
        next
    };

    return publicApi;
})();