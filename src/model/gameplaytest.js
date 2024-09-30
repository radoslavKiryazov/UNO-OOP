"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var players = [
    { name: "Michael", hand: [], score: 0 },
    { name: "Maisho", hand: [], score: 0 },
];
var game = (0, Game_1.createGame)(players, 1);
game.playGame();
