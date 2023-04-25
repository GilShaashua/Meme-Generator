'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
    resizeCanvas()
    addListeners()
    renderCanvas()
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function addListeners() {
    // addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function renderCanvas() {
    gCtx.fillStyle = '#ede5ff'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
    const meme = getMeme()
    const imgs = getMemeImgs()
    const img = imgs.find(img => img.id === meme.selectedImgId)
    const imgUrl = img.url
    const memeTxt = meme.lines[0].txt
    const { color, size, align } = meme.lines[0]
    drawImgFromlocal(imgUrl, memeTxt, color, size, align)
}

function drawImgFromlocal(imgSrc, memeTxt, color, size, align) {
    const img = new Image()
    img.src = imgSrc
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xEnd,yEnd
        drawText(memeTxt, gElCanvas.width / 6, gElCanvas.height / 6, color, align, size)
    }
}

function drawText(text, x, y, color, align, size) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = size + 'px Impact'
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function onChangeTxtInp(txtValue, inputNum = 0) {
    setLineTxt(txtValue, inputNum)
    renderMeme()
}