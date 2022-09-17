const container = document.getElementById("container");
const catID = localStorage.getItem("catID");
const Product = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
const title = document.getElementById("h5-title");
const descprice = "b-a";
const ascprice = "a-b";
const relevant = "relevant";
let minCount = undefined;
let maxCount = undefined;
let textEmail = localStorage.getItem("email");
const divEmail = document.getElementById("divEmail");

divEmail.innerHTML += textEmail;

function insertName(name) {
    let addContentHeader = "";

    addContentHeader += ` ` + `${name}`;

    title.innerHTML += addContentHeader;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

const showCategory = (array) => {
    let addContent = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        addContent = `
        <div class="list-group-item list-group-item-action" onclick="setProductID(`+ product.id + `)">
        <div class="row">
            <div class="col-3">
                <img src="` + product.image + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4>`+ product.name + " - " + product.cost + " " + product.currency + `</h4> 
                    <p> `+ product.description + `</p> 
                    </div>
                    <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                </div>

            </div>
        </div>
    </div>
        `
        container.innerHTML += addContent;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    let category = "";
    let name = "";

    getJSONData(Product).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data.products;
            name = resultObj.data.catName;
            showCategory(category);
            insertName(name);
        }
    });
});

const sortProduct = (method, array) => {
    let result = [];
    if (method === ascprice) {
        result = array.sort(function (a, b) { return a.cost - b.cost });
    } else if (method === descprice) {
        result = array.sort(function (a, b) { return b.cost - a.cost });
    } else if (method === relevant) {
        result = array.sort(function (a, b) { return b.soldCount - a.soldCount });
    }
    return result;
}

const sortPetition = (method) => {
    getJSONData(Product).then(function (obj) {
        products = obj.data.products;
        sortProduct(method, products);
        showCategory(products);
    })
}

const selection = () => {
    const select = document.getElementById("filters");
    container.innerHTML = "";
    if (select.value == "menor") {
        sortPetition(ascprice);
    } else if (select.value == "mayor") {
        sortPetition(descprice);
    } else if (select.value == "relevante") {
        sortPetition(relevant);
    }
}

document.getElementById("btnFilter").addEventListener("click", () => {
    const inputMin = document.getElementById("input-min").value;
    const inputMax = document.getElementById("input-max").value;

    if ((inputMin != undefined) && (inputMin != "") && (parseInt(inputMin)) >= 0) {
        minCount = parseInt(inputMin);
    }
    else {
        minCount = undefined;
    }

    if ((inputMax != undefined) && (inputMax != "") && (parseInt(inputMax)) >= 0) {
        maxCount = parseInt(inputMax);
    }
    else {
        maxCount = undefined;
    }
    getJSONData(Product).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data.products;
            if (maxCount !== undefined && maxCount !== undefined) {
                let array = category.filter(item => item.cost < maxCount && item.cost > minCount);
                container.innerHTML = "";
                showCategory(array);
            }
        }
    })
})

document.getElementById("btnClearFilter").addEventListener("click", function () {
    inputMin = document.getElementById("input-min").value = "";
    inputMax = document.getElementById("input-max").value = "";
    maxCount = undefined;
    minCount = undefined;
    container.innerHTML = "";
    getJSONData(Product).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data.products;
            showCategory(category);
        }
    })
})

document.getElementById("input-search").addEventListener("input", (e) => {
    container.innerHTML = "";
    getJSONData(Product).then((obj) => {
        if (obj.status === "ok") {
            let products = obj.data.products;
            let inputValue = e.target.value.toLowerCase();
            //buscar por nombre
            let result = products.filter(item => item.name.toLowerCase().indexOf(inputValue) === 0);
            //buscar por descripcion
            let result2 = products.filter(item => item.description.toLowerCase().indexOf(inputValue) === 0);
            if (result) {
                showCategory(result);
            }

            if (result2) {
                showCategory(result2);
            } 
        }
    })
})