import { fxMap } from './fxMap';
import { Evaluable, Options } from './types';
import { getFxKey, isEvaluable } from './utils/isEvaluable';
import { isObject } from './utils/isObject';
import { interpolateRef, isRef } from './utils/refHandlers';

export const runFx = (evaluable: Evaluable, options?: Options) => {
  const payload = isObject(options?.payload) ? options.payload : {};
  if (isRef(evaluable)) return interpolateRef(evaluable, payload);
  if (isEvaluable(evaluable)) {
    const fxKey = getFxKey(evaluable);
    const fx: Function = fxMap[fxKey];
    const args = evaluable[fxKey].map((arg: Evaluable) => runFx(arg, options));
    return fx(...args);
  }
  if (isObject(evaluable)) return Object.fromEntries(Object.entries(evaluable).map(([k, v]) => [k, runFx(v, options)]));
  if (Array.isArray(evaluable)) return evaluable.map(v => runFx(v, options));
  return evaluable;
};
