const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const terrestrial = 'TERRESTRIAL';
const acuatics = 'ACUATICS';
const flying = 'fLYING';


export const THEME_TYPE = {
    TERRESTRIAL: terrestrial,
    ACUATICS: acuatics,
    FLYING: flying,
}

const terrestrialIcon = [];
const acuaticsIcon = [];
const fyingIcon = [];


// API
app.get('/cards/:difficulty/:theme', (request, response) => {
    console.log('difficulty', request.params.difficulty);
    console.log('theme', request.params.theme);
    response.send(JSON.stringify(cardsData));
});

app.listen(port, () => {
    console.log('MemoryGameBE running!');
});

const cardsData = {
    "cards": [
        {
            "isDiscovered": false,
            "icon": "🥜",
            "id": 49
        },
        {
            "isDiscovered": false,
            "icon": "🍏",
            "id": 0
        },
        {
            "isDiscovered": false,
            "icon": "🥝",
            "id": 16
        },
        {
            "isDiscovered": false,
            "icon": "🥝",
            "id": 16
        },
        {
            "isDiscovered": false,
            "icon": "🥭",
            "id": 13
        },
        {
            "isDiscovered": false,
            "icon": "🥭",
            "id": 13
        },
        {
            "isDiscovered": false,
            "icon": "🍉",
            "id": 6
        },
        {
            "isDiscovered": false,
            "icon": "🥒",
            "id": 22
        },
        {
            "isDiscovered": false,
            "icon": "🍹",
            "id": 56
        },
        {
            "isDiscovered": false,
            "icon": "🥜",
            "id": 49
        },
        {
            "isDiscovered": false,
            "icon": "🍹",
            "id": 56
        },
        {
            "isDiscovered": false,
            "icon": "🍏",
            "id": 0
        },
        {
            "isDiscovered": false,
            "icon": "🥎",
            "id": 53
        },
        {
            "isDiscovered": false,
            "icon": "🍉",
            "id": 6
        },
        {
            "isDiscovered": false,
            "icon": "🥎",
            "id": 53
        },
        {
            "isDiscovered": false,
            "icon": "🥒",
            "id": 22
        }
    ]
}
