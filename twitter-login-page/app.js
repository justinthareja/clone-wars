document.addEventListener("DOMContentLoaded", function() {
    let $signup = document.querySelector(".js-signup");
    let $userInput = document.querySelector(".js-input-user");

    $signup.addEventListener("blur", handleBlur, true);
    $signup.addEventListener("focus", handleFocus, true);

    if ($userInput) {
        $userInput.focus();
    }

    function handleBlur(event) {
        if (!event.target.matches(".js-input")) return;

        let $parent = event.target.parentElement;

        if (!$parent) return;

        if (event.target.value != "" && !$parent.classList.contains("has-text")) {
            $parent.classList.add("has-text");
        }

        if (event.target.value == "" && $parent.classList.contains("has-text")) {
            $parent.classList.remove("has-text");
        }

        $parent.classList.toggle("is-focused");
    }
    
    function handleFocus(event) {
        if (!event.target.matches(".js-input")) return;
        
        let $parent = event.target.parentElement;
        if (!$parent) return;

        event.preventDefault();
        $parent.classList.toggle("is-focused");
    }

});