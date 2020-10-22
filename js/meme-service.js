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

function updateText(txt) {
    getLine().txt = txt;
    renderCanvas();
}

function setFontSize(diff) {
    getLine().size += diff;
    renderCanvas();
}

function setInitTextPosition(line, xCord) {
    line.xCord = xCord;
}

function updatePosition(diff) {
    getLine().yCord += diff;
    renderCanvas();
}

function setSelectedTextIdx(idx) {
    gMeme.selectedLineIdx = +idx;
}

function createLine() {
    const numOfLines = gMeme.lines.length;
    const yCord = (numOfLines === 0) ? 50 :(numOfLines > 1) ? getCanvas().height / 2 : getCanvas().height - 50;
    const xCord = getCanvas().width / 2;
    const line = {
        txt: 'Your text here',
        size: 30,
        align: 'center',
        color: 'black',
        xCord,
        yCord
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    setText(line.txt);
    renderCanvas();
}

function switchLines() {
    const numOfLines = gMeme.lines.length - 1;
    const currIdx = gMeme.selectedLineIdx;
    gMeme.selectedLineIdx = (currIdx < numOfLines) ? currIdx + 1 : 0
    setText();
}

function deleteLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx--, 1);
    renderCanvas();
    setText();
}