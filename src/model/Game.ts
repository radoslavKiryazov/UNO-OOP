import { Player } from "./Player";
import { Hand, createHand } from "./Hand";
import { question } from "readline-sync";

export type Game = {
  players: Player[];
  getCurrentHand: () => Hand | null;
  targetScore: number;
  startNewHand: () => void;
  updateScores: () => void;
  isGameOver: () => boolean;
  getWinner: () => Player | null;
  playGame: () => void;
};

export const createGame = (players: Player[], targetScore = 500): Game => {
  let currentHand: Hand | null = null;

  const startNewHand = (): void => {
    question("Press Enter to start a new hand...");

    console.log("\n--- A new hand begins! ---\n");
    currentHand = createHand(players);
    currentHand.nextTurn(); // Start the first player's turn
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

  const playGame = (): void => {
    console.log("\n--- The game begins! ---\n");

    while (!isGameOver()) {
      startNewHand();
      while (!currentHand?.isHandOver()) {
        // Loop until the hand is over
      }
      updateScores();
    }

    const winner = getWinner();
    if (winner) {
      console.log(`\n--- Game Over! ${winner.name} wins the game! ---\n`);
    }
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
    playGame,
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
          // assign point values for special cards
          totalPoints +=
            card.type === "WILD" || card.type === "WILDDRAWFOUR" ? 50 : 20;
        }
      });
    }
  });

  return totalPoints;
};
