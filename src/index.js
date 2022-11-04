import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './treeBuilder.js';

const extractFormat = (filePath) => path.parse(filePath).ext.slice(1);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const getData = (file) => parse(readFile(path.resolve(process.cwd(), file)), extractFormat(file));

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const tree = buildTree(data1, data2);
  return format(tree, outputFormat);
};
