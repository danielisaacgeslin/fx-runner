import { get } from 'lodash';
import { REF_PREFIX, REF_SUFFIX } from '../constants';
import { Options } from '../types';
import { prepareTermForReg } from './prepareTermForReg';

const safePrefix = prepareTermForReg(REF_PREFIX);
const safeSuffix = prepareTermForReg(REF_SUFFIX);

const indetifyReg = new RegExp(`${safePrefix}[^%]+${safeSuffix}`);
const indetifyExactReg = new RegExp(`^${safePrefix}[^%]+${safeSuffix}$`);
const splitReg = new RegExp(`(${safePrefix}.*?${safeSuffix})`);
const getRemoveReg = () => new RegExp(`^${safePrefix}|${safeSuffix}$`, 'g');

export const isRef = (str: string | any): boolean => {
  if (!str || typeof str !== 'string') return false;
  return indetifyReg.test(str);
};

export const interpolateRef = (str: string, payload?: Options['payload']) => {
  if (indetifyExactReg.test(str)) return get(payload, str.replace(getRemoveReg(), ''));
  return str
    .split(splitReg)
    .map(chunk => (isRef(chunk) ? get(payload, chunk.replace(getRemoveReg(), '')) : chunk))
    .join('');
};
