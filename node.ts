import { runFx } from './src/main';

const evaluable = {
  hardcoded: 1,
  simpleRef: '{{obj.str}}',
  complexRef: 'one ref: {{obj.str}}. then another ref: {{obj.num}}.',
  simpleFx: { $fx_add: [2, 2] },
  refFx: { $fx_add: [2, '{{obj.num}}'] },
  nestedFx: { $fx_add: [{ $fx_add: [2, 2] }, 2] },
  obj: { strFx: { $fx_join: [['a name:', '{{obj.str}}'], ' '] }, mathFx: { $fx_add: [5, '{{obj.num}}'] } },
  equal: { $fx_isEqual: [{ a: 1 }, { a: 1 }] },
  notEqual: { $fx_isEqual: [{ a: 1 }, { a: 1, b: 3 }] },
  refToObj: '{{obj}}',
  refToFx: '{{obj.fx}}'
};
const payload = { obj: { str: 'a string', num: 100, fx: { $fx_add: [1, 1] } } };

console.log(runFx(evaluable, { payload }));
