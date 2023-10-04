// récupérer le cart dans le local storage s'il y a des éléments enregistrés dedans alors récupérer la quantité et l'afficher dans un span qu'il faut insérer dans #carticon

const span = '<span>0</span>'
const carticon = document.querySelector('#carticon')
carticon.insertAdjacentHTML('beforeend', span)

function numberItem(){
    const cart = JSON.parse(localStorage.getItem('product')) || []
    if(cart.length == 0){
        document.querySelector('#carticon span').style.visibility = "hidden"
    }
    if(cart.length > 0){
        const quantity = cart.reduce((acc, el) => acc + el.quantity, 0)
        document.querySelector('#carticon span').style.visibility = "visible"
        document.querySelector('#carticon span').textContent = quantity
    }
}
numberItem()
