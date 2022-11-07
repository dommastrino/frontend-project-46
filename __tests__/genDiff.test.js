import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixture = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

const expectedStylish = readFixture('resultStylish.txt');
const expectedPlain = readFixture('resultPlain.txt');
const expectedJSON = readFixture('resultJson.txt');

const testList = ['json', 'yaml'];

describe('genDiff', () => {
  test.each(testList)('should be work with %s format', (format) => {
    const filePath1 = `__fixtures__/data1.${format}`;
    const filePath2 = `__fixtures__/data2.${format}`;
    expect(genDiff(filePath1, filePath2)).toBe(expectedStylish);
    expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expectedStylish);
    expect(genDiff(filePath1, filePath2, 'plain')).toBe(expectedPlain);
    expect(genDiff(filePath1, filePath2, 'json')).toBe(expectedJSON);
  });
});
