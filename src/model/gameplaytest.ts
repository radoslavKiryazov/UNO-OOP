import { Player } from "./Player";
import { createGame } from "./Game";

const players: Player[] = [
  { name: "Michael", hand: [], score: 0 },
  { name: "Maisho", hand: [], score: 0 },
];
const game = createGame(players, 1);
game.playGame();
