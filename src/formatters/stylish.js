import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const body = Object.entries(data).map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${body.join('\n')}\n${indent(depth)}  }`;
};

const formatStylish = (tree) => {
  const iter = (node, depth) => node.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${indent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1).join('\n')}\n${indent(depth)}  }`;
      case 'changed':
        return `${indent(depth)}- ${item.key}: ${stringify(item.value1, depth)}\n${indent(depth)}+ ${item.key}: ${stringify(item.value2, depth)}`;
      case 'added':
        return `${indent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
      case 'deleted':
        return `${indent(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
      case 'unchanged':
        return `${indent(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
      default:
        throw new Error(`Cannot handle element type ${item.type}`);
    }
  });
  return `{\n${iter(tree, 1).join('\n')}\n}`;
};

export default formatStylish;
