const container = document.getElementById("table-cart");
const table = document.querySelector(".table");
const productLink = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let product;

document.addEventListener("DOMContentLoaded", getJson(productLink))

async function getJson(link) {
    try {
        response = await fetch(link);
        result = await response.json();
        product = result.articles;
        let cart = localStorage.getItem("cart")
        cart? product = JSON.parse(localStorage.getItem("cart")) : localStorage.setItem("cart", JSON.stringify(product));
    }

    catch (e) {
        console.log(e);
    }

    const showTable = (array) => {
        let addProduct = "";

        let { image, name, unitCost, currency, id} = array[0]

        addProduct = `
        <td><img src="${image}" style="width: 3rem;"></img></td>
        <td>${name}</td>
        <td>${unitCost}` + " " + `${currency}</td>
        <td><input type="number" value="1" style="width: 60px;" class="input-${id}" min="1" onchange="changeCost(${id})"></td>
        <td class="containerCost-${id}">`+ unitCost + " " + currency + `</td>
        `
        container.innerHTML += addProduct

        for (let i = 1; i < array.length; i++) {

            let { images, name, cost, currency, id} = array[i]

            addProduct = `
            <br>
            <td><img src="${images[0]}" style="width: 3rem;"></img></td>
            <td>${name}</td>
            <td>${cost}` + " " + `${currency}</td>
            <td><input type="number" value="1" style="width: 60px;" class="input-${id}" min="1" onchange="changeCost(${id})"></td>
            <td class="containerCost-${id}">` + cost + " " + currency + `</td>
            `
            table.innerHTML += addProduct
        }
    }
    showTable(product);
}

const changeCost = (id) => {
    let inputValue = parseInt(document.querySelector(`.input-${id}`).value);
    let container = document.querySelector(`.containerCost-${id}`);
    const array = product.filter(item => item.id == id)
    array[0].unitCost? container.innerHTML = array[0].unitCost * inputValue + " " + array[0].currency :
     container.innerHTML = array[0].cost * inputValue + " " + array[0].currency;
}

// const deleteItem = (id)=> {
//     const array = product.filter(item => item.id != id)
    
// }



