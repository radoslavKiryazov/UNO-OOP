"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = void 0;
var Hand_1 = require("./Hand");
var createGame = function (players, targetScore) {
    if (targetScore === void 0) { targetScore = 500; }
    var currentHand = null;
    var startNewHand = function () {
        console.log("\n--- A new hand begins! ---\n");
        currentHand = (0, Hand_1.createHand)(players);
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
                    // Assign point values for special cards
                    totalPoints +=
                        card.type === "WILD" || card.type === "WILDDRAWFOUR" ? 50 : 20;
                }
            });
        }
    });
    return totalPoints;
};
