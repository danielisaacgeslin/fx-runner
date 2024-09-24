import { runFx } from './src/main';

const evaluable = {
  hardcoded: 1,
  simpleRef: '{{obj.str}}',
  complexRef: 'one ref: {{obj.str}}. then another ref: {{obj.num}}.',
  simpleFx: { $add: [2, 2] },
  refFx: { $add: [2, '{{obj.num}}'] },
  nestedFx: { $add: [{ $add: [2, 2] }, 2] },
  obj: { strFx: { $join: [['a name:', '{{obj.str}}'], ' '] }, mathFx: { $add: [5, '{{obj.num}}'] } },
  equal: { $isEqual: [{ a: 1 }, { a: 1 }] },
  notEqual: { $isEqual: [{ a: 1 }, { a: 1, b: 3 }] },
  refToObj: '{{obj}}',
  refToFx: '{{obj.fx}}'
};
const payload = { obj: { str: 'a string', num: 100, fx: { $add: [1, 1] } } };

console.log(runFx(evaluable, { payload }));
