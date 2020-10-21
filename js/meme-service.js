'use strict';

var gKeywords = { 'meme': 12 }
var gImgs = [
    { id: 1, url: './imgs/12.jpg', keywords: ['meme'] },
    { id: 2, url: './imgs/2.jpg', keywords: ['meme'] }
]
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Say something funny',
            size: 30,
            align: 'center',
            color: 'black',
            xCord: 0,
            yCord: 50
        }
    ]
}

function getImages() {
    return gImgs;
}

function getImgById(id) {
    var img = gImgs.find((img) => img.id === id);
    return img;
}

function setSelectedImage(id) {
    gMeme.selectedImgId = +id;
}

function getMeme() {
    return gMeme;
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function updateTxt(txt) {
    getLine().txt = txt;
    renderCanvas();
}

function setFontSize(diff) {
    getLine().size += diff;
    renderCanvas();
}

function setInitTxtPosition(xCord) {
    getLine().xCord = xCord;
}

function updatePosition(diff) {
    getLine().yCord += diff;
    renderCanvas();
}
