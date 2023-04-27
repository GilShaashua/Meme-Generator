'use strict'

let gElCanvas
let gCtx


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
    // addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
        resizeDrawFocus()
    })
}

function resizeDrawFocus() {
    if (!getLineIdx()) setTimeout(drawFocus, 10, 0, 0)
    else setTimeout(drawFocus, 10, 0, gElCanvas.height - 116.5)
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
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

    memeLines.forEach((memeLine, idx) => {

        let x
        let y

        if (idx === 0) {
            if (memeLine.align === 'middle') {
                x = (gElCanvas.width / 2) - ((memeLine.txt.length * memeLine.size) / 4)
                y = gElCanvas.height / 8
            } else if (memeLine.align === 'start') {
                x = 20
                y = gElCanvas.height / 8
            } else if (memeLine.align === 'end') {
                x = gElCanvas.width - ((memeLine.txt.length * memeLine.size) / 2)
                y = gElCanvas.height / 8
            }

        } else if (idx === 1) {
            if (memeLine.align === 'middle') {
                x = (gElCanvas.width / 2) - ((memeLine.txt.length * memeLine.size) / 4)
                y = gElCanvas.height - 50
            } else if (memeLine.align === 'start') {
                x = 20
                y = gElCanvas.height - 50
            } else if (memeLine.align === 'end') {
                x = gElCanvas.width - ((memeLine.txt.length * memeLine.size) / 2)
                y = gElCanvas.height - 50
            }
        }
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = memeLine.color
        gCtx.font = memeLine.size + 'px ' + memeLine.font
        gCtx.textBaseline = 'middle'

        gCtx.fillText(memeLine.txt, x, y)
        gCtx.strokeText(memeLine.txt, x, y)
    })
}

function onChangeTxtInp(txtValue) {
    const memeLineIdx = getMeme().selectedLineIdx

    setLineTxt(txtValue, memeLineIdx)
    conditionRenderMemeDrawFocus()
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
    conditionRenderMemeDrawFocus()
}

function onIncreaseSize() {
    const memeLineIdx = getMeme().selectedLineIdx

    increaseSize(memeLineIdx)
    conditionRenderMemeDrawFocus()
}

function onDecreaseSize() {
    const memeLineIdx = getMeme().selectedLineIdx

    decreaseSize(memeLineIdx)
    conditionRenderMemeDrawFocus()
}

function onAlignLeft() {
    const memeLineIdx = getMeme().selectedLineIdx
    alignLeft(memeLineIdx)
    conditionRenderMemeDrawFocus()
}

function onAlignRight() {
    const memeLineIdx = getMeme().selectedLineIdx
    alignRight(memeLineIdx)
    conditionRenderMemeDrawFocus()
}

function onAlignCenter() {
    const memeLineIdx = getMeme().selectedLineIdx
    alignCenter(memeLineIdx)
    conditionRenderMemeDrawFocus()
}

function onDeleteLine() {
    const memeLineIdx = getMeme().selectedLineIdx
    deleteLine(memeLineIdx)
    conditionRenderMemeDrawFocus()
}

function onFontSelect(value) {
    const memeLineIdx = getMeme().selectedLineIdx
    fontSelect(memeLineIdx, value)
    conditionRenderMemeDrawFocus()
}

function onAddLine() {
    if (getMeme().lines.length === 2) return
    const inpColor = document.querySelector('#inp-color').value
    addLine(inpColor)
    conditionRenderMemeDrawFocus()
}

function onSwitchLine() {
    if (getMeme().lines.length === 1) return
    switchLine()
    conditionRenderMemeDrawFocus()
}

function onDownloadImg(elLink) {
    renderMeme()
    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent
    }, 1)
}

function conditionRenderMemeDrawFocus() {
    if (!getLineIdx()) {
        renderMeme()
        setTimeout(drawFocus, 10, 0, 0)
    } else {
        renderMeme()
        setTimeout(drawFocus, 10, 0, gElCanvas.height - 116.5)
    }
}

function drawFocus(x, y) {
    gCtx.strokeStyle = 'red'
    gCtx.strokeRect(x, y, gElCanvas.width, gElCanvas.height / 4)
}