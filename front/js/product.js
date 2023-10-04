const urlIdItem = window.location.search

const params = new URLSearchParams(urlIdItem)
const id = params.get("id")
// console.log(params.searchParams.get("id"));

let datas = []

async function init(){
    datas = await resultId()
    populate(datas)
}
init()

async function resultId() {
    const recup = await fetch(`http://localhost:3000/api/products/${id}`)
    return await recup.json()
}

function populate(d) {
    document.querySelector('title').innerHTML = d.titre;
    document.querySelector('.detailoeuvre img').src = d.image;
    document.querySelector('.detailoeuvre h1').innerHTML = d.titre;
    document.querySelector('.detailoeuvre p').innerHTML = d.description.substring(0, 200) + "...";
    document.querySelector('.showprice').innerHTML = d.declinaisons[0].prix + "€";
    document.querySelector('.button-buy').innerHTML = `Buy ${d.shorttitle}`;
    document.querySelector('aside h2').innerHTML = `Description de l'oeuvre : ${d.titre}`;
    document.querySelector('aside p').innerHTML = d.description;

    const select = document.querySelector('#format')

    d.declinaisons.forEach((el, index) => {
        select.innerHTML += `<option data-id="${index}" value="${el.taille}">Format : ${el.taille}</option>`;
    })

    select.addEventListener('change', () =>{
        const id = select.options[select.selectedIndex].dataset.id;
        document.querySelector('.showprice').innerHTML = d.declinaisons[id].prix + "€";
    })
}

const buy = document.querySelector(".button-buy")


buy.addEventListener("click", () => {
    const optionsProduct = {
        productId : id,
        quantity : parseInt(document.querySelector('#quantity').value),
        format : document.querySelector('#format').value
    }

    let productInLocalStorage = JSON.parse(localStorage.getItem("product")) || []
    // console.log(formatRecherche)
    const isProductExist = productInLocalStorage.findIndex(item => item.productId === optionsProduct.productId && item.format === optionsProduct.format)

    // if(isProductExist.quantity < 100 && isProductExist.quantity > 0){
        // s'il y a un produit dans le local storage
        if(isProductExist !== -1){
            isProductExist.quantity += parseInt(quantity)
            productInLocalStorage[isProductExist].quantity += optionsProduct.quantity
        } else { // s'il n'y a pas de produit dans le local storage
            productInLocalStorage.push(optionsProduct)
        }
        localStorage.setItem("product", JSON.stringify(productInLocalStorage))
    // }
})