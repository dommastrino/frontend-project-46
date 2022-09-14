import { test, expect } from 'jest';
import findDiff from '../src/findDiff.js';

test('testing function genDiff()', () => {
  const actual = findDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(actual).toEqual([
    { type: '-', name: 'follow', value: false },
    { type: ' ', name: 'host', value: 'hexlet.io' },
    { type: '-', name: 'proxy', value: '123.234.53.22' },
    { type: 'diff', name: 'timeout', file1Val: 50, file2Val: 20 },
    { type: '+', name: 'verbose', value: true },
  ]);
});
