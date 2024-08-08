const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

const food = 'FOOD';
const faces = 'FACES';
const animals = 'ANIMALS';

const THEME_TYPE = {
    FOOD: food,
    FACES: faces,
    ANIMALS: animals
}

const foodIcons = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🥗', '🥘', '🥫', '🍝', '', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤'];

const facesIcons = ['😃', '😁', '😅', '😂', '🤣', '😊', '😇', '🙃', '😉', '😌', '😍', '🥰', '😘', '😋', '😛', '😝', '😜', '🤪', '🧐', '🤓', '😎', '🤩', '🥳', '😟', '😕', '😖', '😫', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😥', '🤗', '🤭', '🤫', '🤥', '😬', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢'];

const animalsIcons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐒', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🦈', '🐊', '🐅', '🦓', '🦍', '🦧', '🐘', '🦏', '🐪'];



// API
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

    let cards = [];
    for (let i = 0; i < quantity; i++) {
        let iconIndex = generateRandomIndex(0, (list.length - 1));
        let icon = list[iconIndex];
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

