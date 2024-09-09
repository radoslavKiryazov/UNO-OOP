import {Card, CardType, Colour} from './Card'

interface Deck {
    cards: Card[],
    playedCards: Card[],
}

const generateDeck = (): Deck => {
    const colors: Array<Colour> = ['Red', 'Blue', 'Green', 'Yellow'];
    let preparedDeck: Card[] = [];

    //this for now generates only one set of each (COLOUR 0-9)
    //TODO: two sets.
    colors.forEach((colour) => {
        for (let i = 0; i <=9; i++) {
            preparedDeck.push({colour, type:{type: 'Number' , value: i}})
        }

        preparedDeck.push({colour, type: {type: 'Skip'}})
        preparedDeck.push({colour, type: {type: 'Reverse'}})
        preparedDeck.push({colour, type: {type: 'DrawTwo'}})

    })
    for (let i = 0; i < 4; i++) {
        preparedDeck.push({ colour: "Wild", type: {type: 'Wild'}});
      }
    return {cards: preparedDeck, playedCards: []};
}

const deck = generateDeck();
console.log(deck.cards)



//UNO DECK RECIPE:
//