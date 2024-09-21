import { question } from "readline-sync";
import { createGame, Game } from "./Game";
import { Player } from "./Player";

const startGame = () => {
  const players: Player[] = [
    { name: "Michael", hand: [], score: 0 },
    { name: "Maisho", hand: [], score: 0 },
  ];

  // console.log("Welcome to UNO!");
  // const player1: string = question("Enter the name of player 1: ");
  // const player2: string = question("Enter the name of player 2: ");
  // const players: Player[] = [
  //   { name: player1, hand: [], score: 0 },
  //   { name: player2, hand: [], score: 0 },
  // ];

  const game = createGame(players, 500);
  console.log("\nStarting a new game of UNO!");

  console.log("Players in the game:");
  game.players.forEach((player) => console.log(player.name));

  // Initialize the first hand
  game.startNewHand();
  while (!game.getCurrentHand()?.isHandOver()) {
    game.getCurrentHand()?.nextTurn();
  }
  console.log("Hand over!");
};

// Run the game simulation
startGame();
