import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { styles } from './styles';
import { runFx } from '../../../main';
import { safeParse } from './safeParse';

const initialFx = '$capitalize($join($concat("there are",$multiply($divide(16, $add(1, $add(3, 4))), 2), "{{obj.fruitName}}"), " "))';

const initialPayload = JSON.stringify({ obj: { fruitName: 'apples' } }, null, 4);

function splitArgs(input) {
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
}

const parseFxFromStr = (input: string) => {
  const fxReg = /^(\$\w+)\((.*)\)$/;
  if (!fxReg.test(input?.trim())) return safeParse(input?.trim(), undefined);

  const [, operator, argStr] = input.trim().match(fxReg);
  const args = splitArgs(argStr);

  return { [operator?.trim()]: args?.map(a => parseFxFromStr(a)) };
};

export const FXInput = () => {
  const [fx, setFx] = useState<string>(initialFx);
  const [payload, setPayload] = useState<string>(initialPayload);

  const onFxChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => setFx(event.target.value), []);
  const onPayloadChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => setPayload(event.target.value), []);

  const parsedFx = useMemo(() => parseFxFromStr(fx), [fx]);
  const formattedFx = useMemo(() => (parsedFx ? JSON.stringify(parsedFx, null, 4) : ''), [parsedFx]);
  const parsedPayload = useMemo(() => safeParse(payload, null), [payload]);

  const result: string = useMemo(() => {
    if (!parsedFx) return;
    try {
      return JSON.stringify(runFx(parsedFx, { payload: parsedPayload }), null, 4);
    } catch {
      return undefined;
    }
  }, [parsedFx, parsedPayload]);

  return (
    <div css={styles.container}>
      <div css={styles.fxContainer}>
        <div>
          <p>Edit fx</p>
          <textarea onChange={onFxChange} value={fx} css={[styles.input, !!fx && !parsedFx && styles.error]} rows={10} />
        </div>
        <div>
          <p>Edit payload</p>
          <textarea onChange={onPayloadChange} value={payload} css={[styles.input, !!payload && !parsedPayload && styles.error]} rows={10} />
        </div>
      </div>
      <div css={styles.resultContainer}>
        <div css={styles.resultItem}>
          <p>Fx JSON</p>
          <pre css={styles.result}>{formattedFx}</pre>
        </div>
        <div css={styles.resultItem}>
          <p>Result</p>
          <pre css={styles.result}>{result}</pre>
        </div>
      </div>
    </div>
  );
};
