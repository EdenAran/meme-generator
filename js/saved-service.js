'use strict';

const STORAGE_KEY = 'memes'
var gSaved = {
    selectedMemeId: 0,
    savedData: [],
    memes: []
}

function setSavedMemes() {
    gSaved = loadFromStorage(STORAGE_KEY);
    if (!gSaved || !gSaved.length) {
        gSaved = {
            selectedMemeId: 0,
            savedData: [],
            memes: []
        }
    };
    gSaved.memes = gSaved.data.map((data, idx) => ({ id: idx, 'url': `${data}` }))
    renderImages(true);
}

function getSavedMemes() {
    return gSaved.memes;
}
function getSavedMemeById(id) {
    return gSaved.memes.find(meme => meme.id === id);
}

function saveMeme() {
    const canvas = getCanvas();
    if (!gSaved.savedData || !gSaved.savedData.length) gSaved.savedData = [];
    gSaved.savedData.push(canvas.toDataURL());
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

function setSavedId(id) {
    gSaved.selectedMemeId = id;
}

function getSavedMemeId() {
    return gSaved.selectedMemeId;
}

function setIsSaved(isSaved) {
    getMeme().isSaved = isSaved;
}