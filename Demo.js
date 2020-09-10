function addGoBack() {
    document.querySelectorAll("#goBack").forEach(function(element){
        element.onclick = goBack;
    });
}
  
document.addEventListener("DOMContentLoaded", addGoBack);