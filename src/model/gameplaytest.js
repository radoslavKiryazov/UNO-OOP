"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var startGame = function () {
    var _a, _b;
    var players = [
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
    var game = (0, Game_1.createGame)(players, 500);
    console.log("\nStarting a new game of UNO!");
    console.log("Players in the game:");
    game.players.forEach(function (player) { return console.log(player.name); });
    // Initialize the first hand
    game.startNewHand();
    while (!((_a = game.getCurrentHand()) === null || _a === void 0 ? void 0 : _a.isHandOver())) {
        (_b = game.getCurrentHand()) === null || _b === void 0 ? void 0 : _b.nextTurn();
    }
    console.log("Hand over!");
};
// Run the game simulation
startGame();
