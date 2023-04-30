'use strict'

function onInit() {
    renderGallery()
    setKeywordsOnImgs()
}

function renderGallery() {
    const elInpSearch = document.querySelector('#inp-search')
    let imgs = filterSearchSubmit(elInpSearch.value)
    if (!imgs.length && !elInpSearch.value) imgs = getMemeImgs()
    if (!imgs.length && elInpSearch.value) {
        const elImgGalleryContainer = document.querySelector('.gallery-container')
        elImgGalleryContainer.innerText = 'There are no matching images for your search'
        return
    }
    const strHtml = imgs.map(img => `
    <img src="${img.url}" onclick="onImgSelect(${img.id},'${img.url}')" alt="${img.id}" />`)

    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHtml.join('')
}

function onImgSelect(imgId, imgUrl) {
    const elGalleryContainer = document.querySelector('.main-gallery-container')
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

function onSearchSubmit(ev) {
    ev.preventDefault()
    const elInpSearch = document.querySelector('#inp-search')
    renderGallery()
    elInpSearch.value = ''
}