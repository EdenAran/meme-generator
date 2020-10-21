'use strict';

var gCanvas;
var gCtx;
var gFont = 'IMPACT'

function getCanvas() {
    return gCanvas;
}


function renderCanvas() {
    updateSettings();
    const imgId = getMeme().selectedImgId;
    const image = getImgById(imgId);
    drawCanvas(image);
}

function updateSettings() {
    const line = getLine();
    gCtx.strokeStyle = line.color;
    gCtx.font = `${line.size}px ${gFont}`
    gCtx.textAlign = line.align;
}

function setInitialCanvas(canvas) {
    gCanvas = canvas;
    gCtx = gCanvas.getContext('2d');
    gCtx.fillStyle = '#ffffff';

}

function drawCanvas({ url }) {
    const img = new Image()
    const line = getLine();
    img.src = `${url}`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(line.txt, line.xCord, line.yCord);
    }
}

function drawText(text, x = gCanvas.width / 2, y = 100) {
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
