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
exports.createHand = void 0;
var Card_1 = require("./Card");
var Deck_1 = require("./Deck");
var readline_sync_1 = require("readline-sync");
/**
 * Creates and initializes a new hand with the given players.
 */
var createHand = function (players) {
    var deck = (0, Deck_1.createDeck)();
    deck.shuffle();
    var discardPile = [];
    var currentTopCard;
    do {
        currentTopCard = deck.deal(1)[0];
        discardPile.push(currentTopCard);
    } while (currentTopCard.type !== "NUMBERED");
    console.log("Dealing 7 cards to each player...\n");
    players.forEach(function (player) {
        player.hand = deck.deal(7);
    });
    var currentTurnIndex = 0;
    var playCard = function (selectedCardIndex) {
        var player = players[currentTurnIndex]; // get the current player
        var hand = player.hand;
        var selectedCard = hand[selectedCardIndex - 1]; // -1 because the index is 1 based
        console.log("Selected card:", selectedCard);
        if (canPlayCard(selectedCard)) {
            player.hand =
                hand.findIndex(function (c) { return c === selectedCard; }) !== -1
                    ? hand.filter(function (c) { return c !== selectedCard; })
                    : hand;
            switch (selectedCard.type) {
                case "NUMBERED": {
                    console.log("Card that was played:", (0, Card_1.cardPrinter)(selectedCard));
                    currentTurnIndex = (currentTurnIndex + 1) % players.length;
                    break;
                }
                case "SKIP": {
                    console.log("".concat(player.name, " played a Skip!"));
                    currentTurnIndex = (currentTurnIndex + 2) % players.length;
                }
                case "REVERSE": {
                    players.reverse();
                    console.log("Order of play has been reversed!");
                    currentTurnIndex = (currentTurnIndex + 1) % players.length;
                    break;
                }
                case "DRAWTWO": {
                    console.log("".concat(player.name, " played a Draw Two!"));
                    var nextPlayer = players[(currentTurnIndex + 1) % players.length];
                    currentTurnIndex = (currentTurnIndex + 2) % players.length;
                    console.log("".concat(nextPlayer.name, " must draw two cards!"));
                    drawCards(nextPlayer, 2);
                    console.log("\n            ".concat(nextPlayer.name, " has drawn two cards and their turn is skipped!\n          "));
                    break;
                }
                case "WILD": {
                    var newColour = selectColour();
                    console.log("You selected ".concat(newColour, "!"));
                    selectedCard = __assign(__assign({}, selectedCard), { colour: newColour });
                    currentTurnIndex = (currentTurnIndex + 1) % players.length;
                    break;
                }
                case "WILDDRAWFOUR": {
                    var newColour = selectColour();
                    console.log("You selected ".concat(newColour, "!"));
                    var nextPlayer = players[(currentTurnIndex + 1) % players.length];
                    console.log("".concat(nextPlayer.name, " must draw four cards!"));
                    drawCards(nextPlayer, 4);
                    console.log("".concat(nextPlayer.name, "'s turn is skipped!"));
                    selectedCard = __assign(__assign({}, selectedCard), { colour: newColour });
                    currentTurnIndex = (currentTurnIndex + 2) % players.length;
                    break;
                }
            }
            discardPile.push(selectedCard);
            checkForUNO(player);
            if (isHandOver()) {
                endHand();
                return;
            }
            console.clear();
            nextTurn();
        }
        else {
            console.log("Invalid card. Try again.");
            selectCardToPlay(currentTurnIndex);
        }
    };
    var selectCardToPlay = function (playerIndex) {
        var player = players[playerIndex];
        var hand = player.hand;
        console.log("\n".concat(player.name, ", it's your turn!"));
        printPlayersHand(hand);
        var isThereAPlayableCard = hand.some(function (card) { return canPlayCard(card); });
        if (!isThereAPlayableCard) {
            forceDrawUntilPlayable(hand, player);
        }
        var input;
        do {
            input = (0, readline_sync_1.questionInt)("Select a card index to play (1-".concat(hand.length, "): "));
            if (input < 1 || input > hand.length) {
                console.log("\u001B[1mInvalid input. Please select a number between 1 and ".concat(hand.length, ".\u001B[0m"));
            }
        } while (input < 1 || input > hand.length);
        playCard(input);
    };
    var drawCards = function (player, numberOfCards) {
        for (var i = 0; i < numberOfCards; i++) {
            var card = deck.deal(1)[0];
            if (card) {
                player.hand.push(card);
            }
        }
    };
    var canPlayCard = function (card) {
        var topCardFromDiscardPile = discardPile[discardPile.length - 1];
        return (
        // match by color
        card.colour === topCardFromDiscardPile.colour ||
            // match by number
            (card.type === "NUMBERED" &&
                topCardFromDiscardPile.type === "NUMBERED" &&
                card.value === topCardFromDiscardPile.value) ||
            // match by action/symbol
            (["REVERSE", "SKIP", "DRAWTWO"].includes(card.type) &&
                card.type === topCardFromDiscardPile.type) ||
            // wild and wild draw four can be played anytime
            card.type === "WILD" ||
            card.type === "WILDDRAWFOUR");
    };
    var nextTurn = function () {
        selectCardToPlay(currentTurnIndex);
    };
    var checkForUNO = function (player) {
        if (player.hand.length !== 1)
            return; //evac
        var duration = 5;
        var calledUno = false;
        var interval = setInterval(function () {
            console.log("UNO! ".concat(duration, " seconds remaining..."));
            duration--;
        }, 1000);
        console.log("UNO!");
        var unoPrompt = function () {
            var input = (0, readline_sync_1.question)("Type 'UNO' and press Enter to call UNO: "); // AW FUCK OFF THIS SHIT IS BLOCKING
            if (input.trim().toUpperCase() === "UNO") {
                calledUno = true;
                clearInterval(interval);
                console.log("".concat(player.name, " successfully called UNO!"));
            }
        };
        unoPrompt();
        if (!calledUno) {
            clearInterval(interval);
            console.log("\n        ".concat(player.name, " failed to call UNO in time! Drawing 4 cards as a penalty.\n      "));
            drawCards(player, 4);
        }
    };
    var endHand = function () {
        var winner = players.find(function (player) { return player.hand.length === 0; }) || null;
        if (winner) {
            console.log("".concat(winner.name, " won the hand!"));
        }
    };
    var isHandOver = function () {
        return players.some(function (player) { return player.hand.length === 0; });
    };
    var handleCardEffects = function (card) { };
    //helpers
    var selectColour = function () {
        console.log("\nPlease choose a colour for the Wild Card!");
        console.log("\u001B[31m [1] Red");
        console.log("\x1b[34m [2] Blue");
        console.log("\x1b[32m [3] Green");
        console.log("\x1b[33m [4] Yellow");
        var input = (0, readline_sync_1.questionInt)("\x1b[35m Enter the number corresponding to your choice: \x1b[37m");
        switch (input) {
            case 1:
                return "Red";
            case 2:
                return "Blue";
            case 3:
                return "Green";
            case 4:
                return "Yellow";
            default:
                return "Blue";
        }
    };
    var forceDrawUntilPlayable = function (hand, player) {
        var isPlayable = hand.some(function (card) { return canPlayCard(card); });
        while (!isPlayable) {
            console.log("".concat(player.name, ", no playable cards! You must draw a card."));
            (0, readline_sync_1.question)("Press Enter to draw a card...", { hideEchoBack: true });
            drawCards(player, 1);
            console.log("\n        \nYou drew: ".concat((0, Card_1.cardPrinter)(player.hand[player.hand.length - 1]), "\n      "));
            // check the new hand after drawing
            isPlayable = player.hand.some(function (card) { return canPlayCard(card); });
            printPlayersHand(hand);
        }
    };
    var printPlayersHand = function (hand) {
        console.log("Top card on the discard pile: ".concat((0, Card_1.cardPrinter)(discardPile[discardPile.length - 1]), "\n    ")); //print out the top card here so the player has a reference to what can be played
        console.log("\nYour hand [".concat(hand.length, "]: =>"));
        hand.forEach(function (card, index) {
            console.log((0, Card_1.cardPrinter)(card, index + 1));
        });
    };
    return {
        checkForUNO: checkForUNO,
        playCard: playCard,
        drawCards: drawCards,
        nextTurn: nextTurn,
        discardPile: discardPile,
        currentTurnIndex: currentTurnIndex,
        endHand: endHand,
        isHandOver: isHandOver,
    };
};
exports.createHand = createHand;
//todo: fix the deck so that it doesn't run out of cards
