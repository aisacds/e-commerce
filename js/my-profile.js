const btn = document.getElementById("button");
const btnClose = document.getElementById("btn-close");
const alert = document.getElementById("alert-success")

document.addEventListener("DOMContentLoaded", function () {
    const firstName = document.getElementById("first-name");
    const secondName = document.getElementById("second-name");
    const firstSur = document.getElementById("first-surname");
    const secondSur = document.getElementById("second-surname");
    const phone = document.getElementById("phone");
    const imgProfile = document.getElementById("img-profile");
    const email = document.getElementById("email");
    let textEmail = localStorage.getItem("email");
    email.value = textEmail

    let profile = JSON.parse(localStorage.getItem("profileDates"));
    if (profile) {
        firstName.value = profile.firstName
        secondName.value = profile.secondName
        firstSur.value = profile.firstSurname
        secondSur.value = profile.secondSurname
        imgProfile.src = profile.img
        phone.value = profile.phone
    }
})

btn.addEventListener("click", function (e) {
    e.preventDefault()
    const firstName = document.getElementById("first-name").value;
    const secondName = document.getElementById("second-name").value;
    const firstSur = document.getElementById("first-surname").value;
    const secondSur = document.getElementById("second-surname").value;
    const email = document.getElementById("email").value;
    const img = document.getElementById("img");
    const phone = document.getElementById("phone").value;
    const imgProfile = document.getElementById("img-profile");
    const form = document.getElementById("profile-form");
    
    if (form.checkValidity()) {

        form.classList.remove("was-validated");
        alert.hidden = false
        
        const dates = {
            firstName: firstName,
            secondName: secondName,
            firstSurname: firstSur,
            secondSurname: secondSur,
            email: email,
            img: imgProfile.src,
            phone: phone
        }

        localStorage.setItem("profileDates", JSON.stringify(dates))

        if (img.value !== "") {
            let fReader = new FileReader();
            fReader.readAsDataURL(img.files[0]);
            fReader.onloadend = function (event) {

                imgProfile.src = event.target.result;
                let profile = JSON.parse(localStorage.getItem("profileDates"));
                profile.img = event.target.result
                localStorage.setItem("profileDates", JSON.stringify(profile))
            }
        }
    } else {
        form.classList.add("was-validated")
    }
})

btnClose.addEventListener("click", function () {
    alert.hidden = true;
})