'use strict';

const STORAGE_KEY = 'memes'
var gSaved = {
    selectedMemeId: 0,
    data: [],
    memes: []
}

function setSavedMemes() {
    gSaved = loadFromStorage(STORAGE_KEY);
    if (!gSaved.data || !gSaved.data.length) return;
    gSaved.memes = gSaved.data.map((data, idx) => ({ id: idx, 'url': `${data}` }))
    renderImages(true);
}

function getSavedMemes() {
    return gSaved.memes;
}
function getSavedMemeById(id) {
    return gSaved.memes.find(meme => meme.id === id);
}

function loadSavedMemes() {
    const savedDatas = loadFromStorage(STORAGE_KEY);
    return savedDatas.map((data) => {
        let img = new Image;
        img.src = data;
        img.classList.add('pointer');
        img.onclick = () => onImgClick(img, true);
        return img;
    })
}

function saveMeme() {
        const canvas = getCanvas();
        if (!gSaved.data) gSaved.data = [];
        gSaved.data.push(canvas.toDataURL());
        saveMemesToStorage();
        renderCanvas();
}

function deleteSavedMeme(id) {
    gSaved.memes.splice(id, 1);
    gSaved.data.splice(id, 1);
    saveMemesToStorage();
    renderImages(true);
}

function saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSaved)

}

function setSavedId(id){
    gSaved.selectedMemeId = id;
}

function getSavedMemeId(){
    return gSaved.selectedMemeId;
}

function setIsSaved(isSaved){
    getMeme().isSaved = isSaved;
}