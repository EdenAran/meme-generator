'use strict';

function init() {
    const canvas = document.querySelector('#meme-canvas');
    renderImages();
    setInitText(canvas.height / 2);
    setInitialCanvas(canvas);
}

function onTextChange() {
    const elTxt = document.querySelector('input.txt')
    updateText(elTxt.value);
}

function setInitText(xCord) {
    const line = getLine();
    setInitTextPosition(line, xCord);
    setText(line.txt);
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
    textTouch(ev);
}

function setFocus() {
    document.querySelector('input.txt').focus();
    document.querySelector('input.txt').value = getLine().txt;
}

function onAddLine() {
    createLine();
}

function onSwitchLines() {
    switchLines();
}

function setText() {
    const txt = (getLine()) ? getLine().txt : '';
    document.querySelector('input.txt').value = txt;
}

function onDeleteLine() {
    deleteLine();
}

function ontoggleMenu() {
    document.querySelector('.hamb-btn').classList.toggle('hamb-open');
    document.querySelector('.main-nav').classList.toggle('shrink-sm')
    document.querySelectorAll('.main-nav li').forEach(el => el.classList.toggle('shrink-sm'))
    document.querySelectorAll('.main-nav li a').forEach(el => el.classList.toggle('hide-sm'))
}

function onDownload() {
    renderCanvas(false);
    setTimeout(()=>{
        document.querySelector('.download-link').click()
    }, 100);
}

function onSubmit(elForm, ev) {
    uploadImg(elForm, ev)
}

function toggleModal() {
    document.querySelector('.modal-container').classList.toggle('hide')
}

function onFontSelect({ value }) {
    setFont(value);
}

function onSetAlign(align) {
    setAlign(align);
}

function onStroke() {
    toggleStroke();
}

function onFillChange({ value }) {
    setColor(value);
}

function onMouseDown(ev){
    if(!isDragArea(ev)) return;
    console.log('s')
    startDrag(ev);
}

function onMouseUp(){
    releaseDrag();
}

function onDragText(ev){
    dragText(ev);
}