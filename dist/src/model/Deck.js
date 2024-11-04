import { announce, standardShuffler } from "../utils/random_utils";
export const colors = ["Red", "Blue", "Green", "Yellow"];
///helper functions
const addActionCards = (preparedDeck, colour) => {
    const actionCards = [
        { type: "SKIP", colour },
        { type: "REVERSE", colour },
        { type: "DRAWTWO", colour },
    ];
    actionCards.forEach((card) => {
        preparedDeck.push(card, { ...card }); // Add two of each action card
    });
};
const addNumberedCards = (preparedDeck, colour) => {
    for (let i = 0; i <= 9; i++) {
        const newCard = { type: "NUMBERED", colour, value: i };
        preparedDeck.push(newCard);
        if (i > 0)
            preparedDeck.push({ ...newCard }); // Add two of each number except 0
    }
};
const addWildCards = (preparedDeck) => {
    for (let i = 0; i < 4; i++) {
        preparedDeck.push({ type: "WILD", colour: "None" });
        preparedDeck.push({ type: "WILDDRAWFOUR", colour: "None" });
    }
};
/**
 *   Create a new deck of UNO cards.
 */
export const createDeck = () => {
    let preparedDeck = [];
    colors.forEach((colour) => {
        addNumberedCards(preparedDeck, colour);
        addActionCards(preparedDeck, colour);
    });
    addWildCards(preparedDeck);
    const shuffle = () => {
        console.log(announce("Shuffling the deck..."));
        standardShuffler(preparedDeck);
    };
    const discardTopCard = () => preparedDeck.pop();
    const deal = (numberOfCards) => {
        const dealtCards = [];
        for (let i = 0; i < numberOfCards; i++) {
            const card = preparedDeck.pop();
            if (card)
                dealtCards.push(card);
        }
        return dealtCards;
    };
    const size = () => preparedDeck.length;
    const addCards = (newCards) => {
        preparedDeck.push(...newCards);
        shuffle();
    };
    console.log(size());
    return { shuffle, deal, preparedDeck, size, discardTopCard, addCards };
};
//# sourceMappingURL=Deck.js.map