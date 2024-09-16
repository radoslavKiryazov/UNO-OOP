import { createGame, Game } from "./Game";
import { questionInt } from "readline-sync";
import { Player } from "./Player";

const startGame = () => {
  const players: Player[] = [
    { name: "Michael", hand: [], score: 0 },
    { name: "Maisho", hand: [], score: 0 },
  ];

  const game = createGame(players, 500);
  console.log("Starting a new game of UNO!");

  // Initialize the first hand
  game.startNewHand();
  while (!game.getCurrentHand()?.isHandOver()) {
    game.getCurrentHand()?.nextTurn();
  }
  console.log("Hand over!");
};

// Run the game simulation
startGame();
