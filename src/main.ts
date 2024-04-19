import { fxMap } from './fxMap';
import { Evaluable, Options } from './types';
import { getFxKey, isEvaluable } from './utils/isEvaluable';
import { isObject } from './utils/isObject';
import { interpolateRef, isRef } from './utils/refHandlers';

export const runFx = (evaluable: Evaluable, options?: Options) => {
  const safeOptions = { ...(options || {}), payload: { ...(isObject(options?.payload) ? options.payload : {}) } };
  return runFxInternal(evaluable, safeOptions);
};

const runFxInternal = (evaluable: Evaluable, options: Options) => {
  if (isRef(evaluable)) return interpolateRef(evaluable, options.payload);
  if (isEvaluable(evaluable)) {
    const fxKey = getFxKey(evaluable);
    const fx: Function = fxMap[fxKey];
    const args = evaluable[fxKey].map((arg: Evaluable) => runFxInternal(arg, options));
    return fx(...args);
  }
  if (isObject(evaluable)) return Object.fromEntries(Object.entries(evaluable).map(([k, v]) => [k, runFxInternal(v, options)]));
  if (Array.isArray(evaluable)) return evaluable.map(v => runFxInternal(v, options));
  return evaluable;
};
