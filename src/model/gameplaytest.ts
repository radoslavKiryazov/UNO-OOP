import { createGame } from "./Game";
import { introduction } from "../utils/gameflowutils";
import { playerCreation } from "../utils/gameflowutils";

introduction();
const players = playerCreation();
const game = createGame(players, 500);
game.playGame();
