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

function setLineTxt(txtValue, inputNum = 0) {
    gMeme.lines[inputNum].txt = txtValue
}

function changeColor(color, lineNum = 0) {
    gMeme.lines[lineNum].color = color
}

function increaseSize(lineNum = 0) {
    gMeme.lines[lineNum].size = gMeme.lines[lineNum].size + 1
}

function decreaseSize(lineNum = 0) {
    gMeme.lines[lineNum].size = gMeme.lines[lineNum].size - 1
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