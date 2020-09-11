if (GoBack !== undefined) throw new Error("GoBack is already defined!");
var GoBack = {};

GoBack.fromQuery = 'fromURL';

GoBack.updateQueryStringParameter = function(urlString, param, value) {
    let url = new URL(urlString);
    let searchParams = url.searchParams;
    searchParams.set(param, value);
    url.search = searchParams.toString();

    return url.toString();
}

GoBack.goToLocation = function(element) {
    let link = element.dataset.href;
    let newURL = GoBack.updateQueryStringParameter(link, GoBack.fromQuery, GoBack.sanitize(window.location.href));
    console.log(newURL);
    window.location.href = newURL;
}

GoBack.sanitize = function(urlString) {
    let url = new URL(urlString);
    let searchParams = url.searchParams;
    searchParams.delete(GoBack.fromQuery);
    url.search = searchParams.toString();

    return url.toString();
}

GoBack.goBack = function() {
    let searchParams = new URLSearchParams(window.location.search);
    let newURL = searchParams.get(GoBack.fromQuery);

    if (newURL == null) return false;

    window.location.href = newURL;
}

GoBack.proressPage = function() {
    document.querySelectorAll("a").forEach(function(element) {
        element.dataset.href = element.href;
        element.addEventListener("click", function(event) {
            event.preventDefault(); // prevent default action l.e redirecting 
            GoBack.goToLocation(event.srcElement);
        });
    });
}

document.addEventListener("DOMContentLoaded", GoBack.proressPage);