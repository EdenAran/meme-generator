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
    const lines = getLines();
    img.src = `${url}`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        lines.forEach(line => {
            line.width = gCtx.measureText(line.txt).width;
            drawText(line.txt, line.xCord, line.yCord)
        })
    }
}

function drawText(text, x, y) {
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function checkTextArea(ev) {
    const lines = getLines();
    const { x, y } = getMousePos(ev);
    const idx = lines.findIndex(line =>
        (x >= line.xCord - line.width / 2 - 5 && x <= line.xCord + line.width / 2 + 5) && (y <= line.yCord + 5 && y >= line.yCord - line.size - 5)
    )
    if (idx === -1) return;
    setSelectedTxtIdx(idx)
    setFocus();
}

function getMousePos(ev) {
    const rect = gCanvas.getBoundingClientRect(), 
        scaleX = gCanvas.width / rect.width,    
        scaleY = gCanvas.height / rect.height;  
    return {
        x: (ev.clientX - rect.left) * scaleX,   
        y: (ev.clientY - rect.top) * scaleY     
    }
}
