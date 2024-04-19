import { FxKey, fxMap } from '../fxMap';
import { Evaluable } from '../types';
import { isObject } from './isObject';

export const getFxKey = (value: any): FxKey => {
  return Object.keys(value).find(k => !!fxMap[k]) as FxKey;
};

export const isEvaluable = (value: Evaluable): boolean => {
  if (isObject(value)) {
    const fxKey = getFxKey(value);
    return !!fxKey && Array.isArray(value[fxKey]);
  }
  return false;
};
