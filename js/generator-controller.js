'use strict';

function init() {
    const canvas = document.querySelector('#meme-canvas');
    const initTxt = document.getElementById('0')
    setInitTxt(initTxt, canvas.height / 2);
    setInitialCanvas(canvas);
}

function onTextChange({ value }) {
    updateTxt(value);
}

function onLineSelect({id}){
    setSelectedTxtIdx(id)
}

function setInitTxt(initTxt, xCord) {
    const txt = getLine().txt;
    const meme = getMeme();
    setInitTxtPosition(xCord);
    initTxt.placeholder = txt;
}

function onImgClick(imgId) {
    showEditor();
    setSelectedImage(imgId)
    renderCanvas();
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
