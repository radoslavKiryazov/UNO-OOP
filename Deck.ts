import {Card, cardPrinter, CardType, Colour} from './Card'

interface Deck {
    cards: Card[],
    playedCards: Card[],
    shuffle: () => void;
    drawCard: () => Card | undefined;
}

const createDeck = (): Deck => {
    const colors: Array<Colour> = ['Red', 'Blue', 'Green', 'Yellow'];
    let preparedDeck: Card[] = [];

    colors.forEach((colour) => {
        for (let i = 0; i <=9; i++) {
            const newCard: Card = {colour, type:{type: 'Number' , value: i}}
            preparedDeck.push(newCard)
            if (i > 0) preparedDeck.push({colour, type:{type: 'Number' , value: i}}); 
        }

        const skipCard: Card = {colour, type: {type: 'Skip'}}
        const reverseCard: Card = {colour, type: {type: 'Reverse'}}
        const drawTwoCard: Card = {colour, type: {type: 'DrawTwo'}}
        //todo: refactor
        preparedDeck.push(skipCard)
        preparedDeck.push(skipCard)

        preparedDeck.push(reverseCard)
        preparedDeck.push(reverseCard)

        preparedDeck.push(drawTwoCard)
        preparedDeck.push(drawTwoCard)

    })
    for (let i = 0; i < 4; i++) {
        preparedDeck.push({ colour: "Wild", type: {type: 'Wild'}});
    }

    const drawCard = () => {
        if(preparedDeck.length !== 0) {
            return preparedDeck.pop();
        }
    }

    return {cards: preparedDeck, playedCards: [], shuffle: () => {}, drawCard};
}

const deck = createDeck();
console.log(deck.cards);
console.log(deck.cards.length) //104 missing the wildcards






//UNO DECK RECIPE:
//