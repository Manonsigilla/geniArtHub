let productInLocalStorage = JSON.parse(localStorage.getItem("product"))


if(productInLocalStorage.length > 0){
    productInLocalStorage.forEach(async (el) => {
        const recup = await fetch(`http://localhost:3000/api/products/${el.productId}`)
        const datas = await recup.json()
        let tableau = document.querySelector('tbody')
        const index = datas.declinaisons.findIndex(item => item.taille === el.format)
        
        tableau.insertAdjacentHTML("afterbegin", `
        <td><img src=${datas.image} alt="image-article" class="image"></td>
        <td class="titre">${datas.titre}</td>
        <td>Format <span class="format">${el.format}</span></td>
        <td class="prix">${datas.declinaisons[index].prix} €</td>
        <td class="quantite-panier">Quantité : <input data-index="${productInLocalStorage.indexOf(el)}" type="number" placeholder="${el.quantity}" class="quantite"></td>
        <td><a href="" class="supprimer" data-index="${productInLocalStorage.indexOf(el)}">Supprimer</a></td>
        `)
    })

    setTimeout(() => {
        // fonction pour supprimer un article du panier en  fonction de son format et sans recharger la page
        const supprimer = document.querySelectorAll('.supprimer')

        supprimer.forEach((el, index) => {
            el.addEventListener('click', (e) => {
                e.preventDefault()
                el.closest('tr').remove()
                productInLocalStorage.splice(index, 1)
                localStorage.setItem("product", JSON.stringify(productInLocalStorage))
                numberItem()
            })
        })

        // fonction pour modifier la quantité d'un article  dans le panier
        const quantite = document.querySelectorAll('.quantite')

        quantite.forEach((el) => {
            el.addEventListener('change', (e) => {
                e.preventDefault()
                let index = e.target.dataset.index
                productInLocalStorage[index].quantity = e.target.value
                console.log(quantity)
                localStorage.setItem("product", JSON.stringify(productInLocalStorage))
                numberItem()
            })
        })
    }, 500);
}















// const command = document.querySelector("#submit-cart")

// command.addEventListener("click", () => {
//     const nom = document.querySelector('#nom')
//     if(nom <= 2){

//     }
// })