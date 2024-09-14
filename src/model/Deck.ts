import {Card, CardType, Colour} from './Card'
import { standardShuffler } from '../utils/random_utils';

export interface Deck {
    /**
     * Shuffle the deck.
     */
    readonly shuffle: () => void;
    readonly deal: (numberOfCards: number) => Card[];
    readonly discardCard: (card: Card) => void;
    readonly getDiscardPile: () => Card[];
    readonly getTopCardOfDiscardPile: () => Card | undefined
    readonly getCards: () => Card[];
    readonly getDeckSize: () => number;
    readonly colors: Colour[];
}

export const createDeck = (): Deck => {
    const colors: Array<Colour> = ['Red', 'Blue', 'Green', 'Yellow'] as const;
    let preparedDeck: Card[] = [] as const;
    let discardPile: Card[] = [] as const;

    colors.forEach((colour) => {
        for (let i = 0; i <=9; i++) {
            const newCard: Card = {type: 'NUMBERED', colour , value: i}
            preparedDeck.push(newCard)
            if (i > 0) preparedDeck.push({type: 'NUMBERED', colour , value: i}); 
        }

        const skipCard: Card = {type: 'SKIP', colour}
        const reverseCard: Card = {type: 'REVERSE', colour}
        const drawTwoCard: Card = {type: 'DRAWTWO', colour}

        //todo: reeeeeeeeeeeefactor adding the cards
        preparedDeck.push(skipCard)
        preparedDeck.push(skipCard)

        preparedDeck.push(reverseCard)
        preparedDeck.push(reverseCard)

        preparedDeck.push(drawTwoCard)
        preparedDeck.push(drawTwoCard)

    })
    for (let i = 0; i < 4; i++) {
        preparedDeck.push({type: 'WILD', colour: 'None'});
        preparedDeck.push({type: 'WILDDRAWFOUR', colour: "None"});

    }

    const shuffle = () => {
        return standardShuffler(preparedDeck);
    };

    const deal = (numberOfCards: number): Card[] => {
        const dealtCards: Card[] = [];
        for (let i = 0; i < numberOfCards; i++) {
            if (preparedDeck.length === 0) break; // Stop if deck is empty
            const card = preparedDeck.pop();
            if (card) dealtCards.push(card);
        }
        return dealtCards;
    };

    const discardCard = (card: Card): void => {
        discardPile.push(card);
    };

    const getCards = () => [...preparedDeck];
    const getDiscardPile = (): Card[] => [...discardPile];

    const getTopCardOfDiscardPile = (): Card | undefined => {
        return discardPile.length > 0 ? discardPile[discardPile.length - 1] : undefined;
    };

    const getDeckSize = () => { return preparedDeck.length };


    return {shuffle, deal, getCards: getCards, colors, getDiscardPile, getTopCardOfDiscardPile, discardCard, getDeckSize};
}

const deck = createDeck();
console.log(deck.getCards());
deck.shuffle();
console.log('shuffled ',deck.getCards());


// cards to discard pile
const cardsDrawn = deck.deal(5);
console.log(deck.getDeckSize())

console.log(cardsDrawn);


