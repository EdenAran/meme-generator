'use strict';

const NUM_OF_STICKERS = 5;

var gMeme = {
    isSaved: false,
    isLoaded: false,
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [],
    stickers: [],
    selectedStickerIdx: 0,
    loadedImg: { url: '' }
}

var gStickersData = {
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
}

function setItemSize(diff) {
    const selectedItem = getDragData().selectedItem;
    if(!selectedItem) return;
    const item = (selectedItem === 'text') ? getLine() : getSticker();
    item.size += 2*diff;
}

function updatePosition(diff) {
    const selectedItem = getDragData().selectedItem;
    if(!selectedItem) return;
    const item = (selectedItem === 'text') ? getLine() : getSticker();
    item.yCord += diff;
}

function setSelectedTextIdx(idx) {
    gMeme.selectedLineIdx = +idx;
}

function createLine() {
    const numOfLines = gMeme.lines.length;
    const canvas = getCanvas();
    const yCord = (numOfLines === 0) ? 50 : (numOfLines > 1) ? canvas.height / 2 : canvas.height - 50;
    const xCord = canvas.width / 2;
    const line = {
        txt: 'Your text here',
        size: 25,
        align: 'center',
        color: '#ffffff',
        font: 'Impact',
        isStroke: true,
        xCord,
        yCord
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    setText();
}

function switchLines() {
    const item = getDragData().selectedItem;
    const numOfItems = (setItemSize === 'text') ? gMeme.lines.length - 1 : gMeme.stickers.length - 1;
    const currIdx = (setItemSize === 'text') ? gMeme.selectedLineIdx : gMeme.selectedStickerIdx;
    if (item === 'text') gMeme.selectedLineIdx = (currIdx < numOfItems) ? currIdx + 1 : 0
    else if (item === 'sticker') gMeme.selectedStickerIdx = (currIdx < numOfItems) ? currIdx + 1 : 0
    setText();
}

function deleteItem() {
    const item = getDragData().selectedItem;
    if (item === 'text') {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1);
        gMeme.selectedLineIdx = 0;
    }
    else {
        gMeme.stickers.splice(gMeme.selectedStickerIdx, 1);
        gMeme.selectedStickerIdx = 0;
    }
    setText();
}

function toggleStroke() {
    const line = getLine();
    if (getDragData().selectedItem === 'text') line.isStroke = !line.isStroke;
}

function setColor(color) {
    if (getDragData().selectedItem === 'text') getLine().color = color;
}

function setFont(font) {
    if (getDragData().selectedItem === 'text') getLine().font = font;
}

function resetGenerator() {
    gMeme.lines = [];
    createLine();
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
            yCord: canvas.height / 2 - 35,
            size: 70,
            align: 'center'
        })
    }
    gStickersData.stickers = stickers;
}

function getStickersForDisplay() {
    const startIdx = gStickersData.stickerDisplayIdx * NUM_OF_STICKERS;
    return gStickersData.stickers.slice(startIdx, NUM_OF_STICKERS + startIdx);
}

function moreStickers(diff) {
    const size = gStickersData.stickers.length;
    if ((gStickersData.stickerDisplayIdx + 1) * NUM_OF_STICKERS >= size && diff > 0) gStickersData.stickerDisplayIdx = 0;
    else if (gStickersData.stickerDisplayIdx <= 0 && diff < 0) gStickersData.stickerDisplayIdx = Math.floor(size / NUM_OF_STICKERS) - 1;
    else gStickersData.stickerDisplayIdx += diff;
    renderStickers();
}

function addSticker(id) {
    let sticker = {};
    Object.assign(sticker, getStickerById(id))
    gMeme.stickers.push(sticker);
}

function getStickerById(id) {
    return gStickersData.stickers.find(sticker => sticker.id === id);
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

function setLoadedImg(src) {
    gMeme.loadedImg.url = src;
    setIsLoaded(true);
    renderCanvas();
}

function setIsLoaded(isLoaded) {
    gMeme.isLoaded = isLoaded;
}

