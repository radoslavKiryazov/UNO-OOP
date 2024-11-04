import { createHand } from "./Hand";
import { question } from "readline-sync";
export const createGame = (players, targetScore = 500) => {
    let currentHand = null;
    const startNewHand = () => {
        question("Press Enter to start a new hand...");
        console.log("\n--- A new hand begins! ---\n");
        currentHand = createHand(players);
        currentHand.nextTurn();
    };
    const updateScores = () => {
        const handWinner = players.find((player) => player.hand.length === 0);
        if (handWinner) {
            const points = pointCalculator(players, handWinner);
            handWinner.score += points;
            console.log(`${handWinner.name} wins the hand and earns ${points} points!`);
            console.log(`Current scores: ${players
                .map((p) => `${p.name}: ${p.score}`)
                .join(", ")}`);
        }
    };
    const isGameOver = () => {
        return players.some((player) => player.score >= targetScore);
    };
    const getWinner = () => {
        return players.find((player) => player.score >= targetScore) || null;
    };
    const playGame = () => {
        console.log("\n--- The game begins! ---\n");
        while (!isGameOver()) {
            startNewHand();
            while (!currentHand?.isHandOver()) { }
            updateScores();
        }
        const winner = getWinner();
        if (winner) {
            console.log(`\n--- Game Over! ${winner.name} wins the game! ---\n`);
        }
    };
    const getCurrentHand = () => {
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
const pointCalculator = (players, winner) => {
    let totalPoints = 0;
    players.forEach((player) => {
        if (player !== winner) {
            player.hand.forEach((card) => {
                if (card.type === "NUMBERED") {
                    totalPoints += card.value || 0;
                }
                else {
                    // assign point values for special cards
                    totalPoints +=
                        card.type === "WILD" || card.type === "WILDDRAWFOUR" ? 50 : 20;
                }
            });
        }
    });
    return totalPoints;
};
//# sourceMappingURL=Game.js.map