import { FX_PREFIX } from './constants';

export const fxMap = {
  [`${FX_PREFIX}add`]: (...args: number[]): number => args.reduce((t, c) => t + c, 0),
  [`${FX_PREFIX}join`]: (...args: string[]): string => args.join('')
};

export type FxKey = keyof typeof fxMap;
