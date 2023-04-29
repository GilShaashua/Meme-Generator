'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getMemeImgs()
    const strHtml = imgs.map(img => `
    <img src="${img.url}" onclick="onImgSelect(${img.id},'${img.url}')" alt="${img.id}" />`)

    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHtml.join('')
}

function onImgSelect(imgId, imgUrl) {
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'none'
    const elSavedMemesContainer = document.querySelector('.saved-memes-section')
    elSavedMemesContainer.style.display = 'none'
    const elMemeEditorSection = document.querySelector('.meme-editor-section')
    elMemeEditorSection.style.display = 'flex'

    const elColorInp = document.querySelector('#inp-color')
    elColorInp.value = '#ffffff'
    gIsSavedMemesMode = false
    resetGMeme()
    setImg(imgId)
    setImgUrl(imgUrl)
    openEditor()
    renderMeme()
}