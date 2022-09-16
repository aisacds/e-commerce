const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("input-email");
    let pw = document.getElementById("input-password");
    if (email.value.length !== 0) {
        localStorage.setItem('email', email.value);
        window.location.href = "index.html";

    }

  
})

