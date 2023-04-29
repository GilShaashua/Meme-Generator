'use strict'

let gKeywordSearchCountMap = {
    'funny': 12, 'cat': 16, 'baby': 2
}
let gImgs
let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Write your Meme',
            size: 30,
            align: 'middle',
            color: 'white',
            font: 'Impact',
            xyLine1: { x: 0, y: 0 }
        }
    ]
}

let gNextId = 1
let gLineIdx = 0
let gSavedMemes = loadFromStorage('SavedMemesDB') || []
let gCurrSavedMeme

_createImgs()

function getCurrSavedMeme() {
    return gCurrSavedMeme
}

function setGCurrSavedMeme(currSavedMeme) {
    gCurrSavedMeme = currSavedMeme
    gCurrSavedMeme.selectedLineIdx = 0
    gLineIdx = 0
}

function saveMeme() {
    const newSavedMeme = { ...gMeme }
    newSavedMeme.lines.slice()
    newSavedMeme.lines[0].xyLine1 = xyLine1
    if (newSavedMeme.lines.length === 2) newSavedMeme.lines[1].xyLine2 = xyLine2

    const isImgExist = gSavedMemes.findIndex(saveMeme => saveMeme.selectedImgId === newSavedMeme.selectedImgId)
    if (isImgExist !== -1) gSavedMemes.splice(isImgExist, 1)

    gSavedMemes.push(newSavedMeme)
    saveToStorage('SavedMemesDB', gSavedMemes)
    return newSavedMeme
}

function getSavedMemes() {
    return gSavedMemes
}

function getMeme() {
    return gMeme
}

function getMemeImgs() {
    return gImgs
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setImgUrl(imgUrl) {
    gMeme.selectedImgUrl = imgUrl
}

function resetGMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Write your Meme',
                size: 30,
                align: 'middle',
                color: 'white',
                font: 'Impact',
                xyLine1: { x: 0, y: 0 }
            }
        ]
    }
    gLineIdx = 0
}

function setLineTxt(txtValue, lineIdx) {
    if (!gIsSavedMemesMode) {
        gMeme.lines[lineIdx].txt = txtValue
    } else {
        gCurrSavedMeme.lines[lineIdx].txt = txtValue
        saveToStorage('SavedMemesDB', gSavedMemes)
    }
}

function changeColor(color, lineIdx) {
    if (!gIsSavedMemesMode) {
        gMeme.lines[lineIdx].color = color
    } else {
        gCurrSavedMeme.lines[lineIdx].color = color
    }
}

function increaseSize(lineIdx) {
    if (!gIsSavedMemesMode) {
        gMeme.lines[lineIdx].size = gMeme.lines[lineIdx].size + 1
    } else {
        gCurrSavedMeme.lines[lineIdx].size = gCurrSavedMeme.lines[lineIdx].size + 1
    }
}

function decreaseSize(lineIdx) {
    if (!gIsSavedMemesMode) {
        gMeme.lines[lineIdx].size = gMeme.lines[lineIdx].size - 1
    } else {
        gCurrSavedMeme.lines[lineIdx].size = gCurrSavedMeme.lines[lineIdx].size - 1
    }
}

function alignLeft(lineIdx) {
    if (!gIsSavedMemesMode) {
        gMeme.lines[lineIdx].align = 'start'
    } else {
        gCurrSavedMeme.lines[lineIdx].align = 'start'
    }
}

function alignRight(lineIdx) {
    if (!gIsSavedMemesMode) {
        gMeme.lines[lineIdx].align = 'end'
    } else {
        gCurrSavedMeme.lines[lineIdx].align = 'end'
    }
}

function alignCenter(lineIdx) {
    if (!gIsSavedMemesMode) {
        gMeme.lines[lineIdx].align = 'middle'
    } else {
        gCurrSavedMeme.lines[lineIdx].align = 'middle'
    }
}

function deleteLine(lineIdx) {
    if (!gIsSavedMemesMode) {
        if (gMeme.lines.length === 1) return
        const deletedLine = gMeme.lines.splice(lineIdx, 1)
        gMeme.selectedLineIdx = 0
        gLineIdx = 0
    } else {
        if (gCurrSavedMeme.lines.length === 1) return
        const deletedLine = gCurrSavedMeme.lines.splice(lineIdx, 1)
        gCurrSavedMeme.selectedLineIdx = 0
        gLineIdx = 0
        if (lineIdx === 0) {
            const xyLine1 = { ...gCurrSavedMeme.lines[lineIdx].xyLine2 }
            gCurrSavedMeme.lines[lineIdx].xyLine1 = xyLine1
            gCurrSavedMeme.lines[lineIdx].xyLine2 = null
        }
        saveToStorage('SavedMemesDB', gSavedMemes)
    }
}

function fontSelect(lineIdx, value) {
    if (!gIsSavedMemesMode) {
        gMeme.lines[lineIdx].font = value
    } else {
        gCurrSavedMeme.lines[lineIdx].font = value
    }
}

function addLine(color = 'white', align = 'middle', size = 30, font = 'Impact') {
    const newLine = {
        txt: 'Write your Meme',
        size,
        align,
        color,
        font,
        xyLine2: { x: xyLine2.x, y: xyLine2.y }
    }

    if (!gIsSavedMemesMode) {
        gMeme.lines.push(newLine)
        gMeme.selectedLineIdx = 1
        gLineIdx = 1
    } else {
        gCurrSavedMeme.lines.push(newLine)
        gCurrSavedMeme.selectedLineIdx = 1
        gLineIdx = 1
        saveToStorage('SavedMemesDB', gSavedMemes)
    }
}

function switchLine() {
    if (!gIsSavedMemesMode) {
        if (gMeme.lines.length === 1) return

        if (gMeme.selectedLineIdx) {
            gMeme.selectedLineIdx = 0
            gLineIdx = 0
        } else {
            gMeme.selectedLineIdx = 1
            gLineIdx = 1
        }
        return gMeme.selectedLineIdx
    } else {
        if (gCurrSavedMeme.lines.length === 1) return

        if (gCurrSavedMeme.selectedLineIdx) {
            gCurrSavedMeme.selectedLineIdx = 0
            gLineIdx = 0
        } else {
            gCurrSavedMeme.selectedLineIdx = 1
            gLineIdx = 1
        }
        saveToStorage('SavedMemesDB', gSavedMemes)
    }
}

function getLineIdx() {
    return gLineIdx
}

function _createImgs() {
    gImgs = []
    for (let i = 0; i < 18; i++) {
        gImgs.push(_createImg())
    }
}

function _createImg() {
    return {
        url: `img/image-gallery/${gNextId}.jpg`,
        id: gNextId++,
        keywords: ['funny', 'cat']
    }
}