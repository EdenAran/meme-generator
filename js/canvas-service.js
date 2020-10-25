'use strict';

var gCanvas;
var gCtx;
var gDragData = {
    isStroke: true,
    isTextDrag: false,
    isStickerDrag: false,
    selectedItem: 'text'
}

function getDragData() {
    return gDragData;
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

function drawCanvas(url, isHighlight = true) {
    const img = new Image();
    const lines = getLines();
    const stickers = getStickers();
    clearCanvas();
    img.src = url;
    img.onload = () => {
        let height = Math.round((img.height * gCanvas.width) / img.width);
        setCanvasHeight(img);
        gCtx.drawImage(img, 0, 0, gCanvas.width, height);
        highlightItem(isHighlight);
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
        gDragData.selectedItem = 'text';
        setSelectedTextIdx(getActiveTextIdx(ev, isTouch));
        setText();
    } else if (isStickerArea(ev, isTouch)) {
        gDragData.selectedItem = 'sticker';
        setSelectedStickerIdx(getActiveStickerIdx(ev, isTouch))
    } else gDragData.selectedItem = '';
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
    return stickers.findIndex(sticker => ((x >= sticker.xCord - 5 && x <= sticker.xCord + sticker.size + 5) &&
        (y >= sticker.yCord - 5 && y <= sticker.yCord + sticker.size + 5)))
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
    const selItem = gDragData.selectedItem;
    if (!selItem) return;
    const item = (selItem === 'text') ? getLine() : getSticker();
    var xCord;
    var diff = (selItem === 'text') ? 0 : item.size
    switch (align) {
        case 'right':
            xCord = gCanvas.width - diff;
            break;
        case 'center':
            xCord = gCanvas.width / 2 - diff / 2;
            break;
        case 'left':
            xCord = 0;
            break;
    }
    item.align = align;
    item.xCord = xCord;
}

function highlightItem(isHighlight) {
    const el = (gDragData.selectedItem === 'text') ? getLine() : (gDragData.selectedItem === 'sticker') ? getSticker() : null;
    if (!el) return;
    const diff = (gDragData.selectedItem === 'text') ? -1 : 1;
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
    const el = (gDragData.selectedItem === 'text') ? getLine() : getSticker();
    if (!el) return;
    const { y } = getMousePos(ev, isTouch);
    return (gDragData.selectedItem === 'text') ? (y <= el.yCord + 5 && y >= el.yCord - el.size - 10) : (y >= el.yCord - 5 && y <= el.yCord + el.size - 10);
}

function startDrag() {
    if (gDragData.selectedItem === 'text') gDragData.isTextDrag = true;
    else gDragData.isStickerDrag = true;
}

function releaseDrag() {
    gDragData.isTextDrag = false;
    gDragData.isStickerDrag = false;
}

function dragText(ev, isTouch) {
    if (!gDragData.isTextDrag) return;
    const line = getLine();
    const { x, y } = getMousePos(ev, isTouch);
    line.xCord = x;
    line.yCord = y;
}

function dragSticker(ev, isTouch) {
    if (!gDragData.isStickerDrag) return;
    const sticker = getSticker();
    if (!sticker) return;
    const { x, y } = getMousePos(ev, isTouch);
    sticker.xCord = x - sticker.size / 2;
    sticker.yCord = y - sticker.size / 2;
}

function touchStart(ev) {
    canvasClick(ev, true);
    if (isDragArea(ev, true)) {
        ev.preventDefault();
        startDrag();
    }
    dragText(ev, true)
    dragSticker(ev, true)
}

function isDragging() {
    return gDragData.isTextDrag || gDragData.isStickerDrag;
}

function isDraggable(ev, isTouch) {
    const line = getLine();
    const sticker = getSticker();
    if (!line && !sticker) return
    return (isStickerArea(ev, isTouch) || isTextArea(ev, isTouch));
}

function setCanvasHeight(img) {
    const height = Math.round((img.height * gCanvas.width) / img.width);
    (document.querySelector('canvas').height) = height;
    document.querySelector('.canvas-container').height = height;

}

function loadImageFromInput(ev) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.src = event.target.result;
        img.onload = (data) => {
            setLoadedImg(data.path[0].src)
        }
    }
    reader.readAsDataURL(ev.target.files[0]);
}
