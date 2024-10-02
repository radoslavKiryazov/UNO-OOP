"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerCreation = exports.introduction = void 0;
var readline_sync_1 = require("readline-sync");
var Player_1 = require("../model/Player");
var introduction = function () {
    console.log("Welcome to UNO");
    console.log("Reach 500 points to win the game.");
    (0, readline_sync_1.question)("\nPress Enter to start...");
};
exports.introduction = introduction;
var playerCreation = function () {
    var players = [];
    for (var i = 1; i <= 2; i++) {
        var playerName = (0, readline_sync_1.question)("Enter name for Player ".concat(i, ": "));
        var player = (0, Player_1.createPlayer)(playerName, []);
        players.push(player);
    }
    return players;
};
exports.playerCreation = playerCreation;
