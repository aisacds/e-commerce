const container = document.getElementById("table-cart");
const table = document.querySelector(".table");
const productLink = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let products;

document.addEventListener("DOMContentLoaded", getJson(productLink))

async function getJson(link) {
    try {
        response = await fetch(link);
        result = await response.json();
        products = result.articles;
        let cart = localStorage.getItem("cart");
        cart ? products = JSON.parse(localStorage.getItem("cart")) : localStorage.setItem("cart", JSON.stringify(products));
        for (item of products) {
            if (item.currency !== "USD") {
                item.currency = "USD";
                item.cost = Math.round((item.cost / 41));
            }
        }
        showTable(products);
        showCosts()
    }

    catch (e) {
        console.log(e);
    }
}

const showTable = (array) => {
    let addHTMLContent = "";

    addHTMLContent = `
        <tr>
            <th>Producto</th>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
        </tr>
    `
    table.innerHTML += addHTMLContent;

    for (let item of array) {

        if (item.unitCost) {

            let { image, name, unitCost, currency, id } = array[0]

            addHTMLContent = `
    <br>
    <td><img src="${image}" style="width: 3rem;"></img></td>
    <td>${name}</td>
    <td>${unitCost}` + " " + `${currency}</td>
    <td><input type="number" value="1" style="width: 60px;" class="input-${id}" min="1" onchange="changeSubTotal(${id})"></td>
    <td class="containerCost-${id}">` + unitCost + " " + currency + `</td>
    <td><button type="button" class="btn btn-outline-danger" onclick="deleteItem(${id})"><i class="fa fa-trash"></i></button></td>
    `
            table.innerHTML += addHTMLContent;
        } else {

            let { images, name, cost, currency, id } = item

            addHTMLContent = `
        <br>
        <td><img src="${images[0]}" style="width: 3rem;"></img></td>
        <td>${name}</td>
        <td>${cost}` + " " + `${currency}</td>
        <td><input type="number" value="1" style="width: 60px;" class="input-${id}" min="1" onchange="changeSubTotal(${id})"></td>
        <td class="containerCost-${id}">` + cost + " " + currency + `</td>
        <td><button type="button" class="btn btn-outline-danger" onclick="deleteItem(${id})"><i class="fa fa-trash"></i></button></td>
        `
            table.innerHTML += addHTMLContent;
        }
    }
}
// cambiar subtotal mediante la cantidad del producto
const changeSubTotal = (id) => {
    let inputValue = parseInt(document.querySelector(`.input-${id}`).value);
    let container = document.querySelector(`.containerCost-${id}`);
    const item = products.filter(item => item.id == id)
    item[0].unitCost ? container.innerHTML = item[0].unitCost * inputValue + " " + item[0].currency :
        container.innerHTML = item[0].cost * inputValue + " " + item[0].currency;
    showCosts()
}

function getInputValue(id) {
    return document.querySelector(`.input-${id}`).value;
}

const radios = document.querySelectorAll('input[name="envio-radio"]');
radios.forEach(radio => radio.addEventListener("input", showCosts));

// mostrar costos dinamicos
function showCosts() {
    const contEnvio = document.getElementById("envio");
    const contSubtotal = document.getElementById("subtotal");
    const contTotal = document.getElementById("total");
    let typeSend = document.querySelectorAll('input[name="envio-radio"]:checked');

    let array = [];

    for (let item of products) {
        let input = document.querySelector(`.input-${item.id}`).value;
        item.unitCost ? array.push(item.unitCost * input) : array.push(item.cost * input);
    }
    let newArray = array.reduce(
        (previousValue, currentValue) => previousValue + currentValue)
    contEnvio.innerHTML = Math.round(newArray * typeSend[0].defaultValue) + " " + products[0].currency;
    contSubtotal.innerHTML = newArray + " " + products[0].currency;
    contTotal.innerHTML = newArray + Math.round((newArray * typeSend[0].defaultValue)) + " " + products[0].currency;

}

// eliminar producto del carrito
const deleteItem = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"))
    let found = cart.findIndex(item => item.id === id);
    cart.splice(found, 1);
    products = cart
    localStorage.setItem("cart", JSON.stringify(cart))
    table.innerHTML = "";
    showTable(products);
    showCosts()
}

// validación forma de pago
function checkPago() {
    const credito = document.getElementById("credit-radio");
    const bank = document.getElementById("bank-radio");
    const span = document.getElementById("validationPago");
    const creditInputs = document.querySelectorAll(".credit-input");
    const bankInput = document.querySelector(".bank-input");
    const form = document.querySelector(".valid-payment")
    span.hidden = false
    if (bank.checked || credito.checked) {

        if (bank.checked) {
            for (let item of creditInputs) { item.disabled = true; }
            bankInput.disabled = false;
            form.classList.add("was-validated")

        } if (credito.checked) {
            for (let item of creditInputs) { item.disabled = false; }
            bankInput.disabled = true;
            form.classList.add("was-validated")
        }

        let credits = Array.from(creditInputs)
        if (credits.every(item => item.value !== "") || bankInput.value !== "") {
            span.hidden = true
        } else { span.hidden = false }


    }

}
const btnAlert = document.getElementById("btn-alert");
const divAlert = document.getElementById("alert-success");

document.getElementById("buy-btn").addEventListener("click", function () {
    const span = document.getElementById("validationPago");
    const credit = document.getElementById("credit-radio");
    const bank = document.getElementById("bank-radio");
    const creditInputs = document.querySelectorAll(".credit-input");
    const form = document.querySelector(".valid-dates");
    const bankInput = document.querySelector(".bank-input");
    const sendDates = document.querySelectorAll(".send-dates");
    form.classList.add("was-validated")
    let dates = Array.from(sendDates);
    let credits = Array.from(creditInputs);
    if (bank.checked && bankInput.value !== "" || credit.checked && credits.every(item => item.value !== "")) {
        if (dates.every(item => item.value !== "")){
            divAlert.hidden = false;
        }

    } else { span.hidden = false }

})



btnAlert.addEventListener("click", function() {
    divAlert.hidden = true;
})



