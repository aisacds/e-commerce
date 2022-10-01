document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
        
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

if (!localStorage.getItem('email')) {
    window.location.href = "login.html";
}

let textEmail = localStorage.getItem("email");
const btnEmail = document.getElementById("dropdownMenuButton");
const dropMenu = document.getElementById("dropmenu");

btnEmail.innerHTML += textEmail;

const menu = ()=> {
    let value = btnEmail.getAttribute("aria-expanded");
    if(value == "true") {
        btnEmail.setAttribute("aria-expanded", "false");
        dropMenu.setAttribute("hidden", "")
    }
    if (value == "false") {
        btnEmail.setAttribute("aria-expanded", "true");
        dropMenu.removeAttribute("hidden")
    }
}

