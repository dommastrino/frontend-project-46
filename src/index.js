#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import parsing from './parsers.js';
import format from './formatters/index.js';
import build from './build.js';
import * as path from 'node:path';
import * as fs from 'node:fs';

const genDiff = (file1, file2, outputFormat = 'stylish') => {
  const extension1 = path.parse(file1).ext;
  const fileContent1 = fs.readFileSync(path.resolve(process.cwd(), file1).trim(), 'utf8');
  const extension2 = path.parse(file2).ext;
  const fileContent2 = fs.readFileSync(path.resolve(process.cwd(), file2).trim(), 'utf8');
  const data1 = parsing(fileContent1, extension1);
  const data2 = parsing(fileContent2, extension2);
  const tree = build(data1, data2);
  return format(tree, outputFormat);
};

export default genDiff;
