var fromQuery = 'fromURL';

function updateQueryStringParameter(urlString, param, value) {
	let url = new URL(urlString);
	let searchParams = url.searchParams;
  searchParams.set(param, value);
  url.search = searchParams.toString();
  
  return url.toString();
}

function goToLocation(element) {
  let link = element.dataset.href;
  let newURL = updateQueryStringParameter(link, fromQuery, window.location.href);
  console.log(newURL);
  window.location.href = newURL;
}

function goBack(){
  let searchParams = new URLSearchParams(window.location.search);
  let newURL = searchParams.get(fromQuery);
  window.location.href = newURL;
}

document.querySelectorAll("a").forEach(function(element){
		element.dataset.href = element.href;
    element.addEventListener("click", function(event) { 
    	event.preventDefault(); // prevent default action l.e redirecting 
      goToLocation(event.srcElement);
		}); 
  });
