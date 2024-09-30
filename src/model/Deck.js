"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeck = exports.colors = void 0;
var random_utils_1 = require("../utils/random_utils");
exports.colors = ["Red", "Blue", "Green", "Yellow"];
///helper functions
var addActionCards = function (preparedDeck, colour) {
    var actionCards = [
        { type: "SKIP", colour: colour },
        { type: "REVERSE", colour: colour },
        { type: "DRAWTWO", colour: colour },
    ];
    actionCards.forEach(function (card) {
        preparedDeck.push(card, __assign({}, card)); // Add two of each action card
    });
};
var addNumberedCards = function (preparedDeck, colour) {
    for (var i = 0; i <= 9; i++) {
        var newCard = { type: "NUMBERED", colour: colour, value: i };
        preparedDeck.push(newCard);
        if (i > 0)
            preparedDeck.push(__assign({}, newCard)); // Add two of each number except 0
    }
};
var addWildCards = function (preparedDeck) {
    for (var i = 0; i < 4; i++) {
        preparedDeck.push({ type: "WILD", colour: "None" });
        preparedDeck.push({ type: "WILDDRAWFOUR", colour: "None" });
    }
};
/**
 *   Create a new deck of UNO cards.
 */
var createDeck = function () {
    var preparedDeck = [];
    exports.colors.forEach(function (colour) {
        addNumberedCards(preparedDeck, colour);
        addActionCards(preparedDeck, colour);
    });
    addWildCards(preparedDeck);
    var shuffle = function () {
        console.log((0, random_utils_1.announce)("Shuffling the deck..."));
        (0, random_utils_1.standardShuffler)(preparedDeck);
    };
    var discardTopCard = function () { return preparedDeck.pop(); };
    var deal = function (numberOfCards) {
        var dealtCards = [];
        for (var i = 0; i < numberOfCards; i++) {
            var card = preparedDeck.pop();
            if (card)
                dealtCards.push(card);
        }
        return dealtCards;
    };
    var size = function () { return preparedDeck.length; };
    var addCards = function (newCards) {
        preparedDeck.push.apply(preparedDeck, newCards);
        shuffle();
    };
    console.log(size());
    return { shuffle: shuffle, deal: deal, preparedDeck: preparedDeck, size: size, discardTopCard: discardTopCard, addCards: addCards };
};
exports.createDeck = createDeck;
