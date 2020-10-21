'use strict';

var gKeywords = { 'meme': 12 }
var gImgs = [
    { id: 1, url: '../imgs/12.jpg', keywords: ['meme'] },
    { id: 2, url: '../imgs/2.jpg', keywords: ['meme'] }
]
var gMeme = {
    selectedImgIdx: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Say something funny',
            size: 30,
            align: 'center',
            color: 'black',
            xCord: 0,
            yCord: 30
        }
    ]
}


function getImages() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function getLine(){
    return gMeme.lines[gMeme.selectedLineIdx];
}

function updateTxt(txt){
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    renderCanvas();
}