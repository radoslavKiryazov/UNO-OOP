export const cardPrinter = (card, index) => {
    const prefix = index !== undefined ? `[${index}] ` : "";
    // ANSI color codes for each UNO color
    const colorMap = {
        Red: "\x1b[31m",
        Blue: "\x1b[34m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Wild: "\x1b[35m",
        None: "\x1b[37m", // White text for no color
    };
    const reset = "\x1b[0m"; // Resets color back to default
    const color = colorMap[card.colour] || colorMap.None; // Default to white
    switch (card.type) {
        case "NUMBERED":
            return `${color}${prefix}A ${card.colour} ${card.value}${reset}`;
        case "DRAWTWO":
        case "SKIP":
        case "REVERSE":
            return `${color}${prefix}A ${card.colour} ${card.type}${reset}`;
        case "WILD":
            return `${color}${prefix}A WILD CARD${reset}`;
        case "WILDDRAWFOUR":
            return `${color}${prefix}A WILD DRAW FOUR${reset}`;
        default:
            return `${color}${prefix}Unknown card type${reset}`;
    }
};
//# sourceMappingURL=Card.js.map