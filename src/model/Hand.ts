import { Card } from "./Card";
import { createDeck } from "./Deck";
import { Player } from "./Player";
import { questionInt } from "readline-sync";

export type Hand = {
  readonly discardPile: Card[];
  readonly currentTurnIndex: number;
  playCard: (playerIndex: number, cardIndex: number) => void;
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

  console.log("Dealing 7 cards to each player...");

  players.forEach((player) => {
    player.hand = deck.deal(7);
  });

  let discardPile: Card[] = [deck.discardTopCard()];
  let currentTurnIndex: number = 0;

  console.log(
    `Starting card is ${discardPile[0].colour} ${discardPile[0].type}`
  );
  console.log(`${players[currentTurnIndex].name}'s turn`);

  const playCard = (playerIndex: number) => {
    const player = players[playerIndex];
    const { hand } = player;

    console.log("Your hand:");
    hand.forEach((card, index) => {
      console.log(`${index}: ${card.colour} ${card.type}`);
    });
    console.log(`Top card on the discard pile: ${discardPile[length - 1]}`);

    let input = questionInt("Select a card index to play");

    const selectedCard = hand[input];

    if (canPlayCard(selectedCard)) {
      discardPile.push(selectedCard);
      player.hand.filter((c) => c !== selectedCard);
      console.log(`${player.name} played ${selectedCard}`);
      nextTurn();
      if (player.hand.length === 0) {
        endHand();
      }
    }
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
    console.log("currentTurnIndex", currentTurnIndex);
    currentTurnIndex = (currentTurnIndex + 1) % players.length;
    console.log(`Next turn: ${players[currentTurnIndex].name}`);
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
