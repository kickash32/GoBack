import { GoBack } from "./GoBack.js";

function addGoBack() {
    document.querySelectorAll("#goBack").forEach(function(element) {
        element.onclick = GoBack.goBack;
    });
}

document.addEventListener("DOMContentLoaded", addGoBack);