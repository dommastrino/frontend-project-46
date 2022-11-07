import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const stringify = (data, depth) => {
  if (_.isObject(data) === false) {
    return String(data);
  }
  const body = Object.entries(data).map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...body, `${indent(depth)}  }`].join('\n');
};

const formatStylish = (tree) => {
  const recurse = (node, depth) => node.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${indent(depth)}  ${item.key}: {\n${recurse(item.children, depth + 1).join('\n')}\n${indent(depth)}  }`;
      case 'changed':
        return `${indent(depth)}- ${item.key}: ${stringify(item.value1, depth)}\n${indent(depth)}+ ${item.key}: ${stringify(item.value2, depth)}`;
      case 'added':
        return `${indent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
      case 'deleted':
        return `${indent(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
      case 'unchanged':
        return `${indent(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
      default:
        throw new Error('Cannot handle element type');
    }
  });
  return `{\n${recurse(tree, 1).join('\n')}\n}`;
};

export default formatStylish;
