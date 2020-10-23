'use-strict';

const NUM_OF_WORDS = 6;
var gCurrWordIdx = 0;
var gFilterBy;
var gKeywords = {
    'meme': 8, 'trump': 1, 'funny': 6, 'embarrassed': 10, 'face': 4, 'dog': 6, 'cute': 9, 'cat': 6, 'tired': 9, 'success': 2, 'kid': 6, 'positive': 2, 'aliens': 5, 'conspiracy': 1,
    'history': 4, 'big eyes': 1, 'sarcastic': 7, 'man': 1, 'evil': 3, 'laugh': 9, 'smile': 1, 'barak': 10, 'obama': 1, 'kissing': 11, 'pride': 2,
    'sport': 1, 'haim': 13, ' hecht': 2, 'point': 7, 'cheers': 4, 'leonardo': 1, 'alcohol': 10, 'matrix': 4, 'laurence': 2, 'fishburne': 3, 'LOTR': 1, 'one': 9,
    'simply': 11, 'mordor': 11, 'picard': 1, 'star': 8, 'trek': 5, 'v': 1, 'putin': 6, 'serious': 10, 'toy story': 13, 'buzz': 11,
    'lightyear': 1, 'woody': 12, 'sad': 8, 'happy': 13
};
var gImgs = [
    { id: 1, url: `./imgs/1.jpg`, keywords: ['meme', 'trump', 'funny', 'face'] },
    { id: 2, url: `./imgs/2.jpg`, keywords: ['meme', 'dog', 'cute'] },
    { id: 3, url: `./imgs/3.jpg`, keywords: ['meme', ' baby', 'dog', 'cute'] },
    { id: 4, url: `./imgs/4.jpg`, keywords: ['meme', 'cat', 'tired', 'cute'] },
    { id: 5, url: `./imgs/5.jpg`, keywords: ['meme', 'success', 'kid', 'positive'] },
    { id: 6, url: `./imgs/6.jpg`, keywords: ['meme', 'aliens', 'conspiracy', 'history'] },
    { id: 7, url: `./imgs/7.jpg`, keywords: ['meme', 'funny face', 'big eyes', 'kid', 'cute'] },
    { id: 8, url: `./imgs/8.jpg`, keywords: ['meme', 'sarcastic', 'man'] },
    { id: 9, url: `./imgs/9.jpg`, keywords: ['meme', 'evil', 'laugh', 'kid'] },
    { id: 10, url: `./imgs/10.jpg`, keywords: ['meme', 'smile', 'barak', 'obama', 'positive'] },
    { id: 11, url: `./imgs/11.jpg`, keywords: ['meme', 'kissing', 'pride', 'sport'] },
    { id: 12, url: `./imgs/12.jpg`, keywords: ['meme', 'haim', ' hecht', 'point'] },
    { id: 13, url: `./imgs/13.jpg`, keywords: ['meme', 'cheers', 'leonardo', 'alcohol'] },
    { id: 14, url: `./imgs/14.jpg`, keywords: ['meme', 'matrix', 'laurence', 'fishburne'] },
    { id: 15, url: `./imgs/15.jpg`, keywords: ['meme', 'LOTR', 'one', 'simply', 'mordor'] },
    { id: 16, url: `./imgs/16.jpg`, keywords: ['meme', 'picard', 'embarrassed', 'smile', 'star', 'trek'] },
    { id: 17, url: `./imgs/17.jpg`, keywords: ['meme', 'v', 'putin', 'serious'] },
    { id: 18, url: `./imgs/18.jpg`, keywords: ['meme', 'toy story', 'buzz', 'lightyear', 'woody', 'sad', 'happy'] }
];

function getImages() {
    return gImgs;
}

function getImageById(id) {
    return gImgs.find((img) => img.id === id);

}

function generateImages() {
    for (let i = 0; i < 18; i++) {
        gImgs.push(generateImage(i + 1))
    }
}

function generateImage(id) {
    return { id, url: `./imgs/${id}.jpg`, keywords: ['meme'] }
}

function setFilter(filter) {
    gFilterBy = filter;
    renderImages();
}

function getImagesForGallery() {
    if (!gFilterBy) return gImgs;
    return gImgs.filter(img => {
        return img.keywords.some(keyword => keyword.includes(gFilterBy));
    })
}

function getKeywordsForDisplay() {
    const startIdx = gCurrWordIdx * NUM_OF_WORDS;
    return Object.keys(gKeywords).slice(startIdx, NUM_OF_WORDS + startIdx);
}

function getKeywordValue(keyword) {
    return gKeywords[keyword];
}

function getKeywords() {
    return gKeywords;
}

function moreKeywords() {
    const size = Object.keys(gKeywords).length;
    if ((gCurrWordIdx + 1) * NUM_OF_WORDS >= size) gCurrWordIdx = 0;
    else gCurrWordIdx++;
    renderKeywords();
}