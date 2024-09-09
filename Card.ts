export type Colour =  'Red' | 'Blue' | 'Green' | 'Yellow' | 'Wild'

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
