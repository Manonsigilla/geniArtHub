let productInLocalStorage = JSON.parse(localStorage.getItem("product"))

async function prixTotal(){
    const total = document.querySelector('.total p')
    
    const prices = []
    for (const el of productInLocalStorage) {
        const recup = await fetch(`http://localhost:3000/api/products/${el.productId}`)
        const datas = await recup.json()
        const index = datas.declinaisons.findIndex(item => item.taille === el.format)
        prices.push({
            productId: el.productId,
            totalPrice : datas.declinaisons[index].prix * el.quantity,
            quantity: el.quantity
        })
    }

    let totalQuantity = 0
    let totalPrice = 0
    prices.forEach((el) => {
        totalQuantity += el.quantity
        totalPrice += el.totalPrice
    })
    totalPrice = Math.round(totalPrice * 100) / 100
    total.textContent = `${totalQuantity} article(s) dans votre panier pour un total de ${totalPrice} €`
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
        <td class="quantite-panier">Quantité : <input data-index="${productInLocalStorage.indexOf(el)}" type="number" value="${el.quantity}" class="quantite"></td>
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
                }else if(newQuantity === 0){
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

setTimeout(prixTotal, 700)
