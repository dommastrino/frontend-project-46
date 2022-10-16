import * as fs from 'node:fs';
import * as path from 'node:path';
import { findDiff } from '../src/findDiff.js';

test('testing function genDiff()', () => {
  const actual = findDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish');
  expect(actual).toEqual(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultStylish.txt'), 'utf-8'));
  const actual2 = findDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain');
  expect(actual2).toEqual(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultPlain.txt'), 'utf-8'));
  const actual3 = findDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'json');
  expect(actual3).toEqual(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultJson.txt'), 'utf-8'));
});
