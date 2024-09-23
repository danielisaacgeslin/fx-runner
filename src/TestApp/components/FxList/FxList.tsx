import { fxMap } from '../../../fxMap';
import { styles } from './styles';

const fxList = Object.keys(fxMap).sort((a, b) => a.localeCompare(b));

export const FxList = () => {
  return (
    <div css={styles.container}>
      <h3 css={styles.title}>Fx list ({fxList.length})</h3>
      <ul css={styles.list}>
        {fxList.map(key => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </div>
  );
};
