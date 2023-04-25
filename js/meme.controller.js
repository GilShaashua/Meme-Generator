'use strict'

let gElCanvas
let gCtx
let gLinesNum = 1

function openEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

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
        renderMeme()
    })
}

function renderCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
    const meme = getMeme()
    const imgs = getMemeImgs()
    const img = imgs.find(img => img.id === meme.selectedImgId)
    const imgUrl = img.url
    drawImgFromlocal(imgUrl)
}

function drawImgFromlocal(imgUrl) {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines()
    }
}

function drawLines() {
    const memeLines = getMeme().lines
    let x
    let y
    memeLines.forEach((memeLine, idx) => {
        if (idx === 0) {
            x = gElCanvas.width / 4
            y = gElCanvas.height / 7
        } else if (idx === 1) {
            x = gElCanvas.width / 4
            y = gElCanvas.height - 40
        }
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = memeLine.color
        gCtx.font = memeLine.size + 'px Impact'
        gCtx.textAlign = memeLine.align
        gCtx.textBaseline = 'middle'

        gCtx.fillText(memeLine.txt, x, y)
        gCtx.strokeText(memeLine.txt, x, y)
    })
}

function onChangeTxtInp(txtValue, lineIdx = 0) {
    setLineTxt(txtValue, lineIdx)
    renderMeme()
}

function onChangeColor(color, lineIdx = 0) {
    changeColor(color, lineIdx)
    renderMeme()
}

function onIncreaseSize(lineIdx = 0) {
    increaseSize(lineIdx)
    renderMeme()
}

function onDecreaseSize(lineIdx = 0) {
    decreaseSize(lineIdx)
    renderMeme()
}

function onAddLine() {
    if (gLinesNum === 2) return
    const inpColor = document.querySelector('#inp-color').value
    addLine(inpColor)
    renderMeme()
    gLinesNum++
}