import { Player, createPlayer } from "./Player";
import { Hand, createHand } from "./Hand";
import { createDeck } from "./Deck";

export type Game = {
  players: Player[];
  getCurrentHand: () => Hand | null;
  targetScore: number;
  startNewHand: () => void;
  updateScores: () => void;
  isGameOver: () => boolean;
  getWinner: () => Player | null;
};

export const createGame = (players: Player[], targetScore = 500): Game => {
  let currentHand: Hand | null = null;

  const startNewHand = (): void => {
    console.log("\n--- A new hand begins! ---");
    currentHand = createHand(players);
    console.log(currentHand.discardPile);
  };

  const updateScores = () => {
    const handWinner = players.find((player) => player.hand.length === 0);
    if (handWinner) {
      const points = pointCalculator(players, handWinner);
      handWinner.score += points;
      console.log(
        `${handWinner.name} wins the hand and earns ${points} points!`
      );
      console.log(
        `Current scores: ${players
          .map((p) => `${p.name}: ${p.score}`)
          .join(", ")}`
      );
    }
  };
  const isGameOver = (): boolean => {
    return players.some((player) => player.score >= targetScore);
  };

  const getWinner = (): Player | null => {
    return players.find((player) => player.score >= targetScore) || null;
  };
  const getCurrentHand = (): Hand | null => {
    return currentHand;
  };
  return {
    players,
    getCurrentHand,
    targetScore,
    startNewHand,
    updateScores,
    isGameOver,
    getWinner,
  };
};

const pointCalculator = (players: Player[], winner: Player): number => {
  let totalPoints = 0;

  players.forEach((player) => {
    if (player !== winner) {
      player.hand.forEach((card) => {
        if (card.type === "NUMBERED") {
          totalPoints += card.value || 0;
        } else {
          // Assign point values for special cards
          totalPoints +=
            card.type === "WILD" || card.type === "WILDDRAWFOUR" ? 50 : 20;
        }
      });
    }
  });

  return totalPoints;
};
