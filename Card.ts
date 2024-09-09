export type Colour =  'Red' | 'Blue' | 'Green' | 'Yellow' | 'Wild'
//TODO shitty type refactor
export type CardType = 
  | { type: 'Number'; value: number }  
  | { type: 'Skip' }                      
  | { type: 'Reverse' }                   
  | { type: 'DrawTwo' }                   
  | { type: 'Wild' } 
  
  
export interface Card { 
    colour: Colour,
    type: CardType,
}

export const cardPrinter = (card: Card) => {
  const colors = {
    'Red': '\x1b[31m',    // Red
    'Blue': '\x1b[34m',   // Blue
    'Green': '\x1b[32m',  // Green
    'Yellow': '\x1b[33m', // Yellow
    'Wildcard': '\x1b[35m', // Magenta
  };

  const colorCode = colors[card.colour] || colors['Wildcard'];

  console.log(`${colorCode}%s\x1b[0m`, card);
}
