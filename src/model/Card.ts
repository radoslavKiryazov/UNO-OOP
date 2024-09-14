export type Colour =  'Red' | 'Blue' | 'Green' | 'Yellow' | 'Wild' | 'None'
//TODO shitty type refactor


type NumberedCard = {readonly type: 'NUMBERED', readonly value: number, readonly colour: Colour }
type SkipCard = {readonly type: 'SKIP', readonly colour: Colour }
type ReverseCard = {readonly type: 'REVERSE', readonly colour: Colour }
type DrawTwoCard = {readonly type: 'DRAWTWO', readonly colour: Colour }
type WildCard = {readonly type: 'WILD', readonly colour: Colour }
type WildDrawFour = {readonly type: 'WILDDRAWFOUR', readonly colour: Colour }

export type Card = NumberedCard | SkipCard | ReverseCard | DrawTwoCard | WildCard | WildDrawFour
export type CardType = Card['type']

