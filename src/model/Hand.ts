import { Card } from "./Card";

interface Player {
    hand: Card[];
    score: number;
}


interface PlayerHand {
    playCard: () => void;
    drawCard: () => void;
    checkForUNO: () => void;
    nextTurn: () => void;
    currentPlayer: Player
}