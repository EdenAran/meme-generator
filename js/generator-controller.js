'use strict';

function init(){
    const canvas = document.querySelector('#meme-canvas');
    const initTxt = document.getElementById('0')
    setInitTxt(initTxt);
    setInitialCanvas(canvas);
    renderCanvas();
}

function onTextChange({value}){
    updateTxt(value);
}

function setInitTxt(initTxt){
    const txt = getLine().txt;
    initTxt.placeholder = txt;
}