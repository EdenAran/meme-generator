'use strict';

var gCanvas;
var gCtx;
var gData = {
    isStroke: true,
    isTextDrag: false,
    isStickerDrag: false,
    selectedEl: 'text'
}

function getCanvasData() {
    return gData;
}

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
        highlightElement(isHighlight);
        lines.forEach(line => {
            updateTextSettings(line);
            line.width = gCtx.measureText(line.txt).width;
            gCtx.fillStyle = line.color;
            drawText(line.txt, line.xCord, line.yCord, line.isStroke)
        })
        stickers.forEach(sticker => {
            let stickerImg = new Image();
            stickerImg.src = sticker.url;
            gCtx.drawImage(stickerImg, sticker.xCord, sticker.yCord, sticker.size, sticker.size)
        })
    }
}

function drawText(text, x, y, isStroke) {
    gCtx.fillText(text, x, y)
    if (isStroke) gCtx.strokeText(text, x, y)
}

function isTextArea(ev, isTouch) {
    return !(getActiveTextIdx(ev, isTouch) === -1);
}

function isStickerArea(ev, isTouch) {
    return !(getActiveStickerIdx(ev, isTouch) === -1);
}

function canvasClick(ev, isTouch = false) {
    if (isTextArea(ev, isTouch)) {
        gData.selectedEl = 'text';
        setSelectedTextIdx(getActiveTextIdx(ev, isTouch));
        setFocus();
    } else if (isStickerArea(ev, isTouch)) {
        gData.selectedEl = 'sticker';
        setSelectedStickerIdx(getActiveStickerIdx(ev, isTouch))
    } else gData.selectedEl = '';
    renderCanvas();
    return;
}

function getActiveTextIdx(ev, isTouch) {
    const lines = getLines();
    const { x, y } = getMousePos(ev, isTouch);
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

function getActiveStickerIdx(ev, isTouch) {
    const stickers = getStickers();
    const { x, y } = getMousePos(ev, isTouch);
    return stickers.findIndex(sticker => ((x >= sticker.xCord - 5 && x <= sticker.xCord + 75) &&
        (y >= sticker.yCord - 5 && y <= sticker.yCord + 75))
    )
}

function getMousePos(ev, isTouch = false) {
    const rect = gCanvas.getBoundingClientRect(),
        scaleX = gCanvas.width / rect.width,
        scaleY = gCanvas.height / rect.height;
    if (!isTouch) return {
        x: (ev.clientX - rect.left) * scaleX,
        y: (ev.clientY - rect.top) * scaleY
    }
    else return {
        x: (ev.touches[0].clientX - rect.left) * scaleX,
        y: (ev.touches[0].clientY - rect.top) * scaleY
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

function highlightElement(isHighlight) {
    const el = (gData.selectedEl === 'text') ? getLine() : (gData.selectedEl === 'sticker') ? getSticker() : null;
    if (!el) return;
    const diff = (gData.selectedEl === 'text') ? -1 : 1;
    const length = gCanvas.width;
    gCtx.beginPath()
    gCtx.fillStyle = "#ffffff";
    gCtx.globalAlpha = (isHighlight) ? 0.5 : 0;
    gCtx.fillRect(0, el.yCord + 5, length, el.size * diff - 10)
    gCtx.globalAlpha = 1;
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpeg'
}

function isDragArea(ev, isTouch) {
    const el = (gData.selectedEl === 'text') ? getLine() : getSticker();
    if (!el) return;
    const { y } = getMousePos(ev, isTouch);
    return (gData.selectedEl === 'text') ? (y <= el.yCord + 5 && y >= el.yCord - el.size - 10) : (y >= el.yCord - 5 && y <= el.yCord + el.size - 10);
}

function startDrag() {
    if (gData.selectedEl === 'text') gData.isTextDrag = true;
    else gData.isStickerDrag = true;
}

function releaseDrag() {
    gData.isTextDrag = false;
    gData.isStickerDrag = false;
}

function dragText(ev, isTouch) {
    if (!gData.isTextDrag) return;
    const line = getLine();
    const { x, y } = getMousePos(ev, isTouch);
    line.xCord = x;
    line.yCord = y;
    renderCanvas();
}

function dragSticker(ev, isTouch) {
    if (!gData.isStickerDrag) return;
    const sticker = getSticker();
    if (!sticker) return;
    const { x, y } = getMousePos(ev, isTouch);
    sticker.xCord = x - sticker.size / 2;
    sticker.yCord = y - sticker.size / 2;
    renderCanvas();
}

function touchStart(ev) {
    canvasClick(ev, true);
    if (isDragArea(ev, true)) startDrag();
    dragText(ev, true)
    dragSticker(ev, true)
}

function isDragging() {
    return gData.isTextDrag || gData.isStickerDrag;
}

function isDraggable(ev, isTouch) {
    const line = getLine();
    const sticker = getSticker();
    if (!line && !sticker) return
    return (isStickerArea(ev, isTouch) || isTextArea(ev, isTouch));
}