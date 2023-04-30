'use strict'

let gElCanvas
let gCtx
let xyLine1
let xyLine2
let gIsSavedMemesMode = false
let gIsDownloading = false
let gDownloadUrlElLink

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
    if (!gIsSavedMemesMode) {
        window.addEventListener('resize', () => {
            resizeCanvas()
            renderMeme()
        })
    } else {
        window.addEventListener('resize', () => {
            resizeCanvas()
            renderSavedMeme()
        })
    }
}

function renderMeme() {
    const meme = getMeme()
    const imgs = getMemeImgs()
    const img = imgs.find(img => img.id === meme.selectedImgId)
    const imgUrl = img.url
    drawImg(imgUrl)
}

function drawImg(imgUrl) {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines()
        if (!gIsDownloading) drawFocus()
        else {
            const imgContent = gElCanvas.toDataURL('image/jpeg')
            gDownloadUrlElLink.href = imgContent
        }
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
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = memeLine.color
    gCtx.font = memeLine.size + 'px ' + memeLine.font
    gCtx.fillText(memeLine.txt, x, y)
    gCtx.strokeText(memeLine.txt, x, y)
}

function onChangeTxtInp(txtValue) {
    if (!gIsSavedMemesMode) {
        const memeLineIdx = getMeme().selectedLineIdx
        setLineTxt(txtValue, memeLineIdx)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        const savedMemeLineIdx = savedMeme.selectedLineIdx
        setLineTxt(txtValue, savedMemeLineIdx)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
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
    if (!gIsSavedMemesMode) {
        const memeLineIdx = getMeme().selectedLineIdx
        changeColor(color, memeLineIdx)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        const savedMemeLineIdx = savedMeme.selectedLineIdx
        changeColor(color, savedMemeLineIdx)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onIncreaseSize() {
    if (!gIsSavedMemesMode) {
        const memeLineIdx = getMeme().selectedLineIdx
        increaseSize(memeLineIdx)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        const savedMemeLineIdx = savedMeme.selectedLineIdx
        increaseSize(savedMemeLineIdx)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onDecreaseSize() {
    if (!gIsSavedMemesMode) {
        const memeLineIdx = getMeme().selectedLineIdx
        decreaseSize(memeLineIdx)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        const savedMemeLineIdx = savedMeme.selectedLineIdx
        decreaseSize(savedMemeLineIdx)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onAlignLeft() {
    if (!gIsSavedMemesMode) {
        const memeLineIdx = getMeme().selectedLineIdx
        alignLeft(memeLineIdx)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        const savedMemeLineIdx = savedMeme.selectedLineIdx
        alignLeft(savedMemeLineIdx)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onAlignRight() {
    if (!gIsSavedMemesMode) {
        const memeLineIdx = getMeme().selectedLineIdx
        alignRight(memeLineIdx)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        const savedMemeLineIdx = savedMeme.selectedLineIdx
        alignRight(savedMemeLineIdx)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onAlignCenter() {
    if (!gIsSavedMemesMode) {
        const memeLineIdx = getMeme().selectedLineIdx
        alignCenter(memeLineIdx)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        const savedMemeLineIdx = savedMeme.selectedLineIdx
        alignCenter(savedMemeLineIdx)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onDeleteLine() {
    if (!gIsSavedMemesMode) {
        const memeLineIdx = getMeme().selectedLineIdx
        deleteLine(memeLineIdx)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        const savedMemeLineIdx = savedMeme.selectedLineIdx
        deleteLine(savedMemeLineIdx)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onFontSelect(value) {
    if (!gIsSavedMemesMode) {
        const memeLineIdx = getMeme().selectedLineIdx
        fontSelect(memeLineIdx, value)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        const savedMemeLineIdx = savedMeme.selectedLineIdx
        fontSelect(savedMemeLineIdx, value)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onAddLine() {
    if (!gIsSavedMemesMode) {
        if (getMeme().lines.length === 2) return
        const inpColor = document.querySelector('#inp-color').value
        addLine(inpColor)
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        if (savedMeme.lines.length === 2) return
        const inpColor = document.querySelector('#inp-color').value
        addLine(inpColor)
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onSwitchLine() {
    if (!gIsSavedMemesMode) {
        if (getMeme().lines.length === 1) return
        switchLine()
        renderMeme()
    } else {
        const savedMeme = getCurrSavedMeme()
        if (savedMeme.lines.length === 1) return
        switchLine()
        renderSavedMeme(savedMeme.selectedImgId, savedMeme.selectedImgUrl)
    }
}

function onDownloadImg(elLink) {
    gIsDownloading = true
    gDownloadUrlElLink = elLink
    renderMeme()
    gIsDownloading = false
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

function onSaveMeme() {
    const savedMeme = saveMeme()
    gCurrSavedMeme = savedMeme
}

function onClickSavedMemes() {
    const elSavedMemesContainer = document.querySelector('.saved-memes-section')
    elSavedMemesContainer.style.display = 'block'
    const elGalleryContainer = document.querySelector('.main-gallery-container')
    elGalleryContainer.style.display = 'none'
    const elMemeEditorSection = document.querySelector('.meme-editor-section')
    elMemeEditorSection.style.display = 'none'
    const elAboutMeSection = document.querySelector('.about-section')
    elAboutMeSection.style.display = 'none'
    onToggleMenu()
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const strHtml = savedMemes.map(savedMeme => `
    <img src="${savedMeme.selectedImgUrl}" onclick="onClickSavedMeme(${savedMeme.selectedImgId})" alt="" />`)

    const elGalleryContainer = document.querySelector('.saved-memes-container')
    elGalleryContainer.innerHTML = strHtml.join('')
}

function onClickSavedMeme(imgId) {
    const elMemeEditorContainer = document.querySelector('.meme-editor-section')
    elMemeEditorContainer.style.display = 'flex'
    const elSavedMemeSection = document.querySelector('.saved-memes-section')
    elSavedMemeSection.style.display = 'none'
    openEditor()
    gIsSavedMemesMode = true
    const savedMemes = getSavedMemes()
    const currSavedMeme = savedMemes.find(savedMeme => savedMeme.selectedImgId === imgId)
    setGCurrSavedMeme(currSavedMeme)
    renderSavedMeme()
}

function renderSavedMeme() {
    renderImgSavedMeme()
}

function renderImgSavedMeme() {
    const savedMeme = getCurrSavedMeme()
    const img = new Image()
    img.src = savedMeme.selectedImgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLinesSavedMeme(savedMeme)
        drawFocus()
    }
}

function drawLinesSavedMeme(savedMeme) {
    const savedMemeLines = savedMeme.lines

    savedMemeLines.forEach((savedMemeLine, idx) => {
        if (idx === 0) {
            if (savedMemeLine.align === 'middle') {
                savedMemeLine.xyLine1.x = (gElCanvas.width / 2) - ((savedMemeLine.txt.length * savedMemeLine.size) / 4)
                savedMemeLine.xyLine1.y = gElCanvas.height / 8
            } else if (savedMemeLine.align === 'start') {
                savedMemeLine.xyLine1.x = 20
                savedMemeLine.xyLine1.y = gElCanvas.height / 8
            } else if (savedMemeLine.align === 'end') {
                savedMemeLine.xyLine1.x = gElCanvas.width - ((savedMemeLine.txt.length * savedMemeLine.size) / 2)
                savedMemeLine.xyLine1.y = gElCanvas.height / 8
            }
            renderTextSavedMeme(savedMemeLine.xyLine1.x, savedMemeLine.xyLine1.y, savedMemeLine)

        } else if (idx === 1) {
            if (savedMemeLine.align === 'middle') {
                savedMemeLine.xyLine2.x = (gElCanvas.width / 2) - ((savedMemeLine.txt.length * savedMemeLine.size) / 4)
                savedMemeLine.xyLine2.y = gElCanvas.height - 30
            } else if (savedMemeLine.align === 'start') {
                savedMemeLine.xyLine2.x = 20
                savedMemeLine.xyLine2.y = gElCanvas.height - 30
            } else if (savedMemeLine.align === 'end') {
                savedMemeLine.xyLine2.x = gElCanvas.width - ((savedMemeLine.txt.length * savedMemeLine.size) / 2)
                savedMemeLine.xyLine2.y = gElCanvas.height - 30
            }
            renderTextSavedMeme(savedMemeLine.xyLine2.x, savedMemeLine.xyLine2.y, savedMemeLine)
        }
    })
}

function renderTextSavedMeme(x, y, memeLine) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = memeLine.color
    gCtx.font = memeLine.size + 'px ' + memeLine.font
    gCtx.fillText(memeLine.txt, x, y)
    gCtx.strokeText(memeLine.txt, x, y)
}