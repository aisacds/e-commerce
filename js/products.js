const container = document.getElementById("container");
const catID = localStorage.getItem("catID");
const products = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
const title = document.getElementById("h5-title");
const descprice = "b-a";
const ascprice = "a-b";
const relevant = "relevant";
let minCount = undefined;
let maxCount = undefined;
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

    for (let item of array) {
        let { id, image, name, cost, currency, description, soldCount} = item
        addContent = `
        <div class="list-group-item list-group-item-action" onclick="setProductID(`+ id + `)">
            <div class="d-flex flex-column flex-sm-row">
                <div class="col-5 col-sm-5 col-md-4 col-lg-3 align-self-center align-self-sm-auto">
                    <img src="` + image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col mt-2 mt-sm-0 ms-sm-2">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4>`+ name + " - " + cost + " " + currency + `</h4> 
                            <p> `+ description + `</p> 
                        </div>
                        <small class="d-none d-sm-block text-muted">` + soldCount + ` vendidos</small> 
                    </div>
                    <small class="d-sm-none text-muted float-end">` + soldCount + ` vendidos</small> 
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

    getJSONData(products).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data.products;
            name = resultObj.data.catName;
            showCategory(category);
            insertName(name);
            localStorage.setItem("Products", JSON.stringify(category));
        }
    });
});

const sortProducts = (method, array) => {
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
    getJSONData(products).then(function (obj) {
        let products = obj.data.products;
        sortProducts(method, products);
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
    getJSONData(products).then(function (resultObj) {
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
    getJSONData(products).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data.products;
            showCategory(category);
        }
    })
})

document.getElementById("input-search").addEventListener("input", (e) => {
    // reinicio el contenido de div
    container.innerHTML = "";
    // obtengo los productos a filtrar
    getJSONData(products).then((obj) => {
        if (obj.status === "ok") {
            let products = obj.data.products;
            let inputValue = e.target.value.toLowerCase();
            // filtro mediante nombre
            let result = products.filter(item => item.name.toLowerCase().indexOf(inputValue) === 0);
            // filtro por descripcion
            let result2 = products.filter(item => item.description.toLowerCase().indexOf(inputValue) === 0);
            // si se cumpple uno de ambos, añado ya el objeto filtrado
            if (result) {
                showCategory(result);
            }

            if (result2) {
                showCategory(result2);
            } 
        }
    })
})