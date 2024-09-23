"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardPrinter = void 0;
var cardPrinter = function (card, index) {
    var prefix = index !== undefined ? "[".concat(index, "] ") : "";
    // ANSI color codes for each UNO color
    var colorMap = {
        Red: "\x1b[31m",
        Blue: "\x1b[34m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Wild: "\x1b[35m",
        None: "\x1b[37m", // White text for no color
    };
    var reset = "\x1b[0m"; // Resets color back to default
    var color = colorMap[card.colour] || colorMap.None; // Default to white
    switch (card.type) {
        case "NUMBERED":
            return "".concat(color).concat(prefix, "A ").concat(card.colour, " ").concat(card.value).concat(reset);
        case "DRAWTWO":
        case "SKIP":
        case "REVERSE":
            return "".concat(color).concat(prefix, "A ").concat(card.colour, " ").concat(card.type).concat(reset);
        case "WILD":
            return "".concat(color).concat(prefix, "A WILD CARD").concat(reset);
        case "WILDDRAWFOUR":
            return "".concat(color).concat(prefix, "A WILD DRAW FOUR").concat(reset);
        default:
            return "".concat(color).concat(prefix, "Unknown card type").concat(reset);
    }
};
exports.cardPrinter = cardPrinter;
