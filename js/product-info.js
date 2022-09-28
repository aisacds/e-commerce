const productID = localStorage.getItem("productID");
const catID = localStorage.getItem("catID");
const product = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const container = document.getElementById("container");
const productComments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`
const contImg = document.getElementById("container-img");
const contComments = document.getElementById("container-comments");
const contRelProducts = document.getElementById("rel-products");
const textEmail = localStorage.getItem("email");
const divEmail = document.getElementById("divEmail");
divEmail.innerHTML += textEmail;

const showProduct = (array) => {
    let addContent = "";
    let addImg = "";

    addContent = `
        <div class="content-info">
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

getJSONData(product).then(function (resultObj) {
    if (resultObj.status === "ok") {
        array = resultObj.data;
        showProduct(array);
    }
});

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
        <span class="fa fa-star checked"></span>
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

let comments = [];

getJSONData(productComments).then(function (obj) {
    if (obj.status === "ok") {
        result = obj.data;
        comments = result;
        addComments(comments);
    }
})

document.getElementById("btncomment").addEventListener("click", function () {
    // guardo valores
    const select = parseInt(document.getElementById("selectcomment").value);
    let textarea = document.getElementById("textarea-comment").value;
    let date = new Date();
    let today = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    let time = date.toLocaleTimeString();
    // obtengo los comentarios y invierto
    let array = comments.reverse();
    // creo objeto para añadir a los comentarios
    let arr = {
        product: parseInt(productID),
        score: select,
        description: textarea,
        user: textEmail,
        dateTime: today + " " + time
    }
    // a los comentarios le agrego el comentario nuevo (objeto)
    array.push(arr);
    contComments.innerHTML = "";
    addComments(array.reverse());
})

function changeProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

const carousel = document.querySelector(".carousel-inner");
const carouselInd = document.querySelector(".carousel-indicators");

document.addEventListener("DOMContentLoaded", function () {

    const relProducts = JSON.parse(localStorage.getItem("Products")).filter(item => item.id != productID);
    const addBtnRel = (array) => {
        let addBtn = "";

        for (let i = 1; i < array.length; i++) {
            addBtn = `
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="`+ [i] + `"
                    aria-label="Slide `+ [i] + `"></button>`
            carouselInd.innerHTML += addBtn;
        }
    }
    addBtnRel(relProducts);

    const addRelProducts = (array) => {
        let addProductActive = "";

        addProductActive = `
    <div class="carousel-item active">
        <a onclick="changeProductID(`+ array[0].id +`)" href="product-info.html">
            <img src="`+ array[0].image + `" class="d-block w-100" alt="...">
        </a>
    </div>
    `
        carousel.innerHTML += addProductActive;

        let addProducts = "";
        for (let i = 1; i < array.length; i++) {
            addProducts = `
    <div class="carousel-item">
        <a onclick="changeProductID(`+ array[i].id +`)" href="product-info.html">
            <img src="` + array[i].image + `"class="d-block w-100" alt="">
         </a>
    </div>
            `
            carousel.innerHTML += addProducts;
        }
    }
    addRelProducts(relProducts);
})
