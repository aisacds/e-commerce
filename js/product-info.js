const productID = localStorage.getItem("productID");
const catID = localStorage.getItem("catID");
const product = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const container = document.getElementById("container");
const productComments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`
const contImg = document.getElementById("container-img");
const contComments = document.getElementById("container-comments");
const contRelProducts = document.getElementById("rel-products");
const PRODUCTS_URLs = `https://japceibal.github.io/emercado-api/cats_products/${productID}.json`;

// funcion que añade el producto al carrito al onclick del boton
const setInCart = ()=> {
    getJSONData(product).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let product = resultObj.data;
            cart = JSON.parse(localStorage.getItem("cart"));
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart))
            alert("Añadido con éxito");
        }
    });
    
}

const showProduct = (product) => {
    let addContent = "";
    let addImg = "";
    let { name, currency, cost, description, category, soldCount, images} = product;

    addContent = `
        <div class="content-info">
        <div class="">
            <h1 class="d-inline">`+ name + `</h1>
            <button class="btn btn-success ms-5" onclick="setInCart()">Añadir al carrito</button>
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
                <img class="col-2 m-3" src="`+ item + `"/>
            `
        contImg.innerHTML += addImg;
    }
}

getJSONData(product).then(function (resultObj) {
    if (resultObj.status === "ok") {
        let products = resultObj.data;
        showProduct(products);
        
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
        <p class ="m-1" id="`+ user + `"><b>` + user + `</b>` + " - " + time + " - " + ` 
        </p>
        <p class="m-1">`+ description + `</p>
    </div>
    `
    contComments.insertAdjacentHTML("beforebegin", comment);
    starsAdd(rating, user);
}

getJSONData(productComments).then(function (obj) {
    if (obj.status === "ok") {
        result = obj.data;
        let comments = result;
        addComments(comments);
        localStorage.setItem("comments", JSON.stringify(comments));
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
    let array = JSON.parse(localStorage.getItem("comments")).reverse();
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

 // funcion onclick para cambiar de producto al relacionado
function changeProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.querySelector(".carousel-inner");
    const addRelProducts = (array) => {
        let addProductActive = "";

        // agrego el primer producto como activo
        addProductActive = `
    <div class="carousel-item active">
        <a onclick="changeProductID(`+ array[0].id + `)" href="product-info.html">
            <img src="`+ array[0].image + `" class="d-block w-100" alt="...">
        </a>
    </div>
    `
        carousel.innerHTML += addProductActive;

        let addProduct = "";

        // segundo producto
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
    getJSONData(product).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let products = resultObj.data.relatedProducts;
            addRelProducts(products);
        }
    });
})
