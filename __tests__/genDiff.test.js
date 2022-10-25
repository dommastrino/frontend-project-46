import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import findDiff from '../src/findDiff.js';

const getPath = (filename) => path.resolve(path.dirname(fileURLToPath(import.meta.url)), './..', '__fixtures__', filename);
const stylishData = fs.readFileSync(path.resolve(process.cwd(), getPath('resultStylish.txt')), 'utf-8');
const plainData = fs.readFileSync(path.resolve(process.cwd(), getPath('resultPlain.txt')), 'utf-8');
const jsonData = fs.readFileSync(path.resolve(process.cwd(), getPath('resultJson.txt')), 'utf-8');

describe('genDiff module', () => {
  it('should be work with json', () => {
    expect(findDiff(getPath('data1.json'), getPath('data2.json'))).toEqual(stylishData);
    expect(findDiff(getPath('data1.json'), getPath('data2.json'), 'plain')).toEqual(plainData);
    expect(findDiff(getPath('data1.json'), getPath('data2.json'), 'json')).toEqual(jsonData);
  });
  it('should be work with ymal', () => {
    expect(findDiff(getPath('data1.yml'), getPath('data2.yaml'))).toEqual(stylishData);
    expect(findDiff(getPath('data1.yml'), getPath('data2.yaml'), 'plain')).toEqual(plainData);
    expect(findDiff(getPath('data1.yml'), getPath('data2.yaml'), 'json')).toEqual(jsonData);
  });
});
