import { Card, CardType, Colour } from "./Card";
import { announce, standardShuffler, delay } from "../utils/random_utils";

export const colors: Array<Colour> = ["Red", "Blue", "Green", "Yellow"];
export type Deck = {
  readonly preparedDeck: Card[];
  /**
   * Shuffle the deck.
   */
  shuffle: () => void;
  deal: (numberOfCards: number) => Card[];
  size: () => number;
  discardTopCard: () => Card;
};

export const createDeck = (): Deck => {
  let preparedDeck: Card[] = [];

  colors.forEach((colour) => {
    for (let i = 0; i <= 9; i++) {
      const newCard: Card = { type: "NUMBERED", colour, value: i };
      preparedDeck.push(newCard);
      if (i > 0) preparedDeck.push({ type: "NUMBERED", colour, value: i });
    }

    const skipCard: Card = { type: "SKIP", colour };
    const reverseCard: Card = { type: "REVERSE", colour };
    const drawTwoCard: Card = { type: "DRAWTWO", colour };

    //todo: reeeeeeeeeeeefactor adding the cards
    preparedDeck.push(skipCard);
    preparedDeck.push(skipCard);

    preparedDeck.push(reverseCard);
    preparedDeck.push(reverseCard);

    preparedDeck.push(drawTwoCard);
    preparedDeck.push(drawTwoCard);
  });
  for (let i = 0; i < 4; i++) {
    preparedDeck.push({ type: "WILD", colour: "None" });
    preparedDeck.push({ type: "WILDDRAWFOUR", colour: "None" });
  }

  const shuffle = () => {
    console.log(announce("Shuffling the deck..."));
    return standardShuffler(preparedDeck);
  };

  const discardTopCard = (): Card => {
    return preparedDeck.pop() as Card;
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

  const size = () => {
    return preparedDeck.length;
  };

  return { shuffle, deal, preparedDeck, size, discardTopCard };
};

// const deck = createDeck();
// console.log(deck.preparedDeck);
// deck.shuffle();
// console.log('shuffled ',deck.preparedDeck);

// // cards to discard pile
// const cardsDrawn = deck.deal(5);
// console.log(deck.size())

// console.log(cardsDrawn);
