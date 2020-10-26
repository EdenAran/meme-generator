'use strict';

function init() {
    const canvas = document.querySelector('#meme-canvas');
    setSavedMemes();
    renderImages();
    renderKeywords();
    setInitialCanvas(canvas);
    renderStickers();
    canvas.addEventListener('mouseout', () => { 
        onMouseUp();
        document.body.style.cursor = 'auto' });
}

function renderImages(isSaved = false) {
    const imgs = (isSaved) ? getSavedMemes() : getImagesForGallery();
    var strHTML = (!isSaved && !imgs.length) ? '<span>There are no images that match your search</span>' : imgs.map(img => ` <span>
    <img class="img pointer" src=${img.url} alt="" onclick="onImgClick(${img.id},${isSaved})">
    <button class="delete-btn pointer" onclick="onDeleteMeme(${img.id})">x</button>
    </span>
        `
    ).join('');
    if (!isSaved) document.querySelector('.img-container').innerHTML = strHTML;
    else document.querySelector('.saved-container').innerHTML = strHTML;
    updateSavedNum();

}

function renderKeywords() {
    const keywords = getKeywordsForDisplay();
    var strHTML = keywords.map(keyword => {
        let size = Math.min((getKeywordValue(keyword) * 1.5 + 10), 32);
        return `<span class="pointer" onclick="onWordClick('${keyword}')" style="font-size:${size}px">${keyword}</span>&nbsp&nbsp`
    }).join('');
    document.querySelector('.word-search').innerHTML = strHTML;
}

function renderCanvas(isHighlight = true) {
    const meme = getMeme()
    const imgId = meme.selectedImgId;
    const image = (meme.isSaved) ? getSavedMemeById(imgId) : (meme.isLoaded) ? meme.loadedImg : getImageById(imgId);
    drawCanvas(image.url, isHighlight);
}

function renderStickers() {
    generateStickers();
    const stickers = getStickersForDisplay();
    var strHTML = stickers.map(sticker => `
    <img class="pointer" src="./imgs/stickers/${sticker.id}.png" onclick="onAddSticker(${sticker.id})">
    `).join('');
    document.querySelector('.sticker-container').innerHTML = strHTML;
}

function updateSavedNum(){
    document.querySelector('.saved-num').innerText = `(${getSavedMemes().length})`;
}

function onImgClick(imgId, isSaved = false) {
    showEditor();
    setIsSaved(isSaved);
    setIsLoaded(false);
    resetGenerator();
    setSelectedImage(imgId);
    renderCanvas();
    document.querySelector('.meme-editor').scrollIntoView();
}

function onTextChange() {
    if (!getMeme().lines.length) setText();
    else {
        const elTxt = document.querySelector('input.txt')
        updateText(elTxt.value);
        renderCanvas();
    }
}

function onUpdateSize(diff) {
    setItemSize(diff);
    renderCanvas();
}

function onUpdatePos(diff) {
    updatePosition(diff);
    renderCanvas();
}

function onCanvasClick(ev) {
    canvasClick(ev);
    renderCanvas();
}

function onCanvasTouch(ev) {
    touchStart(ev);
}


function onTextClick(el) {
    el.setSelectionRange(0, el.value.length);
}

function onAddLine() {
    createLine();
    setText();
    renderCanvas();

}

function onSwitchLines() {
    switchLines();
    renderCanvas();
}

function setText() {
    const elText = document.querySelector('.txt')
    const line = getLine();
    if(!line) return;
    elText.value = line.txt;
    setTimeout(() => {
        elText.setSelectionRange(0, elText.value.length);
        elText.focus();
    }, 0)
    document.querySelector('.font-select').value = line.font;
    document.querySelector('.fill-color').value = line.color;
}

function onDeleteLine() {
    deleteItem();
    renderCanvas();
}

function onFillClick() {
    document.querySelector('.fill-color').click();
}

function onDownload() {
    renderCanvas(false);
    setTimeout(() => {
        document.querySelector('.download-link').click()
    }, 100);
}

function onSubmit(elForm, ev) {
    uploadImg(elForm, ev);
}

function toggleModal() {
    document.querySelector('.modal-container').classList.toggle('hide')
}

function onFontSelect({ value }) {
    setFont(value);
    renderCanvas();
}

function onSetAlign(align) {
    setAlign(align);
    renderCanvas();
}

function onStroke() {
    toggleStroke();
    renderCanvas();
}

function onFillChange({ value }) {
    setColor(value);
    renderCanvas();
}

function onCanvasClick(ev) {
    canvasClick(ev);
    if (isDragArea(ev, false)) {
        startDrag();
        document.body.style.cursor = 'grabbing'
    } else document.body.style.cursor = 'auto';
    renderCanvas();
}

function onMouseUp() {
    releaseDrag();
}

function onDrag(ev, isTouch) {
    updateCursor(ev, isTouch);
    dragText(ev, isTouch);
    dragSticker(ev, isTouch);
    renderCanvas();
}

function onAddSticker(id) {
    addSticker(id);
    renderCanvas();
}

function onSearch() {
    const searchValue = document.querySelector('.gallery-search').value.toLowerCase();
    updateSearchWordValue(searchValue);
    setFilter(searchValue);
    renderKeywords();
}

function onWordClick(word) {
    updateSearchWordValue(word);
    const keywords = getKeywords();
    keywords[word]++;
    setFilter(word);
    setSearchArea(word);
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

function onImgInput(ev) {
    loadImageFromInput(ev)
    showEditor();
}

function updateCursor(ev, isTouch) {
    if (isDragging()) return;
    if (isDragArea(ev, isTouch)) document.body.style.cursor = 'grab';
    else if (isDraggable(ev, isTouch)) document.body.style.cursor = 'pointer';
    else document.body.style.cursor = 'auto';
}

function setSearchArea(word) {
    document.querySelector('.gallery-search').value = word;
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
    document.body.style.cursor = 'auto';
    document.querySelector('.meme-editor').classList.add('shrink');
    document.querySelector('.canvas-container').classList.add('hide');
    document.querySelector('.controls-container').classList.add('hide');
}

function ontoggleMenu() {
    document.body.classList.toggle('hamb-open');
    document.querySelector('.main-nav').classList.toggle('shrink-sm')
    document.querySelectorAll('.main-nav li').forEach(el => el.classList.toggle('shrink-sm'))
    document.querySelectorAll('.main-nav li a').forEach(el => el.classList.toggle('hide-sm'))
}