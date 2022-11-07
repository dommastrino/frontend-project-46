import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './treeBuilder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractFormat = (filePath) => path.parse(filePath).ext.slice(1);

const buildFullPath = (filePath) => path.join(__dirname, '..', filePath);

const getData = (filePath) => parse(fs.readFileSync(filePath,'utf8'), extractFormat(filePath));

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = getData(buildFullPath(filePath1));
  const data2 = getData(buildFullPath(filePath2));
  const tree = buildTree(data1, data2);
  return format(tree, outputFormat);
};
