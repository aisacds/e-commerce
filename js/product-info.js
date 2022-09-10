const productID = localStorage.getItem("productID");
const catName = localStorage.getItem("catName");
const catID = localStorage.getItem("catID");
const Product = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const container = document.getElementById("container");
const productComments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`
const contImg = document.getElementById("container-img");
const contComments = document.getElementById("container-comments");

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
                <p>`+ catName + `</p>
                <h5>Cantidad de vendidos</h5>
                <p>`+ array.soldCount + `</p>
                <h5>Imágenes ilustrativas</h5>

            </div>
        </div>
        `
    container.innerHTML += addContent;

    for (let item of array.images) {
        console.log(typeof item)
        addImg = `
            
                <img class="col-2 m-3" src="`+ item + `"/>
            
            `
        contImg.innerHTML += addImg;
    }


}

const addComments = (array) => {
    let comments = "";

    for (let item of array) {
        comments = `
    <div class="d-flex row p-2 border">
        <p class="p-comment"><b>`+ item.user + `</b>` + " - " + item.dateTime + ` </p>
        <p class="p-comment">`+ item.description + `</p>
    </div>
    `
        contComments.innerHTML += comments;
    }

}


getJSONData(Product).then(function (resultObj) {
    if (resultObj.status === "ok") {
        category = resultObj.data;
        showCategory(category);
    }
});

getJSONData(productComments).then(function (resultObj) {
    if (resultObj.status === "ok") {
        category = resultObj.data;
        addComments(category);
    }
});