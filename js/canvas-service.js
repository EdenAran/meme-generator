'use strict';

var gCanvas;
var gCtx;
var gIsStroke = true;
var gIsDragText = false;
var gIsDragSticker = false;

function getCanvas() {
    return gCanvas;
}

function updateTextSettings(line) {
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align;
}

function setInitialCanvas(canvas) {
    gCanvas = canvas;
    gCtx = gCanvas.getContext('2d');
    gCtx.fillStyle = '#ffffff';
}

function clearCanvas() {
    gCtx.globalAlpha = 1;
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.length);
}

function drawCanvas({ url }, isHighlight = true) {
    const img = new Image();
    const lines = getLines();
    const stickers = getStickers();
    clearCanvas();
    img.src = `${url}`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        highlightText(isHighlight);
        lines.forEach(line => {
            updateTextSettings(line);
            line.width = gCtx.measureText(line.txt).width;
            gCtx.fillStyle = line.color;
            drawText(line.txt, line.xCord, line.yCord, line.isStroke)
        })
        stickers.forEach(sticker => {
            let stickerImg = new Image();
            stickerImg.src = sticker.url;
            gCtx.drawImage(stickerImg, sticker.xCord, sticker.yCord, 70, 70)
        })
    }
}

function drawText(text, x, y, isStroke) {
    gCtx.fillText(text, x, y)
    if (isStroke) gCtx.strokeText(text, x, y)
}

function isTextArea(ev) {
    return !(getActiveTextIdx(ev) === -1);
}

function isStickerArea(ev) {
    return !(getActiveStickerIdx(ev) === -1);
}

function textTouch(ev) {
    if (isTextArea(ev)) {
        setSelectedTextIdx(getActiveTextIdx(ev));
        setFocus();
        renderCanvas();
    } else if (isStickerArea(ev)) setSelectedStickerIdx(getActiveStickerIdx(ev));
    return;
}

function getActiveTextIdx(ev) {
    const lines = getLines();
    const { x, y } = getMousePos(ev);
    return lines.findIndex(line => {
        const align = line.align;
        switch (align) {
            case 'left':
                return (x >= line.xCord - 5 && x <= line.xCord + line.width + 5) && (y <= line.yCord + 5 && y >= line.yCord - line.size - 5)
            case 'center':
                return (x >= line.xCord - line.width / 2 - 5 && x <= line.xCord + line.width / 2 + 5) && (y <= line.yCord + 5 && y >= line.yCord - line.size - 5)
            case 'right':
                return (x >= line.xCord - line.width - 5 && x <= line.xCord + line.width + 5) && (y <= line.yCord + 5 && y >= line.yCord - line.size - 5)
        }
    }
    )
}

function getActiveStickerIdx(ev) {
    const stickers = getStickers();
    const { x, y } = getMousePos(ev);
    return stickers.findIndex(sticker => ((x >= sticker.xCord - 5 && x <= sticker.xCord + 75) &&
        (y >= sticker.yCord - 5 && y <= sticker.yCord + 75))
    )
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


function setAlign(align) {
    const line = getLine();
    var xCord;
    switch (align) {
        case 'right':
            xCord = gCanvas.width;
            break;
        case 'center':
            xCord = gCanvas.width / 2;
            break;
        case 'left':
            xCord = 0;
            break;
    }
    line.align = align;
    line.xCord = xCord;
    renderCanvas();
}

function highlightText(isHighlight) {
    const line = getLine();
    if(!line) return;
    const length = gCanvas.width;
    gCtx.beginPath()
    gCtx.fillStyle = "#ffffff";
    gCtx.globalAlpha = (isHighlight) ? 0.5 : 0;
    gCtx.fillRect(0, line.yCord + 10, length, -line.size - 10)
    gCtx.globalAlpha = 1;
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpeg'
}

function isDragArea(ev) {
    const line = getLine();
    if(!line) return;
    const { y } = getMousePos(ev);
    return (y <= line.yCord + 10 && y >= line.yCord - line.size - 10)
}

function startDrag(isSticker) {
    if (!isSticker) gIsDragText = true;
    else gIsDragSticker = true;
}

function releaseDrag() {
    gIsDragText = false;
    gIsDragSticker = false;
}

function dragText(ev) {
    if (!gIsDragText) return;
    const line = getLine();
    const { x, y } = getMousePos(ev);
    line.xCord = x;
    line.yCord = y;
    renderCanvas();
}

function dragSticker(ev) {
    if (!gIsDragSticker) return;
    const sticker = getSticker();
    const { x, y } = getMousePos(ev);
    sticker.xCord = x - 35;
    sticker.yCord = y - 35;
    renderCanvas();
}