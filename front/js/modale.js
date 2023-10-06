function showModal(message, title = ""){
    const modal = document.createElement('dialog')
    if (title) {
        const titleElt = document.createElement('h2')
        titleElt.textContent = title
        modal.appendChild(titleElt)
    }
    modal.appendChild(document.createTextNode(message))
    document.body.appendChild(modal)
    modal.showModal()
    setTimeout(() => {
        modal.close()
        modal.remove()
    }, 3000)
}