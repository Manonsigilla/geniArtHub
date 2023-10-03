let datas = []
// let productLocalStorage = JSON.parse(localStorage.getItem("products"));

async function init(){
    datas = await getDatas();
    getProduct();
}
init()

async function getDatas(){
    const recup = await fetch ('http://localhost:3000/api/products/');
    return await recup.json();
}

function getProduct() {
    datas.forEach(product => {
        const afficherProduct = `
        <article>
            <img src="${product.image}" alt="${product.shorttitle}">
            <a href="product.html?id=${product._id}">Buy ${product.shorttitle}</a>
        </article>`;

        const section = document.querySelector('.products');

        section.insertAdjacentHTML('beforeend', afficherProduct);
    })
}
