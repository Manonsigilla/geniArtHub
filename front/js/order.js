const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // on teste les champs du formulaire
    // prénom minimum 2 caractères et pas de caractères spéciaux
    if(!/^[a-zA-Z\sàâéèêëîïôöùûüç\-]{2,20}$/.test(document.querySelector('#prenom').value)){
        alert("Le prénom n'est pas valide")
        return
    }
    // nom minimum 2 caractères et pas de caractères spéciaux
    if(!/^[a-zA-Z\sàâéèêëîïôöùûüç\-]{2,20}$/.test(document.querySelector('#nom').value)){
        alert("Le nom n'est pas valide")
        return
    }
    // adresse minimum 10 caractères, pas de caractères spéciaux à part les accents et les titres
    if(!/^[a-zA-Z0-9\sàâéèêëîïôöùûüç\-]{10,50}$/.test(document.querySelector('#adresse').value)){
        alert("L'adresse n'est pas valide")
        return
    }
    // ville minimum 3 caractères et pas de caractères spéciaux, pas de chiffres
    if(!/^[a-zA-Z\sàâéèêëîïôöùûüç\-]{3,20}$/.test(document.querySelector('#ville').value)){
        alert("La ville n'est pas valide")
        return
    }
    // email valide
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/.test(document.querySelector('#mail').value)){
        alert("L'email n'est pas valide")
        return
    }

    const contact = {
        firstName: document.querySelector('#prenom').value,
        lastName: document.querySelector('#nom').value,
        address: document.querySelector('#adresse').value,
        city: document.querySelector('#ville').value,
        email: document.querySelector('#mail').value
    }

    const products = [];
    productInLocalStorage.forEach((el) => {
        products.push(el.productId)
    })

    // on envoie le formulaire
    sendForm(contact, products)
    
})

// fonction asynchrone qui permet d'envoyer le formulaire et de récupérer la réponse du serveur
async function sendForm(contact, products){
    const response = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact, products})
    })
    const data = await response.json()
    
    // on récupère l'order id et on l'affiche avec la modale
    showModal(`Votre commande est validée, votre numéro de commande est le : ${data.orderId}`, "Félicitations");

    // on vide le panier
    localStorage.removeItem('product')
    document.querySelector('tbody').innerHTML = ""
    const total = document.querySelector('.total p')
    total.textContent = `0 article(s) dans votre panier pour un total de 0 €`
    document.querySelector('.contenuPanier').innerText = "Votre panier est vide, veuillez ajouter au moins un article"
    // on reset le formulaire
    document.querySelector('form').reset()
    numberItem()
}