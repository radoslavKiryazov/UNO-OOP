import { Card } from "./Card";

export interface Player {
  readonly name: string;
  hand: Card[];
  score: number;
}

export const createPlayer = (name: string, hand: Card[]) => {
  return { name, hand, score: 0 };
};
