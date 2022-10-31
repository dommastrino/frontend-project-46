#!/usr/bin/env node
import format from './formatters/index.js';
import buildTree from './treeBuilder.js';
import getData from './utils.js';

export default (file1, file2, outputFormat = 'stylish') => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const tree = buildTree(data1, data2);
  return format(tree, outputFormat);
};
