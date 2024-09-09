"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardPrinter = void 0;
var cardPrinter = function (card) {
    var colors = {
        'Red': '\x1b[31m',
        'Blue': '\x1b[34m',
        'Green': '\x1b[32m',
        'Yellow': '\x1b[33m',
        'Wildcard': '\x1b[35m', // Wildcards in Magenta (or any distinct color)
    };
    var colorCode = colors[card.colour] || colors['Wildcard'];
    // Print the card with the correct color, and reset formatting at the end
    console.log("".concat(colorCode, "%s\u001B[0m"), card);
};
exports.cardPrinter = cardPrinter;
