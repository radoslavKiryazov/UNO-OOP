export type Colour = "Red" | "Blue" | "Green" | "Yellow" | "Wild" | "None";
//TODO shitty type refactor

type NumberedCard = {
  readonly type: "NUMBERED";
  readonly value: number;
  readonly colour: Colour;
};
type SkipCard = { readonly type: "SKIP"; readonly colour: Colour };
type ReverseCard = { readonly type: "REVERSE"; readonly colour: Colour };
type DrawTwoCard = { readonly type: "DRAWTWO"; readonly colour: Colour };
type WildCard = { readonly type: "WILD"; readonly colour: Colour };
type WildDrawFour = { readonly type: "WILDDRAWFOUR"; readonly colour: Colour };

export type Card =
  | NumberedCard
  | SkipCard
  | ReverseCard
  | DrawTwoCard
  | WildCard
  | WildDrawFour;
export type CardType = Card["type"];

export const cardPrinter = (card: Card, index?: number): string => {
  const prefix = index !== undefined ? `[${index}] ` : "";

  // ANSI color codes for each UNO color
  const colorMap: { [key in Colour]: string } = {
    Red: "\x1b[31m", // Red text
    Blue: "\x1b[34m", // Blue text
    Green: "\x1b[32m", // Green text
    Yellow: "\x1b[33m", // Yellow text
    Wild: "\x1b[35m", // Purple color fo announcer
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
