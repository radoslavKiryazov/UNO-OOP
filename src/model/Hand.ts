import { Card, cardPrinter } from "./Card";
import { createDeck } from "./Deck";
import { Player } from "./Player";
import { questionInt } from "readline-sync";

export type Hand = {
  readonly discardPile: Card[];
  readonly currentTurnIndex: number;
  playCard: (card: Card, hand: Card[]) => void; //super messy, I shouldnt be passing the entire hand with a seperate card just to check and remove it TODO
  drawCard: (player: Player) => void;
  checkForUNO: (playerIndex: number) => void;
  nextTurn: () => void;
  endHand: () => void;
  isHandOver: () => boolean;
};

export const createHand = (players: Player[]): Hand => {
  //start the hand
  const deck = createDeck();
  deck.shuffle();

  console.log("Dealing 7 cards to each player...\n");

  players.forEach((player) => {
    player.hand = deck.deal(7);
  });

  let discardPile: Card[] = [deck.discardTopCard()];
  let currentTurnIndex: number = 0;

  const playCard = async (selectedCard: Card, hand: Card[]) => {
    const player = players[currentTurnIndex]; // Get the current player

    if (canPlayCard(selectedCard)) {
      discardPile.push(selectedCard);
      player.hand = hand.filter((c) => c !== selectedCard);
      console.log("Card that was played:", cardPrinter(selectedCard));
      nextTurn();
    } else {
      console.log("Invalid card. Try again.");
      selectCardToPlay(currentTurnIndex);
    }
  };
  const selectCardToPlay = (playerIndex: number) => {
    const player = players[playerIndex];
    const { hand } = player;

    console.log("\n");
    console.log("\n");
    console.log("\n");
    console.log(`${player.name}, it's your turn!\n`);

    console.log(
      `Top card on the discard pile: ${cardPrinter(
        discardPile[discardPile.length - 1]
      )}`
    );
    console.log("Your hand: =>");
    hand.forEach((card, index) => {
      console.log(cardPrinter(card, index + 1));
    });

    let input = questionInt("Select a card index to play: ");
    const card = hand[input - 1];
    playCard(card, hand);
  };
  const drawCard = (player: Player) => {
    const card = deck.deal(1)[0];
    card && player.hand.push(card);
  };

  const canPlayCard = (card: Card): boolean => {
    const topCardFromDiscardPile = discardPile[discardPile.length - 1];

    return (
      card.colour === topCardFromDiscardPile.colour ||
      card.type === "WILD" ||
      card.type === "WILDDRAWFOUR" ||
      (card.type === "NUMBERED" &&
        topCardFromDiscardPile.type === "NUMBERED" &&
        card.value === topCardFromDiscardPile.value)
    );
  };

  const nextTurn = () => {
    currentTurnIndex = (currentTurnIndex + 1) % players.length;
    selectCardToPlay(currentTurnIndex);
  };

  const checkForUNO = (playerIndex: number) => {
    const player = players[playerIndex];
    if (player.hand.length === 1) {
      console.log(`${player.name} calls UNO!`);
    }
  };

  const endHand = () => {
    const winner = players.find((player) => player.hand.length === 0) || null;
    if (winner) {
      console.log(`${winner.name} won the hand!`);
    }
  };
  const isHandOver = (): boolean => {
    return players.some((player) => player.hand.length === 0);
  };
  return {
    checkForUNO,
    playCard,
    drawCard,
    nextTurn,
    discardPile,
    currentTurnIndex,
    endHand,
    isHandOver,
  };
};
