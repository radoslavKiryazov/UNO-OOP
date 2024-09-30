"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = void 0;
var Hand_1 = require("./Hand");
var readline_sync_1 = require("readline-sync");
var createGame = function (players, targetScore) {
    if (targetScore === void 0) { targetScore = 500; }
    var currentHand = null;
    var startNewHand = function () {
        (0, readline_sync_1.question)("Press Enter to start a new hand...");
        console.log("\n--- A new hand begins! ---\n");
        currentHand = (0, Hand_1.createHand)(players);
        currentHand.nextTurn(); // Start the first player's turn
    };
    var updateScores = function () {
        var handWinner = players.find(function (player) { return player.hand.length === 0; });
        if (handWinner) {
            var points = pointCalculator(players, handWinner);
            handWinner.score += points;
            console.log("".concat(handWinner.name, " wins the hand and earns ").concat(points, " points!"));
            console.log("Current scores: ".concat(players
                .map(function (p) { return "".concat(p.name, ": ").concat(p.score); })
                .join(", ")));
        }
    };
    var isGameOver = function () {
        return players.some(function (player) { return player.score >= targetScore; });
    };
    var getWinner = function () {
        return players.find(function (player) { return player.score >= targetScore; }) || null;
    };
    var playGame = function () {
        console.log("\n--- The game begins! ---\n");
        while (!isGameOver()) {
            startNewHand();
            while (!(currentHand === null || currentHand === void 0 ? void 0 : currentHand.isHandOver())) {
                // Loop until the hand is over
            }
            updateScores();
        }
        var winner = getWinner();
        if (winner) {
            console.log("\n--- Game Over! ".concat(winner.name, " wins the game! ---\n"));
        }
    };
    var getCurrentHand = function () {
        return currentHand;
    };
    return {
        players: players,
        getCurrentHand: getCurrentHand,
        targetScore: targetScore,
        startNewHand: startNewHand,
        updateScores: updateScores,
        isGameOver: isGameOver,
        getWinner: getWinner,
        playGame: playGame,
    };
};
exports.createGame = createGame;
var pointCalculator = function (players, winner) {
    var totalPoints = 0;
    players.forEach(function (player) {
        if (player !== winner) {
            player.hand.forEach(function (card) {
                if (card.type === "NUMBERED") {
                    totalPoints += card.value || 0;
                }
                else {
                    // assign point values for special cards
                    totalPoints +=
                        card.type === "WILD" || card.type === "WILDDRAWFOUR" ? 50 : 20;
                }
            });
        }
    });
    return totalPoints;
};
