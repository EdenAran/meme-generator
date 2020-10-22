'use strict';


function onImgClick(imgId) {
    showEditor();
    setSelectedImage(imgId)
    renderCanvas();
    document.querySelector('.meme-editor').scrollIntoView();
}

function renderImages(){
    // generateImages();
    const imgs = getImagesForGallery();
    var strHTML = imgs.map(img => ` <img class="img pointer" src=${img.url} alt="" onclick="onImgClick(${img.id})">
        `
    ).join('');
    document.querySelector('.img-container').innerHTML = strHTML;
}

function renderKeywords(){
    const keywords = getKeywordsForDisplay();
    var strHTML = keywords.map(keyword => `
    <span class="pointer" onclick="onWordClick('${keyword}')" style="font-size:${getKeywordValue(keyword)*1.5+10}px">${keyword}</span>&nbsp&nbsp
    `).join('');
    document.querySelector('.word-search').innerHTML = strHTML;
}

function onSearch(){
    const searchValue = document.querySelector('.gallery-search').value;
    setFilter(searchValue.toLowerCase());
}

function onWordClick(word){
    const keywords = getKeywords();
    keywords[word]++;
    setFilter(word);
    renderKeywords();
}

function onMoreWords(){
    moreKeywords();
}