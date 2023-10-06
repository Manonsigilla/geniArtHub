let productInLocalStorage = JSON.parse(localStorage.getItem("product"))
// on initialise la variable prixTotal à 0
let Totalprice = 0
let totalQuantity = 0

// on actualise le prix total en indiquant le nombre d'articles en quantité commandée et le prix total
// fonction pour calculer le prix total du panier en créant un élément p qui ira en dessous de la class total qui contient un h2 et qui contiendra le prix total
function prixTotal(){
    // on crée les constantes pour récupérer les éléments dont on a besoin, on crée une variable qui contiendra le prix total et on crée une boucle pour récupérer le prix de chaque article et le multiplier par sa quantité
    const total = document.querySelector('.total')
    // on crée l'élément p dans la class total qui contiendra le prix total
    let p = document.querySelector('.total p')
    if (!p) {
        p = document.createElement('p')
        total.appendChild(p)
    }
    
    productInLocalStorage.forEach(async (el) => {
        const recup = await fetch(`http://localhost:3000/api/products/${el.productId}`)
        const datas = await recup.json()
        const index = datas.declinaisons.findIndex(item => item.taille === el.format)
        Totalprice += datas.declinaisons[index].prix * el.quantity
        totalQuantity = el.quantity
    })
    // on arrondit à 2 chiffres après la virgule le prix total
    Totalprice = Math.round(Totalprice * 100) / 100
    // on écrit la quantité d'article commandé et le prix total
    p.textContent = `${totalQuantity} article(s) dans votre panier pour un total de ${Totalprice} €`
}

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
                prixTotal()
                numberItem()
            })
        })
        
        // fonction pour modifier la quantité d'un article  dans le panier
        const quantite = document.querySelectorAll('.quantite')
        
        quantite.forEach((el) => {
            el.addEventListener('change', (e) => {
                e.preventDefault()
                const newIndex = e.target.dataset.index
                const currentQuantity = productInLocalStorage[newIndex].quantity
                const newQuantity = parseInt(e.target.value)

                if(newQuantity < 0){
                    alert("Vous ne pouvez pas introduire un nombre négatif")
                    // on laisse la quantité à laquelle elle était avant
                    e.target.value = currentQuantity
                }else if(newQuantity == 0){
                    el.closest('tr').remove()
                    productInLocalStorage.splice(newIndex, 1)
                    localStorage.setItem("product", JSON.stringify(productInLocalStorage))
                    prixTotal()
                    numberItem()
                }
                else{
                    productInLocalStorage[newIndex].quantity = newQuantity
                    localStorage.setItem("product", JSON.stringify(productInLocalStorage))
                    prixTotal()
                    numberItem()
                }
            })
        })  
    }, 500);
}

prixTotal()
setTimeout(prixTotal, 700)
















// const command = document.querySelector("#submit-cart")

// command.addEventListener("click", () => {
//     const nom = document.querySelector('#nom')
//     if(nom <= 2){

//     }
// })