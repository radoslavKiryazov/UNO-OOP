"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeck = exports.colors = void 0;
var random_utils_1 = require("../utils/random_utils");
exports.colors = ["Red", "Blue", "Green", "Yellow"];
var createDeck = function () {
    var preparedDeck = [];
    exports.colors.forEach(function (colour) {
        for (var i = 0; i <= 9; i++) {
            var newCard = { type: "NUMBERED", colour: colour, value: i };
            preparedDeck.push(newCard);
            if (i > 0)
                preparedDeck.push({ type: "NUMBERED", colour: colour, value: i });
        }
        var skipCard = { type: "SKIP", colour: colour };
        var reverseCard = { type: "REVERSE", colour: colour };
        var drawTwoCard = { type: "DRAWTWO", colour: colour };
        //todo: reeeeeeeeeeeefactor adding the cards
        preparedDeck.push(skipCard);
        preparedDeck.push(skipCard);
        preparedDeck.push(reverseCard);
        preparedDeck.push(reverseCard);
        preparedDeck.push(drawTwoCard);
        preparedDeck.push(drawTwoCard);
    });
    for (var i = 0; i < 4; i++) {
        preparedDeck.push({ type: "WILD", colour: "None" });
        preparedDeck.push({ type: "WILDDRAWFOUR", colour: "None" });
    }
    var shuffle = function () {
        console.log((0, random_utils_1.announce)("Shuffling the deck..."));
        return (0, random_utils_1.standardShuffler)(preparedDeck);
    };
    var discardTopCard = function () {
        return preparedDeck.pop();
    };
    var deal = function (numberOfCards) {
        var dealtCards = [];
        for (var i = 0; i < numberOfCards; i++) {
            if (preparedDeck.length === 0)
                break; // Stop if deck is empty
            var card = preparedDeck.pop();
            if (card)
                dealtCards.push(card);
        }
        return dealtCards;
    };
    var size = function () {
        return preparedDeck.length;
    };
    return { shuffle: shuffle, deal: deal, preparedDeck: preparedDeck, size: size, discardTopCard: discardTopCard };
};
exports.createDeck = createDeck;
// const deck = createDeck();
// console.log(deck.preparedDeck);
// deck.shuffle();
// console.log('shuffled ',deck.preparedDeck);
// // cards to discard pile
// const cardsDrawn = deck.deal(5);
// console.log(deck.size())
// console.log(cardsDrawn);
