import { Card, cardPrinter, Colour } from "./Card";
import { createDeck } from "./Deck";
import { Player } from "./Player";
import { questionInt } from "readline-sync";

export type Hand = {
  readonly discardPile: Card[];
  readonly currentTurnIndex: number;
  playCard: (card: Card, hand: Card[]) => void; //super messy, I shouldnt be passing the entire hand with a seperate card just to check and remove it TODO
  drawCards: (player: Player, numberOfCards: number) => void;
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
      if (
        selectedCard.type === "WILD" ||
        selectedCard.type === "WILDDRAWFOUR"
      ) {
        const newColour: Colour = selectColour();

        selectedCard = { ...selectedCard, colour: newColour };
        console.log(`You selected ${newColour}!`);
      }

      if (selectedCard.type === "DRAWTWO") {
        console.log(`${player.name} played a Draw Two!`);
        discardPile.push(selectedCard);
        player.hand = hand.filter((c) => c !== selectedCard);

        // Force the next player to draw two cards and skip their turn
        const nextPlayerIndex = (currentTurnIndex + 1) % players.length;
        const nextPlayer = players[nextPlayerIndex];

        console.log(`${nextPlayer.name} must draw two cards!`);
        drawCards(nextPlayer, 2); // Draw two cards
        console.log(
          `${nextPlayer.name} has drawn two cards and their turn is skipped!`
        );

        // Skip the next player's turn and move to the following player
        currentTurnIndex = (nextPlayerIndex + 1) % players.length;
      }
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

    printPlayersHand(hand);

    const isThereAPlayableCard = hand.some((card) => canPlayCard(card));
    if (!isThereAPlayableCard) {
      forceDrawUntilPlayable(hand, player);
    }

    let input = questionInt("Select a card index to play: ");
    const card = hand[input - 1];
    playCard(card, hand);
  };

  const drawCards = (player: Player, numberOfCards: number) => {
    for (let i = 0; i < numberOfCards; i++) {
      const card = deck.deal(1)[0];
      if (card) {
        player.hand.push(card);
      }
    }
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

  //helpers
  const selectColour = () => {
    console.log("Please choose a colour for the Wild Card!");
    console.log("[1] Red");
    console.log("[2] Blue");
    console.log("[3] Green");
    console.log("[4] Yellow");

    const input = questionInt(
      "Enter the number corresponding to your choice: "
    );
    switch (input) {
      case 1:
        return "Red";
      case 2:
        return "Blue";
      case 3:
        return "Green";
      case 4:
        return "Yellow";
      default:
        return "Blue";
    }
  };

  const forceDrawUntilPlayable = (hand: Card[], player: Player) => {
    let isPlayable = hand.some((card) => canPlayCard(card));

    while (!isPlayable) {
      console.log(`${player.name}, no playable cards! You must draw a card.`);
      drawCards(player, 1);
      console.log(
        `You drew: ${cardPrinter(player.hand[player.hand.length - 1])}`
      );

      // Check the new hand after drawing
      isPlayable = player.hand.some((card) => canPlayCard(card));

      printPlayersHand(hand);
    }
  };

  const printPlayersHand = (hand: Card[]): void => {
    console.log("Your hand: =>");
    hand.forEach((card, index) => {
      console.log(cardPrinter(card, index + 1));
    });
  };
  return {
    checkForUNO,
    playCard,
    drawCards,
    nextTurn,
    discardPile,
    currentTurnIndex,
    endHand,
    isHandOver,
  };
};
