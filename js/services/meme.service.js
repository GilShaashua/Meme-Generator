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
            color: 'white'
        }
    ]
}

let gNextId = 1
let gLineIdx = 0

_createImgs()

function getMeme() {
    return gMeme
}

function getMemeImgs() {
    return gImgs
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txtValue, lineIdx) {
    gMeme.lines[lineIdx].txt = txtValue
}

function changeColor(color, lineIdx) {
    gMeme.lines[lineIdx].color = color
}

function increaseSize(lineIdx) {
    gMeme.lines[lineIdx].size = gMeme.lines[lineIdx].size + 1
}

function decreaseSize(lineIdx) {
    gMeme.lines[lineIdx].size = gMeme.lines[lineIdx].size - 1
}

function alignLeft(lineIdx) {
    gMeme.lines[lineIdx].align = 'start'
}

function alignRight(lineIdx) {
    gMeme.lines[lineIdx].align = 'end'
}

function alignCenter(lineIdx) {
    gMeme.lines[lineIdx].align = 'middle'
}

function deleteLine(lineIdx) {
    if (gMeme.lines.length === 1) return
    const deletedLine = gMeme.lines.splice(lineIdx, 1)
    gMeme.selectedLineIdx = 0
    gLineIdx = 0
}

function addLine(color = 'white', align = 'middle', size = 30) {
    const newLine = {
        txt: 'Write your Meme',
        size,
        align,
        color
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = 1
    gLineIdx = 1
}

function switchLine() {
    if (gMeme.lines.length === 1) return
    if (gMeme.selectedLineIdx) {
        gMeme.selectedLineIdx = 0
        gLineIdx = 0
    } else {
        gMeme.selectedLineIdx = 1
        gLineIdx = 1
    }

    return gMeme.selectedLineIdx
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