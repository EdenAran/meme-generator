'use strict';

const STORAGE_KEY = 'memes'
var gSaved;


function setSavedMemes() {
    gSaved = loadFromStorage(STORAGE_KEY);
    if (!gSaved) {
        gSaved = {
            selectedMemeId: 0,
            savedData: [],
            memes: []
        }
    };
    gSaved.memes = gSaved.savedData.map((data, idx) => ({ id: idx, 'url': `${data}` }));
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
    gSaved.savedData.push(canvas.toDataURL());
    saveMemesToStorage();
    renderCanvas();
}

function deleteSavedMeme(id) {
    gSaved.memes.splice(id, 1);
    gSaved.savedData.splice(id, 1);
    saveMemesToStorage();
    renderImages(true);
}

function saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSaved)

}

function setIsSaved(isSaved) {
    getMeme().isSaved = isSaved;
}

