"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var gameflowutils_1 = require("../utils/gameflowutils");
var gameflowutils_2 = require("../utils/gameflowutils");
(0, gameflowutils_1.introduction)();
var players = (0, gameflowutils_2.playerCreation)();
var game = (0, Game_1.createGame)(players, 500);
game.playGame();
