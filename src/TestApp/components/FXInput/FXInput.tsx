import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { styles } from './styles';
import { runFx } from '../../../main';
import { safeParse } from './safeParse';

const initialFx =
  '{"hardcoded":1,"simpleRef":"{{obj.str}}","complexRef":"one ref: {{obj.str}}. then another ref: {{obj.num}}.","simpleFx":{"$fx_add":[2,2]},"refFx":{"$fx_add":[2,"{{obj.num}}"]},"nestedFx":{"$fx_add":[{"$fx_add":[2,2]},2]},"obj":{"strFx":{"$fx_join":[["a name:","{{obj.str}}"]," "]},"mathFx":{"$fx_add":[5,"{{obj.num}}"]}},"equal":{"$fx_isEqual":[{"a":1},{"a":1}]},"notEqual":{"$fx_isEqual":[{"a":1},{"a":1,"b":3}]},"refToObj":"{{obj}}","refToFx":"{{obj.fx}}"}';

const initialPayload = '{"obj":{"str":"a string","num":100,"fx":{"$fx_add":[1,1]}}}';

export const FXInput = () => {
  const [fx, setFx] = useState<string>(initialFx);
  const [payload, setPayload] = useState<string>(initialPayload);

  const onFxChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => setFx(event.target.value), []);
  const onPayloadChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => setPayload(event.target.value), []);

  const parsedFx = useMemo(() => safeParse(fx, null), [fx]);
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
          <p>Fx</p>
          <textarea onChange={onFxChange} value={fx} css={[styles.input, !!fx && !parsedFx && styles.error]} rows={10} />
        </div>
        <div>
          <p>Payload</p>
          <textarea onChange={onPayloadChange} value={payload} css={[styles.input, !!payload && !parsedPayload && styles.error]} rows={10} />
        </div>
      </div>
      <div>
        <p>Result</p>
        <pre css={styles.result}>{result}</pre>
      </div>
    </div>
  );
};
