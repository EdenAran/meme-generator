'use strict';


var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Say something funny',
            size: 30,
            align: 'center',
            color: 'black',
            xCord: 0,
            yCord: 50,
            width: 0
        },
        {
            txt: 'Something funny',
            size: 30,
            align: 'center',
            color: 'black',
            xCord: 0,
            yCord: 350,
            width: 0
        }
    ]
}


function setSelectedImage(id) {
    gMeme.selectedImgId = +id;
}

function getMeme() {
    return gMeme;
}

function getLines() {
    return gMeme.lines;
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function updateTxt(txt) {
    getLine().txt = txt;
    renderCanvas();
}

function setFontSize(diff) {
    getLine().size += diff;
    renderCanvas();
}

function setInitTxtPosition(lines, xCord) {
    lines.forEach(line => line.xCord = xCord);
}

function updatePosition(diff) {
    getLine().yCord += diff;
    renderCanvas();
}

function setSelectedTxtIdx(idx) {
    gMeme.selectedLineIdx = +idx;
}



// function createLine() {
//     const yCord = getCanvas().height / 2;
//     const xCord = getCanvas().width / 2;
//     const line = {
//         txt: '',
//         size: 30,
//         align: 'center',
//         color: 'black',
//         xCord,
//         yCord
//     }
//     gMeme.lines.push(line);
//     renderCanvas();
// }