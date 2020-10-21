'use strict';


function onImgClick(imgId) {
    showEditor();
    setSelectedImage(imgId)
    renderCanvas();
}

function renderImages(){
    generateImages();
    const imgs = getImages();
    var strHTML = imgs.map(img => {
        return ` <img class="img pointer" src=${img.url} alt="" onclick="onImgClick(${img.id})">
        `
    }).join('');
    document.querySelector('.img-container').innerHTML += strHTML;
}
