import { safeParse } from './safeParse';

const splitArgs = (input: string) => {
  let results = [];
  let current = '';
  let balance = 0;

  for (const char of input) {
    if (char === '(') balance++;
    else if (char === ')') balance--;

    if (char === ',' && balance === 0) {
      results = [...results, current.trim()];
      current = '';
    } else current = `${current}${char}`;
  }

  if (current) results = [...results, current.trim()];

  return results;
};

/** @todo this is very fault. missing coverage for a lot of cases */
export const getFxFromStr = (input: string) => {
  try {
    const fxReg = /^(\$\w+)\((.*)\)$/;
    if (!fxReg.test(input?.trim())) return safeParse(input?.trim(), undefined);

    const [, operator, argStr] = input.trim().match(fxReg);

    const args = splitArgs(argStr);

    return { [operator?.trim()]: args?.map(a => getFxFromStr(a)) };
  } catch (e) {
    console.error('error parsing', e);
    return input;
  }
};
