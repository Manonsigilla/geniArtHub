function showModal(message) {
    const modal = document.createElement('dialog')
        modal.textContent = message
        document.body.appendChild(modal)
        modal.showModal()
        setTimeout(() => {
            modal.close()
            modal.remove()
        }, 2000)
}