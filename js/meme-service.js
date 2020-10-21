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
        },
        {
            txt: 'Say something else',
            size: 30,
            align: 'center',
            color: 'black',
            xCord: 0,
            yCord: 350
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

function getLines() {
    return gMeme.lines;
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

function setInitTxtPosition(lines, xCord) {
    lines.forEach(line => line.xCord = xCord);
}

function updatePosition(diff) {
    getLine().yCord += diff;
    renderCanvas();
}

function setSelectedTxtIdx(idx) {
    gMeme.selectedLineIdx = +idx;
}

// function createLine() {
//     const yCord = getCanvas().height / 2;
//     const xCord = getCanvas().width / 2;
//     const line = {
//         txt: '',
//         size: 30,
//         align: 'center',
//         color: 'black',
//         xCord,
//         yCord
//     }
//     gMeme.lines.push(line);
//     renderCanvas();
// }