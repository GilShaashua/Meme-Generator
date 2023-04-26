'use strict'

let gElCanvas
let gCtx
// let posXLine1
// let posYLine1
// let posXline2
// let posYline2

function openEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // posXLine1 = gElCanvas.width - gElCanvas.width
    // posYLine1 = gElCanvas.height - (gElCanvas.height / 2)
    // posXline2 = gElCanvas.width - gElCanvas.width
    // posYline2 = gElCanvas.height - (gElCanvas.height / 2)

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
    else setTimeout(drawFocus, 10, 0, gElCanvas.height - 95)
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
            x = (gElCanvas.width / 2) - (memeLine.txt.length * 6)
            y = gElCanvas.height / 8
            // posXLine1 = x
            // posYLine1 = y
        } else if (idx === 1) {
            x = (gElCanvas.width / 2) - (memeLine.txt.length * 6)
            y = gElCanvas.height - 40
            // posXline2 = x
            // posYline2 = y
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

function onChangeTxtInp(txtValue) {
    const memeLineIdx = getMeme().selectedLineIdx

    setLineTxt(txtValue, memeLineIdx)
    conditionRenderMemeDrawFocus()
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

function drawFocus(x, y) {
    gCtx.strokeStyle = 'red'
    gCtx.strokeRect(x, y, gElCanvas.width, gElCanvas.height / 4)
}

function conditionRenderMemeDrawFocus() {
    if (!getLineIdx()) {
        clearCanvas()
        renderMeme()
        setTimeout(drawFocus, 10, 0, 0)
    } else {
        clearCanvas()
        renderMeme()
        setTimeout(drawFocus, 10, 0, gElCanvas.height - 95)
    }
}

// function drawFocusLine1(x, y) {
//     gCtx.strokeStyle = 'black'
//     gCtx.strokeRect(x, y, gElCanvas.width, gElCanvas.height / 4)
// }

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

// function onDown(ev) {
//     // Get the ev pos from mouse or touch
//     const pos = getEvPos(ev)
//     // console.log('pos:', pos)
//     if (!isCircleClicked(pos)) return

//     // console.log('Down')
//     setCircleDrag(true)
//     //Save the pos we start from
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'
// }

// function onMove(ev) {
//     const { isDrag } = getCircle()
//     if (!isDrag) return
//     // console.log('Move')

//     const pos = getEvPos(ev)
//     // Calc the delta , the diff we moved
//     const dx = pos.x - gStartPos.x
//     const dy = pos.y - gStartPos.y
//     moveCircle(dx, dy)
//     // Save the last pos , we remember where we`ve been and move accordingly
//     gStartPos = pos
//     // The canvas is render again after every move
//     renderCanvas()
// }

// function onUp() {
//     // console.log('Up')
//     setCircleDrag(false)
//     document.body.style.cursor = 'grab'
// }

// function getEvPos(ev) {
//     // Gets the offset pos , the default pos
//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }
//     // console.log('pos:', pos)
//     // Check if its a touch ev
//     if (TOUCH_EVS.includes(ev.type)) {
//         //soo we will not trigger the mouse ev
//         ev.preventDefault()
//         //Gets the first touch point
//         ev = ev.changedTouches[0]
//         //Calc the right pos according to the touch screen
//         // console.log('ev.pageX:', ev.pageX)
//         // console.log('ev.pageY:', ev.pageY)
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//         }
//         // console.log('pos:', pos)
//     }
//     return pos
// }
