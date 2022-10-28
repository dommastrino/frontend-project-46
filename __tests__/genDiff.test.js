import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixtureData = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

const stylishData = readFixtureData('resultStylish.txt');
const plainData = readFixtureData('resultPlain.txt');
const jsonData = readFixtureData('resultJson.txt');
const jsonFilePath1 = getFixturePath('data1.json');
const jsonFilePath2 = getFixturePath('data2.json');
const ymlFilePath1 = getFixturePath('data1.yml');
const ymlFilePath2 = getFixturePath('data2.yaml');

test.each([
  [jsonFilePath1, jsonFilePath2, 'stylish', stylishData],
  [jsonFilePath1, jsonFilePath2, 'plain', plainData],
  [jsonFilePath1, jsonFilePath2, 'json', jsonData],
])('should be work with json', (filePath1, filePath2, format, expected) => {
  expect(genDiff(filePath1, filePath2, format)).toBe(expected);
});

test.each([
  [ymlFilePath1, ymlFilePath2, 'stylish', stylishData],
  [ymlFilePath1, ymlFilePath2, 'plain', plainData],
  [ymlFilePath1, ymlFilePath2, 'json', jsonData],
])('should be work with yaml', (filePath1, filePath2, format, expected) => {
  expect(genDiff(filePath1, filePath2, format)).toBe(expected);
});

test.each([
  [jsonFilePath1, jsonFilePath2, stylishData],
  [ymlFilePath1, ymlFilePath2, stylishData],
])('should be work with empty format', (filePath1, filePath2, expected) => {
  expect(genDiff(filePath1, filePath2)).toBe(expected);
});
