import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import findDiff from '../src/findDiff.js';

const getPath = (filename) => path.resolve(path.dirname(fileURLToPath(import.meta.url)), './..', '__fixtures__', filename);
describe('genDiff module', () => {
  it('should be work with json', () => {
    const actual = findDiff(getPath('data1.json'), getPath('data2.json'));
    expect(actual).toEqual(fs.readFileSync(path.resolve(process.cwd(), getPath('resultStylish.txt')), 'utf-8'));
    const actual2 = findDiff(getPath('data1.json'), getPath('data2.json'), 'plain');
    expect(actual2).toEqual(fs.readFileSync(path.resolve(process.cwd(), getPath('resultPlain.txt')), 'utf-8'));
    const actual3 = findDiff(getPath('data1.json'), getPath('data2.json'), 'json');
    expect(actual3).toEqual(fs.readFileSync(path.resolve(process.cwd(), getPath('resultJson.txt')), 'utf-8'));
  });
  it('should be work with ymal', () => {
    const actual = findDiff(getPath('data1.yml'), getPath('data2.yaml'));
    expect(actual).toEqual(fs.readFileSync(path.resolve(process.cwd(), getPath('resultStylish.txt')), 'utf-8'));
    const actual2 = findDiff(getPath('data1.yml'), getPath('data2.yaml'), 'plain');
    expect(actual2).toEqual(fs.readFileSync(path.resolve(process.cwd(), getPath('resultPlain.txt')), 'utf-8'));
    const actual3 = findDiff(getPath('data1.yml'), getPath('data2.yaml'), 'json');
    expect(actual3).toEqual(fs.readFileSync(path.resolve(process.cwd(), getPath('resultJson.txt')), 'utf-8'));
  });
});
