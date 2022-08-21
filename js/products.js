
const div = document.getElementById("container");
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"



const showCategory = (array, name) => {
    let addContent = "";
    let addContentHeader = "";

    addContentHeader = `
    <div class="mt-4 mb-4 d-flex row text-center" >
    <h1>Productos</h1>
    <h5>Veras aquí todos los productos de la categoría` + " " + name + `</h5>
    
    </div>
    `

    div.innerHTML += addContentHeader;

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        addContent = `
        <div class="list-group-item list-group-item-action">
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
        div.innerHTML += addContent;

    }

}

document.addEventListener("DOMContentLoaded", function (e) {
    let category = "";
    let name = "";

    getJSONData(AUTOS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data.products;
            name = resultObj.data.catName;
            showCategory(category, name);

        }
    });
});






