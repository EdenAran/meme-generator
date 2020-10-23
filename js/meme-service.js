'use strict';

const NUM_OF_STICKERS = 5;

var gMeme = {
    isSaved: false,
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Say something funny',
            size: 30,
            align: 'center',
            color: 'white',
            font: 'Impact',
            isStroke: true,
            xCord: 0,
            yCord: 50,
            width: 0
        }
    ],
    stickers: [],
    selectedStickerIdx: 0
}

var gStickers = {
    stickers: [],
    stickerDisplayIdx: 0
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

function updateText(txt) {
    getLine().txt = txt;
    renderCanvas();
}

function setFontSize(diff) {
    getLine().size += diff;
    renderCanvas();
}

function setInitTextPosition(line, xCord) {
    line.xCord = xCord;
}

function updatePosition(diff) {
    getLine().yCord += diff;
    renderCanvas();
}

function setSelectedTextIdx(idx) {
    gMeme.selectedLineIdx = +idx;
}

function createLine() {
    const numOfLines = gMeme.lines.length;
    const yCord = (numOfLines === 0) ? 50 : (numOfLines > 1) ? getCanvas().height / 2 : getCanvas().height - 50;
    const xCord = getCanvas().width / 2;
    const line = {
        txt: 'Your text here',
        size: 30,
        align: 'center',
        color: 'white',
        font: 'Impact',
        isStroke: true,
        xCord,
        yCord
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    setText(line.txt);
    renderCanvas();
}

function switchLines() {
    const numOfLines = gMeme.lines.length - 1;
    const currIdx = gMeme.selectedLineIdx;
    gMeme.selectedLineIdx = (currIdx < numOfLines) ? currIdx + 1 : 0
    renderCanvas()
    setText();
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
    renderCanvas();
    setText();
}

function toggleStroke() {
    const line = getLine();
    line.isStroke = !line.isStroke;
    renderCanvas();
}

function setColor(color) {
    getLine().color = color;
    renderCanvas();
}

function setFont(font) {
    getLine().font = font;
    renderCanvas();
}

function resetGenerator() {
    gMeme.lines = (gMeme.isSaved) ? [] : [
        {
            txt: 'Say something funny',
            size: 30,
            align: 'center',
            color: 'white',
            font: 'Impact',
            isStroke: true,
            xCord: gCanvas.width / 2,
            yCord: 50,
            width: 0
        }
    ];
    gMeme.selectedLineIdx = 0;
    gMeme.stickers = [];
    gMeme.selectedStickerIdx = 0;
}



function generateStickers() {
    var stickers = [];
    const canvas = getCanvas();
    for (let i = 1; i <= 20; i++) {
        stickers.push({
            id: i,
            url: `./imgs/stickers/${i}.png`,
            xCord: canvas.width / 2 - 35,
            yCord: canvas.height / 2 - 35
        })
    }
    gStickers.stickers = stickers;
}

function getStickersForDisplay() {
    const startIdx = gStickers.stickerDisplayIdx * NUM_OF_STICKERS;
    return gStickers.stickers.slice(startIdx, NUM_OF_STICKERS + startIdx);
}

function moreStickers(diff) {
    const size = gStickers.stickers.length;
    if ((gStickers.stickerDisplayIdx + 1) * NUM_OF_STICKERS >= size && diff > 0) gStickers.stickerDisplayIdx = 0;
    else if (gStickers.stickerDisplayIdx <= 0 && diff < 0) gStickers.stickerDisplayIdx = Math.floor(size / NUM_OF_STICKERS) - 1;
    else gStickers.stickerDisplayIdx += diff;
    renderStickers();
}

function addSticker(id) {
    const sticker = getStickerById(id);
    gMeme.stickers.push(sticker);
    renderCanvas();
}

function getStickerById(id) {
    return gStickers.stickers.find(sticker => sticker.id === id);
}

function getSticker() {
    return gMeme.stickers[gMeme.selectedStickerIdx];
}

function getStickers() {
    return gMeme.stickers;
}

function setSelectedStickerIdx(id) {
    gMeme.selectedStickerIdx = id;
}