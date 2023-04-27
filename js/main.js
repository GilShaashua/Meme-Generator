'use strict'

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onClickLogo() {
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'grid'

    const elMemeEditorContainer = document.querySelector('.meme-editor-section')
    elMemeEditorContainer.style.display = 'none'
}

function onClickGallery() {
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'grid'

    const elMemeEditorContainer = document.querySelector('.meme-editor-section')
    elMemeEditorContainer.style.display = 'none'
    onToggleMenu()
}