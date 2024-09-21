import { Card, cardPrinter, Colour } from "./Card";
import { createDeck } from "./Deck";
import { Player } from "./Player";
import { questionInt, question } from "readline-sync";

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
        console.log(`You selected ${newColour}!`);
        
        player.hand = hand.filter((c) => c !== selectedCard);
        selectedCard = { ...selectedCard, colour: newColour };
        discardPile.push(selectedCard);
        
        currentTurnIndex = (currentTurnIndex + 1) % players.length;
      }

      if (selectedCard.type === "DRAWTWO") {
        console.log(`${player.name} played a Draw Two!`);
        
        player.hand = hand.filter((c) => c !== selectedCard);
        discardPile.push(selectedCard);

        const nextPlayer = players[currentTurnIndex + 1 % players.length] ;
        currentTurnIndex = (currentTurnIndex + 2) % players.length;

        console.log(`${nextPlayer.name} must draw two cards!`);
        drawCards(nextPlayer, 2);
        console.log(
          `${nextPlayer.name} has drawn two cards and their turn is skipped!`
        );

      }
      if (selectedCard.type === "SKIP") {
        console.log(`${player.name} played a Skip!`);

        player.hand = hand.filter((c) => c !== selectedCard);
        discardPile.push(selectedCard);

        currentTurnIndex = (currentTurnIndex + 2) % players.length;
      }

      if(selectedCard.type === "REVERSE") {
        discardPile.push(selectedCard);
        player.hand = hand.filter((c) => c !== selectedCard);
        //todo
      }
      if(selectedCard.type === "NUMBERED") {
        discardPile.push(selectedCard);
        player.hand = hand.filter((c) => c !== selectedCard);
        console.log("Card that was played:", cardPrinter(selectedCard));
        currentTurnIndex = (currentTurnIndex + 1) % players.length;
      }
      nextTurn();
    } else {
      console.log("Invalid card. Try again.");
      selectCardToPlay(currentTurnIndex);
    }
  };
  const selectCardToPlay = (playerIndex: number) => {
    const player = players[playerIndex];
    const { hand } = player;

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
    //currentTurnIndex = (currentTurnIndex + 1) % players.length;
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
    console.log(`\x1b[31m [1] Red`);
    console.log("\x1b[34m [2] Blue");
    console.log("\x1b[32m [3] Green");
    console.log("\x1b[33m [4] Yellow");

    const input = questionInt(
      "\x1b[35m Enter the number corresponding to your choice: \x1b[37m"
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
        return "Blue";``
    }
  };

  const forceDrawUntilPlayable = (hand: Card[], player: Player) => {
    let isPlayable = hand.some((card) => canPlayCard(card));

    while (!isPlayable) {
      console.log(`${player.name}, no playable cards! You must draw a card.`);
      question("Press Enter to draw a card...", { hideEchoBack: true });
      drawCards(player, 1);
      console.log(
        `You drew: ${cardPrinter(player.hand[player.hand.length - 1])}`
      );

      // check the new hand after drawing
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
