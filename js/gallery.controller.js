'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getMemeImgs()
    const strHtml = imgs.map(img => `
    <img src="${img.url}" onclick="onImgSelect(${img.id})" alt="${img.id}" />`)

    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHtml.join('')
}

function onImgSelect(imgId) {
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'none'
    const elMemeEditorSection = document.querySelector('.meme-editor-section')
    elMemeEditorSection.style.display = 'block'
    openEditor()
    setImg(imgId)
    renderMeme()
}