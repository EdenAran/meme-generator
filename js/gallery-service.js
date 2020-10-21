'use-strict';


var gKeywords = { 'meme': 12 };
var gImgs = [];

function getImages() {
    return gImgs;
}

function getImgById(id) {
    var img = gImgs.find((img) => img.id === id);
    return img;
}

function generateImages(){
    for(let i = 0; i < 18; i++){
        gImgs.push(generateImage(i+1))
    }
}

function generateImage(id){
    return{ id, url: `./imgs/${id}.jpg`, keywords: ['meme'] }
}