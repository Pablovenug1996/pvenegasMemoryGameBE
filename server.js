const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const axios = require('axios');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


const food = 'FOOD';
const faces = 'FACES';
const animals = 'ANIMALS';

const THEME_TYPE = {
    FOOD: food,
    FACES: faces,
    ANIMALS: animals
}

const foodIcons = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🥗', '🥘', '🥫', '🍝', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤'];

const facesIcons = ['😃', '😁', '😅', '😂', '🤣', '😊', '😇', '🙃', '😉', '😌', '😍', '🥰', '😘', '😋', '😛', '😝', '😜', '🤪', '🧐', '🤓', '😎', '🤩', '🥳', '😟', '😕', '😖', '😫', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😥', '🤗', '🤭', '🤫', '🤥', '😬', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢'];

const animalsIcons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐒', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🦈', '🐊', '🐅', '🦓', '🦍', '🦧', '🐘', '🦏', '🐪'];

const databaseURL = 'https://pvenegasmemorygame-default-rtdb.firebaseio.com/scores.json';

app.post('/score', async (request, response) => {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        const jsonData = Buffer.concat(body).toString();
        if (jsonData !== undefined) {
            const score = JSON.parse(jsonData);

            if (score !== undefined &&
                score.clicks !== undefined &&
                score.time !== undefined &&
                score.score !== undefined) {

                axios.post(databaseURL, score)
                    .then(function (result) {
                        response.send('Score saved');
                    })
                    .catch(function (error) {
                        response.send(error);
                    });

            } else {
                response.send('Score undefined or null');
            }
        }
    });
});


app.get('/scores', (request, response) => {

    axios.get(databaseURL)
        .then(function (res) {
            response.send(res.data);

        })
        .catch(function (error) {
            response.send(JSON.stringify({ error: 'Error requestion scores' }))
        })
        .finally(function () {

        })
});


app.get('/cards/:difficulty/:theme', (request, response) => {
    console.log('difficulty', request.params.difficulty);
    console.log('theme', request.params.theme);

    let cards = [];

    if (request?.params?.theme && request?.params?.difficulty) {

        const difficulty = request.params.difficulty;

        switch (request.params.theme) {
            case THEME_TYPE.FOOD:
                cards = getCardsFromIconsList(foodIcons, difficulty);
                break;
            case THEME_TYPE.FACES:
                cards = getCardsFromIconsList(facesIcons, difficulty);
                break;
            case THEME_TYPE.ANIMALS:
                cards = getCardsFromIconsList(animalsIcons, difficulty);
                break;

            default:
                break;
        }

        console.log(cards);
    }

    response.send(JSON.stringify({ 'cards': cards }));
});

function getCardsFromIconsList(list, quantity) {

    let iconIndexes = [];
    for (let i = 0; i < quantity; i++) {
        let iconIndex = getUniqueIndex(0, list.length, iconIndexes);
        iconIndexes.push(iconIndex);
    }

    let cards = [];
    for (let i = 0; i < iconIndexes.length; i++) {
        let icon = list[iconIndexes[i]];
        let card = {
            "isDiscovered": false,
            "icon": icon,
            "id": i
        };
        cards.push(card);
    };

    let cardsDuplicate = cards.slice();
    cards = cards.concat(cardsDuplicate);
    shuffle(cards);

    return cards;
};

function getUniqueIndex(min, max, iconIndexes) {
    const newIndex = generateRandomIndex(min, max);

    for (let i = 0; i < iconIndexes.length; i++) {
        if (newIndex === iconIndexes[i]) {
            return getUniqueIndex(min, max, iconIndexes);
        }
    }
    return newIndex;

}

function generateRandomIndex(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
};

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}


app.listen(port, () => {
    console.log('MemoryGameBE running!');
});

const scoresData = {
    "scores": [
        {
            "difficulty": 4,
            "clicks": 14,
            "score": 25,
            "time": 11,
            "username": "coco"
        },
        {
            "difficulty": 4,
            "clicks": 16,
            "score": 30,
            "time": 14,
            "username": "koko"
        },
        {
            "difficulty": 4,
            "clicks": 20,
            "score": 47,
            "time": 27,
            "username": "Esteban"
        },
        {
            "difficulty": 4,
            "clicks": 36,
            "score": 121,
            "time": 85,
            "username": "Superman"
        },
        {
            "difficulty": 4,
            "clicks": 56,
            "score": 123,
            "time": 67,
            "username": "tico"
        },
        {
            "difficulty": 4,
            "clicks": 66,
            "score": 151,
            "time": 85,
            "username": "oscar"
        },
        {
            "difficulty": 4,
            "clicks": 70,
            "score": 172,
            "time": 102,
            "username": "Superman"
        },
        {
            "difficulty": 4,
            "clicks": 72,
            "score": 185,
            "time": 113,
            "username": "Benjamin"
        },
        {
            "difficulty": 4,
            "clicks": 98,
            "score": 218,
            "time": 120,
            "username": "Nath"
        },
        {
            "difficulty": 4,
            "clicks": 134,
            "score": 1373,
            "time": 1239,
            "username": "Fabian"
        }
    ]
}