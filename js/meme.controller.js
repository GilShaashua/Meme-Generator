'use strict'

let gElCanvas
let gCtx
let xyLine1
let xyLine2
let txtMetrix

function openEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    addListeners()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function addListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
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
        drawFocus()
    }
}

function drawLines() {
    const memeLines = getMeme().lines
    xyLine1 = { x: 0, y: 0 }
    xyLine2 = { x: 0, y: 0 }

    memeLines.forEach((memeLine, idx) => {
        if (idx === 0) {
            if (memeLine.align === 'middle') {
                xyLine1.x = (gElCanvas.width / 2) - ((memeLine.txt.length * memeLine.size) / 4)
                xyLine1.y = gElCanvas.height / 8
            } else if (memeLine.align === 'start') {
                xyLine1.x = 20
                xyLine1.y = gElCanvas.height / 8
            } else if (memeLine.align === 'end') {
                xyLine1.x = gElCanvas.width - ((memeLine.txt.length * memeLine.size) / 2)
                xyLine1.y = gElCanvas.height / 8
            }
            renderText(xyLine1.x, xyLine1.y, memeLine)

        } else if (idx === 1) {
            if (memeLine.align === 'middle') {
                xyLine2.x = (gElCanvas.width / 2) - ((memeLine.txt.length * memeLine.size) / 4)
                xyLine2.y = gElCanvas.height - 30
            } else if (memeLine.align === 'start') {
                xyLine2.x = 20
                xyLine2.y = gElCanvas.height - 30
            } else if (memeLine.align === 'end') {
                xyLine2.x = gElCanvas.width - ((memeLine.txt.length * memeLine.size) / 2)
                xyLine2.y = gElCanvas.height - 30
            }
            renderText(xyLine2.x, xyLine2.y, memeLine)
        }
    })
}

function renderText(x, y, memeLine) {
    txtMetrix = gCtx.measureText(getMeme().lines[getLineIdx()].txt)

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = memeLine.color
    gCtx.font = memeLine.size + 'px ' + memeLine.font
    gCtx.fillText(memeLine.txt, x, y)
    gCtx.strokeText(memeLine.txt, x, y)
}

function onChangeTxtInp(txtValue) {
    const memeLineIdx = getMeme().selectedLineIdx

    setLineTxt(txtValue, memeLineIdx)
    renderMeme()
}

function onBlurTxtInp(elTxtInp) {
    elTxtInp.value = ''
}

function onSubmitTxtInp(ev) {
    ev.preventDefault()
    const elTxtInp = document.querySelector('.inp-text')
    elTxtInp.value = ''
}

function onChangeColor(color) {
    const memeLineIdx = getMeme().selectedLineIdx

    changeColor(color, memeLineIdx)
    renderMeme()
}

function onIncreaseSize() {
    const memeLineIdx = getMeme().selectedLineIdx

    increaseSize(memeLineIdx)
    renderMeme()
}

function onDecreaseSize() {
    const memeLineIdx = getMeme().selectedLineIdx

    decreaseSize(memeLineIdx)
    renderMeme()
}

function onAlignLeft() {
    const memeLineIdx = getMeme().selectedLineIdx
    alignLeft(memeLineIdx)
    renderMeme()
}

function onAlignRight() {
    const memeLineIdx = getMeme().selectedLineIdx
    alignRight(memeLineIdx)
    renderMeme()
}

function onAlignCenter() {
    const memeLineIdx = getMeme().selectedLineIdx
    alignCenter(memeLineIdx)
    renderMeme()
}

function onDeleteLine() {
    const memeLineIdx = getMeme().selectedLineIdx
    deleteLine(memeLineIdx)
    renderMeme()
}

function onFontSelect(value) {
    const memeLineIdx = getMeme().selectedLineIdx
    fontSelect(memeLineIdx, value)
    renderMeme()
}

function onAddLine() {
    if (getMeme().lines.length === 2) return
    const inpColor = document.querySelector('#inp-color').value
    addLine(inpColor)
    renderMeme()
}

function onSwitchLine() {
    if (getMeme().lines.length === 1) return
    switchLine()
    renderMeme()
}

function onDownloadImg(elLink) {
    renderMeme()
    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent
    }, 1)
}

function drawFocus() {
    if (!getLineIdx()) {
        gCtx.strokeStyle = 'red'
        gCtx.strokeRect(0, 0, gElCanvas.width, gElCanvas.height / 5)
    } else {
        gCtx.strokeStyle = 'red'
        gCtx.strokeRect(0, gElCanvas.height - 85, gElCanvas.width, gElCanvas.height)
    }
}