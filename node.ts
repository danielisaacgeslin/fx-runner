import { runFx } from './src/main';

const evaluable = {
  hardcoded: 1,
  simpleRef: '{{obj.str}}',
  complexRef: 'one ref: {{obj.str}}. then another ref: {{obj.num}}.',
  simpleFx: { $fx_add: [2, 2] },
  refFx: { $fx_add: [2, '{{obj.num}}'] },
  nestedFx: { $fx_add: [{ $fx_add: [2, 2] }, 2] }
};
const payload = { obj: { str: 'a string', num: 100 } };

console.log(runFx(evaluable, { payload }));
