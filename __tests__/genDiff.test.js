import { diff } from '../src/findDiff.js';

test('testing function genDiff()', () => {
  const actual = diff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(actual).toEqual([
    { type: '-', name: 'follow', value: false },
    { type: ' ', name: 'host', value: 'hexlet.io' },
    { type: '-', name: 'proxy', value: '123.234.53.22' },
    { type: 'diff', name: 'timeout', file1Val: 50, file2Val: 20 },
    { type: '+', name: 'verbose', value: true },
  ]);
  const actual2 = diff('__fixtures__/file1.yaml', '__fixtures__/file2.yml');
  expect(actual2).toEqual([
    { type: '-', name: 'follow', value: false },
    { type: ' ', name: 'host', value: 'hexlet.io' },
    { type: '-', name: 'proxy', value: '123.234.53.22' },
    { type: 'diff', name: 'timeout', file1Val: 50, file2Val: 20 },
    { type: '+', name: 'verbose', value: true },
  ]);
});
