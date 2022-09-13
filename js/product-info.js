const productID = localStorage.getItem("productID");
const catID = localStorage.getItem("catID");
const Product = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const container = document.getElementById("container");
const productComments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`
const contImg = document.getElementById("container-img");
const contComments = document.getElementById("container-comments");
let textEmail = localStorage.getItem("email");
const divEmail = document.getElementById("divEmail");
divEmail.innerHTML += textEmail;

getJSONData(productComments).then(function (obj) {
    if (obj.status === "ok") {
        result = obj.data;
        localStorage.setItem("comments", JSON.stringify(result))
        addComments(JSON.parse(localStorage.getItem("comments")));
    }
})

const showCategory = (array) => {
    let addContent = "";
    let addImg = "";

    addContent = `
        <div class="m-3">
            <h1>`+ array.name + `</h1>
            <hr>
            <div class="m-4">
                <h5>Precio</h5>
                <p>`+ array.currency + " " + array.cost + `<p>
                <h5>Descripción</h5>
                <p>`+ array.description + `</p>
                <h5>Categoria</h5>
                <p>`+ array.category + `</p>
                <h5>Cantidad de vendidos</h5>
                <p>`+ array.soldCount + `</p>
                <h5>Imágenes ilustrativas</h5>

            </div>
        </div>
        `
    container.innerHTML += addContent;

    for (let item of array.images) {
        addImg = `
                <img class="col-2 m-3" src="`+ item + `"/>
            `
        contImg.innerHTML += addImg;
    }
}

const starsAdd = (score, element) => {
    let comment = document.getElementById(element);
    switch (score) {
        case 1: comment.innerHTML += `
         <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        `; break;
        case 2: comment.innerHTML += `
         <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        `; break;
        case 3: comment.innerHTML += `
         <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        `; break;
        case 4: comment.innerHTML += `
         <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        `; break;
        case 5: comment.innerHTML += `
         <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        `; break;
    }
}

const addComments = (array) => {
    let comments = "";
    for (let item of array) {
        comments = `
    <div class="comments border p-1">
        <p class ="m-1" id="`+ item.user + `"><b>` + item.user + `</b>` + " - " + item.dateTime + " - " + ` 
        </p>
        <p class="m-1">`+ item.description + `</p>
    </div>
    `
        contComments.innerHTML += comments;
        starsAdd(item.score, item.user)
    }
}

getJSONData(Product).then(function (resultObj) {
    if (resultObj.status === "ok") {
        category = resultObj.data;
        showCategory(category);
    }
});

const addComment = (time, user, description, rating) => {
    let comment = "";
    comment = `
    <div class="comments border p-1">
        <p class ="m-1" id="`+ user + `"><b>` + user + `</b>` + " - " + time + " - " + ` 
        </p>
        <p class="m-1">`+ description + `</p>
    </div>
    `
    contComments.insertAdjacentHTML("beforebegin", comment);
    starsAdd(rating, user);
}

const ratSelection = () => {
    const select = parseInt(document.getElementById("selectcomment").value);
    let textarea = document.getElementById("textarea-comment").value;
    let date = new Date();
    let today = date.getFullYear() + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0');
    let time = date.toLocaleTimeString();
    let array = JSON.parse(localStorage.getItem("comments")).reverse();
    let arr = {
        product: array[0].product, 
        score: select, 
        description: textarea, 
        user: textEmail, 
        dateTime: today + " " + time
    }
    document.getElementById("btncomment").addEventListener("click", function () {
        array.push(arr);
        contComments.innerHTML = "";
        addComments(array.reverse());
    })
}