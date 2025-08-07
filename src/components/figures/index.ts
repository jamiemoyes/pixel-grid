import { headphones } from "./headphones";
// import { hey } from "./hey";
import { runner } from "./runner";

export const FIGURES = {
  runner,
  headphones,
} as const;

export const FIGURE_LIST = [runner, headphones] as const;

export type Figure = (typeof FIGURES)[keyof typeof FIGURES];
