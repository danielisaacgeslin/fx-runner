import { runFx } from './main';

describe('main', () => {
  it('should eval deep', () => {
    const evaluable = {
      hardcoded: 1,
      simpleRef: '{{obj.str}}',
      complexRef: 'one ref: {{obj.str}}. then another ref: {{obj.num}}.',
      simpleFx: { $add: [2, 2] },
      refFx: { $add: [2, '{{obj.num}}'] },
      nestedFx: { $add: [{ $add: [2, 2] }, 2] },
      obj: { strFx: { $join: [['a name:', '{{obj.str}}'], ' '] }, mathFx: { $add: [5, '{{obj.num}}'] } },
      equal: { $isEqual: [{ a: 1 }, { a: 1 }] },
      notEqual: { $isEqual: [{ a: 1 }, { a: 1, b: 3 }] }
    };
    const payload = { obj: { str: 'a string', num: 100 } };

    expect(runFx(evaluable, { payload })).toEqual({
      hardcoded: 1,
      simpleRef: 'a string',
      complexRef: 'one ref: a string. then another ref: 100.',
      simpleFx: 4,
      refFx: 102,
      nestedFx: 6,
      obj: { strFx: 'a name: a string', mathFx: 105 },
      equal: true,
      notEqual: false
    });
  });
});
