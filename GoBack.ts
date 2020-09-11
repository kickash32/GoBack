export class GoBack {
    static queryVar: string = 'fromURL';

    static updateQueryStringParameter(urlString: string, param: string, value: string): string {
        let url = new URL(urlString);
        let searchParams = url.searchParams;
        searchParams.set(param, value);
        url.search = searchParams.toString();

        return url.toString();
    }

    static goToLocation(element: HTMLElement): void {
        let link = element.dataset.href;
        let newURL = GoBack.updateQueryStringParameter(link, GoBack.queryVar, GoBack.sanitize(window.location.href));
        console.log(newURL);
        window.location.href = newURL;
    }

    static sanitize(urlString: string): string {
        let url = new URL(urlString);
        let searchParams = url.searchParams;
        searchParams.delete(GoBack.queryVar);
        url.search = searchParams.toString();

        return url.toString();
    }

    static goBack(): void {
        let searchParams = new URLSearchParams(window.location.search);
        let newURL = searchParams.get(GoBack.queryVar);

        if (newURL == null) return;

        window.location.href = newURL;
    }

    static processPage(): void {
        document.querySelectorAll("a").forEach(function(element) {
            element.dataset.href = element.href;
            element.addEventListener("click", function(event) {
                event.preventDefault(); // prevent default action l.e redirecting 
                GoBack.goToLocation(event.srcElement as HTMLElement);
            });
        });
    }
};

document.addEventListener("DOMContentLoaded", GoBack.processPage);