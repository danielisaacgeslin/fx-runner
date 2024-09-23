export const styles = {
  container: `
    display: flex;
    flex-direction: column;
    padding: 15px;
    border: 2px solid #ffffff;
    border-radius: 5px;
    height: calc(100vh - 30px);
    overflow: hidden;
    gap: 15px;
  `,
  fxContainer: `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  `,
  resultContainer: `
    flex: 1;
    display: flex;
    gap: 15px;
    overflow: hidden;
  `,
  resultItem: `
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  input: `
    padding: 5px;
    outline: 0;
    width: 100%;
  `,
  error: `
    border: 2px solid red;
  `,
  result: `
    flex: 1;
    padding: 15px;
    overflow: auto;
  `
};
