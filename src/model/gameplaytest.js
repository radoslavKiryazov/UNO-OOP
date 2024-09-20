"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var startGame = function () {
    var _a, _b;
    var players = [
        { name: "Michael", hand: [], score: 0 },
        { name: "Maisho", hand: [], score: 0 },
    ];
    var game = (0, Game_1.createGame)(players, 500);
    console.log("Starting a new game of UNO!");
    // Initialize the first hand
    game.startNewHand();
    while (!((_a = game.getCurrentHand()) === null || _a === void 0 ? void 0 : _a.isHandOver())) {
        (_b = game.getCurrentHand()) === null || _b === void 0 ? void 0 : _b.nextTurn();
    }
    console.log("Hand over!");
};
// Run the game simulation
startGame();
