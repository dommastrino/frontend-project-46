import * as fs from 'node:fs';
import * as path from 'node:path';
import { findDiff } from '../src/findDiff.js';

test('testing function gendiff() with json files', () => {
  const actual = findDiff('__fixtures__/data1.json', '__fixtures__/data2.json');
  expect(actual).toEqual(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultStylish.txt'), 'utf-8'));
  const actual2 = findDiff('__fixtures__/data1.json', '__fixtures__/data2.json', 'plain');
  expect(actual2).toEqual(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultPlain.txt'), 'utf-8'));
  const actual3 = findDiff('__fixtures__/data1.json', '__fixtures__/data2.json', 'json');
  expect(actual3).toEqual(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultJson.txt'), 'utf-8'));
});
test('testing function gendiff() with yaml files', () => {
  const actual = findDiff('__fixtures__/data1.yml', '__fixtures__/data2.yaml');
  expect(actual).toEqual(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultStylish.txt'), 'utf-8'));
  const actual2 = findDiff('__fixtures__/data1.yml', '__fixtures__/data2.yaml', 'plain');
  expect(actual2).toEqual(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultPlain.txt'), 'utf-8'));
  const actual3 = findDiff('__fixtures__/data1.yml', '__fixtures__/data2.yaml', 'json');
  expect(actual3).toEqual(fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/resultJson.txt'), 'utf-8'));
});