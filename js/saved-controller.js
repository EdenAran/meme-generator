'use strict';

const STORAGE_KEY = 'memes'
var gSaved=[];

function renderSaved(){

}

function getSaved(){
    const datas = loadFromStorage(STORAGE_KEY);
    return datas.map((data)=>{
        let img= new Image;
        img.src = data;
        return img;
    })
}

function onSave(){
    const canvas = getCanvas();
    gSaved.push(canvas.toDataURL());
    saveToStorage(STORAGE_KEY, gSaved)
}