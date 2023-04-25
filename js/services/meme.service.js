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

function setLineTxt(txtValue, lineIdx = 0) {
    gMeme.lines[lineIdx].txt = txtValue
}

function changeColor(color, lineIdx = 0) {
    gMeme.lines[lineIdx].color = color
}

function increaseSize(lineIdx = 0) {
    gMeme.lines[lineIdx].size = gMeme.lines[lineIdx].size + 1
}

function decreaseSize(lineIdx = 0) {
    gMeme.lines[lineIdx].size = gMeme.lines[lineIdx].size - 1
}

function addLine(color, align = 'middle', size = 30) {
    const newLine = {
        txt: 'Write your Meme',
        size,
        align,
        color
    }

    gMeme.lines.push(newLine)
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