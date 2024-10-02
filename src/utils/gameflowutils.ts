import { question } from "readline-sync";
import { Player, createPlayer } from "../model/Player";

export const introduction = () => {
  console.log("Welcome to UNO");
  console.log("Reach 500 points to win the game.");
  question("\nPress Enter to start...");
};

export const playerCreation = () => {
  const players: Player[] = [];
  for (let i = 1; i <= 2; i++) {
    const playerName = question(`Enter name for Player ${i}: `);
    const player = createPlayer(playerName, []);
    players.push(player);
  }
  return players;
};
