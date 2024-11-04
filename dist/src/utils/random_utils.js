// Uniformly selected pseudo-random number
export const standardRandomizer = (n) => Math.floor(Math.random() * n);
// Perfect shuffle using the Fisher-Yates method
export function standardShuffler(cards) {
    for (let i = 0; i < cards.length - 1; i++) {
        const j = Math.floor(Math.random() * (cards.length - i) + i);
        const temp = cards[j];
        cards[j] = cards[i];
        cards[i] = temp;
    }
}
const cyan = "\x1b[36m";
const reset = "\x1b[0m";
export const announce = (message) => {
    return `${cyan}${message}${reset}`;
};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//# sourceMappingURL=random_utils.js.map