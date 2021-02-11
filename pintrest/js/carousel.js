var Carousel = (function() {
    var $title, $controls, $carousel;
    const NUM_COLUMNS = 7;
    const NUM_ROWS = 5;
    var currentThemeIndex = 0;
   

    function init() {
        $title = document.querySelector(".js-title");
        $controls = document.querySelector(".js-controls");
        $carousel = document.querySelector(".js-carousel");

        $title.addEventListener("transitionend", handleTitleTransitionEnd);
        $carousel.addEventListener("transitionend", handleCarouselTransitionEnd);
        
        render();

        setInterval(next, 5000);
    }

    function handleCarouselTransitionEnd(event) {
        var i = findElementIndex(event.target);

        event.target.classList.toggle("is-fading");
        $carousel.insertBefore(imageTemplate(i), event.target);
        event.target.remove();
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

    function imageTemplate(columnIndex) {
        var $imgContainer = document.createElement("div");

        $imgContainer.classList.add("carousel-img-container");

        for (let i = 0; i < NUM_ROWS; i++) {
            var srcIdx = NUM_ROWS * columnIndex + i;
            var images = getCurrentTheme().images;

            if (images && images[srcIdx]) {
                var src = images[srcIdx];
            }  else {
                var src = "https://i.pinimg.com/236x/28/85/8c/28858cedb11e772b00edd867009c5e88.jpg"
            }

            var $img = document.createElement("img");

            $img.classList.add("carousel-img");
            $img.setAttribute("src", src);
            $imgContainer.appendChild($img);
        }

        return $imgContainer
        
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
        if ($carousel.innerHTML == "") {
            for (let i = 1; i <= NUM_COLUMNS; i++) {
                setTimeout(function() {
                    $carousel.appendChild(imageTemplate(i));
                }, i * 400);
            }
        } else {
            Array.from($carousel.children).forEach(function($child, i) {
                setTimeout(function() {
                    $child.classList.toggle("is-fading");
                }, i * 400);
            });
        }
    }


    function findElementIndex(el) {
        return Array.from(el.parentElement.children).findIndex(c => c === el);
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