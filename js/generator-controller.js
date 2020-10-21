'use strict';

function init() {
    const canvas = document.querySelector('#meme-canvas');
    const initTxt = document.querySelector('input.txt')
    renderImages();
    setInitTxt(initTxt, canvas.height / 2);
    setInitialCanvas(canvas);
}

function onTextChange({ value }) {
    updateTxt(value);
}

function setInitTxt(initTxt, xCord) {
    const lines = getLines();
    setInitTxtPosition(lines, xCord);
    initTxt.placeholder = lines[0].txt;
}

function showEditor() {
    document.querySelector('.meme-editor').classList.remove('shrink');
    document.querySelector('.canvas-container').classList.remove('hide');
    document.querySelector('.controls-container').classList.remove('hide');
    document.querySelector('.close-editor').classList.remove('hide');
}

function hideEditor() {
    document.querySelector('.meme-editor').classList.add('shrink');
    document.querySelector('.canvas-container').classList.add('hide');
    document.querySelector('.controls-container').classList.add('hide');
    document.querySelector('.close-editor').classList.add('hide');
}

function onUpdateSize(diff) {
    setFontSize(diff);
}

function onUpdatePos(diff) {
    updatePosition(diff);
}

function onCanvasClick(ev) {
    checkTextArea(ev);
    console.log(ev)
}

function setFocus(){
    document.querySelector('input.txt').focus();
    document.querySelector('input.txt').value = getLine().txt;
}



// function onAddLine() {
//     createLine();
// }