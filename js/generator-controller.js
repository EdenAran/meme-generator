'use strict';

function init() {
    const canvas = document.querySelector('#meme-canvas');
    renderImages();
    renderKeywords();
    setInitText(canvas.width / 2);
    setInitialCanvas(canvas);
    setSavedMemes();
    renderStickers();
}

function renderImages(isSaved = false) {
    const imgs = (isSaved) ? getSavedMemes() : getImagesForGallery();
    var strHTML = imgs.map(img => ` <span>
    <img class="img pointer" src=${img.url} alt="" onclick="onImgClick(${img.id},${isSaved})">
    <button class="delete-btn pointer" onclick="onDeleteMeme(${img.id})">x</button>
    </span>
        `
    ).join('');
    if (!isSaved) document.querySelector('.img-container').innerHTML = strHTML;
    else document.querySelector('.saved').innerHTML = strHTML;
}

function renderKeywords() {
    const keywords = getKeywordsForDisplay();
    var strHTML = keywords.map(keyword => `
    <span class="pointer" onclick="onWordClick('${keyword}')" style="font-size:${getKeywordValue(keyword) * 1.5 + 10}px">${keyword}</span>&nbsp&nbsp
    `).join('');
    document.querySelector('.word-search').innerHTML = strHTML;
}

function renderCanvas(isHighlight = true) {
    const meme = getMeme()
    const imgId = meme.selectedImgId;
    const image = (meme.isSaved) ? getSavedMemeById(imgId) : getImageById(imgId);
    drawCanvas(image, isHighlight);
}

function renderStickers() {
    generateStickers();
    const stickers = getStickersForDisplay();
    var strHTML = stickers.map(sticker => `
    <img class="pointer" src="./imgs/stickers/${sticker.id}.png" onclick="onAddSticker(${sticker.id})">
    `).join('');
    document.querySelector('.sticker-container').innerHTML = strHTML;
}

function onImgClick(imgId, isSaved = false) {
    showEditor();
    setIsSaved(isSaved);
    resetGenerator();
    setSelectedImage(imgId);
    renderCanvas();
    document.querySelector('.meme-editor').scrollIntoView();
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

function onDownload() {
    renderCanvas(false);
    setTimeout(() => {
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

function onMouseDown(ev) {
    if (isDragArea(ev)) startDrag(false);
    else if (isStickerArea(ev)) startDrag(true);
}

function onMouseUp() {
    releaseDrag();
}

function onDrag(ev) {
    dragText(ev);
    dragSticker(ev);
}

function onAddSticker(id){
    addSticker(id);
}

function onSearch() {
    const searchValue = document.querySelector('.gallery-search').value;
    setFilter(searchValue.toLowerCase());
}

function onWordClick(word) {
    const keywords = getKeywords();
    keywords[word]++;
    setFilter(word);
    renderKeywords();
}

function onMoreWords() {
    moreKeywords();
}

function onSave() {
    renderCanvas(false);
    setTimeout(saveMeme, 100);
}

function onDeleteMeme(id) {
    deleteSavedMeme(id);
}


function onNavClick(target) {
    hideEditor();
    const elSections = document.querySelectorAll('.container');
    elSections.forEach(el => el.classList.add('hide'));
    document.querySelector(`.${target}`).classList.remove('hide');
    if (target === 'saved') setSavedMemes();
    if (window.innerWidth <= 840) ontoggleMenu();
}

function showEditor() {
    document.querySelector('.meme-editor').classList.remove('shrink');
    document.querySelector('.canvas-container').classList.remove('hide');
    document.querySelector('.controls-container').classList.remove('hide');
    document.querySelectorAll('.container').forEach(el => el.classList.add('hide'));
}

function hideEditor() {
    document.querySelector('.meme-editor').classList.add('shrink');
    document.querySelector('.canvas-container').classList.add('hide');
    document.querySelector('.controls-container').classList.add('hide');
}

function ontoggleMenu() {
    document.querySelector('.hamb-btn').classList.toggle('hamb-open');
    document.querySelector('.main-nav').classList.toggle('shrink-sm')
    document.querySelectorAll('.main-nav li').forEach(el => el.classList.toggle('shrink-sm'))
    document.querySelectorAll('.main-nav li a').forEach(el => el.classList.toggle('hide-sm'))
}