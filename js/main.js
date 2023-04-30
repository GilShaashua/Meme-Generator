'use strict'

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onClickLogo() {
    const elGalleryContainer = document.querySelector('.main-gallery-container')
    elGalleryContainer.style.display = 'block'
    const elMemeEditorContainer = document.querySelector('.meme-editor-section')
    elMemeEditorContainer.style.display = 'none'
    const elSavedMemesSection = document.querySelector('.saved-memes-section')
    elSavedMemesSection.style.display = 'none'
    const elAboutMeSection = document.querySelector('.about-section')
    elAboutMeSection.style.display = 'none'
    renderGallery()
}

function onClickGallery() {
    const elGalleryContainer = document.querySelector('.main-gallery-container')
    elGalleryContainer.style.display = 'block'
    const elMemeEditorContainer = document.querySelector('.meme-editor-section')
    elMemeEditorContainer.style.display = 'none'
    const elSavedMemeSection = document.querySelector('.saved-memes-section')
    elSavedMemeSection.style.display = 'none'
    const elAboutMeSection = document.querySelector('.about-section')
    elAboutMeSection.style.display = 'none'
    onToggleMenu()
    renderGallery()
}

function onBlurSearchInp() {
    const elInpSearch = document.querySelector('#inp-search')
    elInpSearch.value = ''
}

function onClickAboutMe() {
    const elGalleryContainer = document.querySelector('.main-gallery-container')
    elGalleryContainer.style.display = 'none'
    const elMemeEditorContainer = document.querySelector('.meme-editor-section')
    elMemeEditorContainer.style.display = 'none'
    const elSavedMemeSection = document.querySelector('.saved-memes-section')
    elSavedMemeSection.style.display = 'none'
    const elAboutMeSection = document.querySelector('.about-section')
    elAboutMeSection.style.display = 'flex'
    onToggleMenu()
    renderGallery()
}