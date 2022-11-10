const productID = localStorage.getItem("productID");
const catID = localStorage.getItem("catID");
const product = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const container = document.getElementById("container");
const productComments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`
const contImg = document.getElementById("container-img");
const contComments = document.getElementById("container-comments");
const contRelProducts = document.getElementById("rel-products");
const PRODUCTS_URLs = `https://japceibal.github.io/emercado-api/cats_products/${productID}.json`;

async function getProduct(link) {
    try {
        response = await fetch(link);
        result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}

getProduct(product).then(function (result) {
    console.log(result)

})

// add product in cart
const setInCart = ()=> {
    getProduct(product).then(function (result) {
            cart = JSON.parse(localStorage.getItem("cart"));
            cart.push(result);
            localStorage.setItem("cart", JSON.stringify(cart))
            alert("Añadido con éxito");
    });
}

const showProduct = (product) => {
    let addContent = "";
    let addImg = "";
    let { name, currency, cost, description, category, soldCount, images} = product;

    addContent = `
        <div class="content-info">
            <div class="d-flex flex-column text-center d-md-flex flex-md-row text-md-start justify-content-md-between">
                <h1 class="d-inline">`+ name + `</h1>
                <button class="btn btn-success mt-2  mb-sm-3  mx-lg-5" onclick="setInCart()">Añadir al carrito</button>
            </div>
            <hr>
            <div class="m-4">
                <h5>Precio</h5>
                <p>`+ currency + " " + cost + `<p>
                <h5>Descripción</h5>
                <p>`+ description + `</p>
                <h5>Categoria</h5>
                <p>`+ category + `</p>
                <h5>Cantidad de vendidos</h5>
                <p>`+ soldCount + `</p>
                <h5>Imágenes ilustrativas</h5>
            </div>
        </div>
        `
    container.innerHTML += addContent;

    for (let item of images) {
        addImg = `
                <img class="col-5 m-2 col-md-2 col-lg-2" src="`+ item + `"/>
            `
        contImg.innerHTML += addImg;
    }
}

getProduct(product).then(function (result) {
        showProduct(result);
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
        let { user, dateTime, description } = item;

        comments = `
    <div class="comments border p-1">
        <p class ="m-1" id="`+ user + `"><b>` + user + `</b>` + " - " + dateTime + " - " + ` 
        </p>
        <p class="m-1">`+ description + `</p>
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
        <p class ="m-1" id="`+ user + `"><b>` + user + `</b>` + " - " + time + " - " + `</p>
        <p class="m-1">`+ description + `</p>
    </div>
    `
    contComments.insertAdjacentHTML("beforebegin", comment);
    starsAdd(rating, user);
}

getProduct(productComments).then(function (result) {
        addComments(result);
        localStorage.setItem("comments", JSON.stringify(result));
})

// add new comment
document.getElementById("btncomment").addEventListener("click", function () {

    const select = parseInt(document.getElementById("selectcomment").value);
    let textarea = document.getElementById("textarea-comment").value;
    let date = new Date();
    let today = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    let time = date.toLocaleTimeString();
    let array = JSON.parse(localStorage.getItem("comments")).reverse();
    let arr = {
        product: parseInt(productID),
        score: select,
        description: textarea,
        user: textEmail,
        dateTime: today + " " + time
    }
    array.push(arr);
    contComments.innerHTML = "";
    addComments(array.reverse());
})

// for carousel items
function changeProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

// carousel
document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.querySelector(".carousel-inner");
    const addRelProducts = (array) => {
        let addProductActive = "";

        // first active
        addProductActive = `
    <div class="carousel-item active">
        <a onclick="changeProductID(`+ array[0].id + `)" href="product-info.html">
            <img src="`+ array[0].image + `" class="d-block w-100" alt="...">
        </a>
    </div>
    `
        carousel.innerHTML += addProductActive;

        let addProduct = "";

        // second item
        addProduct = `
    <div class="carousel-item">
        <a onclick="changeProductID(`+ array[1].id + `)" href="product-info.html">
            <img src="` + array[1].image + `"class="d-block w-100" alt="">
         </a>
    </div>
            `
        carousel.innerHTML += addProduct;
    }
    // obtengo el json y accedo a productos relacionados
    getProduct(product).then(function (result) {
            let products = result.relatedProducts;
            addRelProducts(products);
    });
})
