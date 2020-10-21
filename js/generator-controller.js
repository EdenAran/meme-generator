'use strict';

function init() {
    const canvas = document.querySelector('#meme-canvas');
    const initTxts = document.querySelectorAll('input.txt')
    setInitTxt(initTxts, canvas.height / 2);
    setInitialCanvas(canvas);
}

function onTextChange({ value }) {
    updateTxt(value);
}

function onLineSelect({ id }) {
    setSelectedTxtIdx(id)
}

function setInitTxt(initTxts, xCord) {
    console.log(initTxts)
    const lines = getLines();
    const meme = getMeme();
    setInitTxtPosition(lines, xCord);
    lines.forEach((line, id) => {
        initTxts[id].placeholder = line.txt;
    })
}

function showEditor() {
    document.querySelector('.meme-editor').classList.remove('shrink');
    document.querySelector('.canvas-container').classList.remove('hide');
    document.querySelector('.controls-container').classList.remove('hide');
}

function hideEditor() {
    document.querySelector('.meme-editor').classList.add('shrink');
    document.querySelector('.canvas-container').classList.add('hide');
    document.querySelector('.controls-container').classList.add('hide');
}

function onUpdateSize(diff) {
    setFontSize(diff);
}

function onUpdatePos(diff) {
    updatePosition(diff);
}

// function onAddLine() {
//     createLine();
// }