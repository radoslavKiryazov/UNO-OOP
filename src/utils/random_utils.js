"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardShuffler = exports.standardRandomizer = void 0;
// Uniformly selected pseudo-random number
var standardRandomizer = function (n) { return Math.floor(Math.random() * n); };
exports.standardRandomizer = standardRandomizer;
// Perfect shuffle using the Fisher-Yates method
function standardShuffler(cards) {
    for (var i = 0; i < cards.length - 1; i++) {
        var j = Math.floor(Math.random() * (cards.length - i) + i);
        var temp = cards[j];
        cards[j] = cards[i];
        cards[i] = temp;
    }
}
exports.standardShuffler = standardShuffler;
