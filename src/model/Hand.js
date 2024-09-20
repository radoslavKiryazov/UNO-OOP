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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHand = void 0;
var Card_1 = require("./Card");
var Deck_1 = require("./Deck");
var readline_sync_1 = require("readline-sync");
var createHand = function (players) {
    //start the hand
    var deck = (0, Deck_1.createDeck)();
    deck.shuffle();
    console.log("Dealing 7 cards to each player...\n");
    players.forEach(function (player) {
        player.hand = deck.deal(7);
    });
    var discardPile = [deck.discardTopCard()];
    var currentTurnIndex = 0;
    var playCard = function (selectedCard, hand) { return __awaiter(void 0, void 0, void 0, function () {
        var player, newColour, nextPlayer;
        return __generator(this, function (_a) {
            player = players[currentTurnIndex];
            if (canPlayCard(selectedCard)) {
                if (selectedCard.type === "WILD" ||
                    selectedCard.type === "WILDDRAWFOUR") {
                    newColour = selectColour();
                    console.log("You selected ".concat(newColour, "!"));
                    player.hand = hand.filter(function (c) { return c !== selectedCard; });
                    selectedCard = __assign(__assign({}, selectedCard), { colour: newColour });
                    discardPile.push(selectedCard);
                    currentTurnIndex = (currentTurnIndex + 1) % players.length;
                }
                if (selectedCard.type === "DRAWTWO") {
                    console.log("".concat(player.name, " played a Draw Two!"));
                    player.hand = hand.filter(function (c) { return c !== selectedCard; });
                    discardPile.push(selectedCard);
                    nextPlayer = players[currentTurnIndex + 1 % players.length];
                    currentTurnIndex = (currentTurnIndex + 2) % players.length;
                    console.log('currentTurnIndex', currentTurnIndex);
                    console.log('currentPlayer', player);
                    console.log('nextPlayer', nextPlayer);
                    console.log("".concat(nextPlayer.name, " must draw two cards!"));
                    drawCards(nextPlayer, 2);
                    console.log("".concat(nextPlayer.name, " has drawn two cards and their turn is skipped!"));
                }
                if (selectedCard.type === "SKIP") {
                    console.log("".concat(player.name, " played a Skip!"));
                    player.hand = hand.filter(function (c) { return c !== selectedCard; });
                    discardPile.push(selectedCard);
                    currentTurnIndex = (currentTurnIndex + 2) % players.length;
                }
                if (selectedCard.type === "REVERSE") {
                    //todo
                }
                if (selectedCard.type === "NUMBERED") {
                    discardPile.push(selectedCard);
                    player.hand = hand.filter(function (c) { return c !== selectedCard; });
                    console.log("Card that was played:", (0, Card_1.cardPrinter)(selectedCard));
                    currentTurnIndex = (currentTurnIndex + 1) % players.length;
                }
                nextTurn();
            }
            else {
                console.log("Invalid card. Try again.");
                selectCardToPlay(currentTurnIndex);
            }
            return [2 /*return*/];
        });
    }); };
    var selectCardToPlay = function (playerIndex) {
        var player = players[playerIndex];
        var hand = player.hand;
        console.log("".concat(player.name, ", it's your turn!\n"));
        console.log("Top card on the discard pile: ".concat((0, Card_1.cardPrinter)(discardPile[discardPile.length - 1])));
        printPlayersHand(hand);
        var isThereAPlayableCard = hand.some(function (card) { return canPlayCard(card); });
        if (!isThereAPlayableCard) {
            forceDrawUntilPlayable(hand, player);
        }
        var input = (0, readline_sync_1.questionInt)("Select a card index to play: ");
        var card = hand[input - 1];
        playCard(card, hand);
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
        return (card.colour === topCardFromDiscardPile.colour ||
            card.type === "WILD" ||
            card.type === "WILDDRAWFOUR" ||
            (card.type === "NUMBERED" &&
                topCardFromDiscardPile.type === "NUMBERED" &&
                card.value === topCardFromDiscardPile.value));
    };
    var nextTurn = function () {
        //currentTurnIndex = (currentTurnIndex + 1) % players.length;
        selectCardToPlay(currentTurnIndex);
    };
    var checkForUNO = function (playerIndex) {
        var player = players[playerIndex];
        if (player.hand.length === 1) {
            console.log("".concat(player.name, " calls UNO!"));
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
    //helpers
    var selectColour = function () {
        console.log("Please choose a colour for the Wild Card!");
        console.log("[1] Red");
        console.log("[2] Blue");
        console.log("[3] Green");
        console.log("[4] Yellow");
        var input = (0, readline_sync_1.questionInt)("Enter the number corresponding to your choice: ");
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
            drawCards(player, 1);
            console.log("You drew: ".concat((0, Card_1.cardPrinter)(player.hand[player.hand.length - 1])));
            // Check the new hand after drawing
            isPlayable = player.hand.some(function (card) { return canPlayCard(card); });
            printPlayersHand(hand);
        }
    };
    var printPlayersHand = function (hand) {
        console.log("Your hand: =>");
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
