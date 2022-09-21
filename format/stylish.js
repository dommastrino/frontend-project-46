import _ from 'lodash';

const pushSpaceToStr = (depth, initialValue = 4) => ' '.repeat(initialValue * depth - 2);

const toString = (data, depth) => {
  if (data === null) {
    return null;
  }
  if (_.isPlainObject(data) === false) {
    return `${data}`;
  }
  const body = Object.entries(data).map(([key, value]) => `${pushSpaceToStr(depth + 1)}  ${key}: ${toString(value, depth + 1)}`);
  return ['{', ...body, `${pushSpaceToStr(depth)}  }`].join('\n');
};

const stylishFormatter = (output) => {
  const recurse = (tree, counter) =>
    tree.map((node) => {
      if (node.type === 'obj') {
        return `${pushSpaceToStr(counter)}  ${node.prop}: {\n${recurse(node.child, counter + 1).join('\n')}\n${pushSpaceToStr(counter)}  }`;
      }
      if (node.type === 'diff') {
        return `${pushSpaceToStr(counter)}- ${node.prop}: ${toString(node.file1value, counter)}\n${pushSpaceToStr(counter)}+ ${node.prop}: ${toString(node.file2value, counter)}`;
      }
      if (node.type === '+') {
        return `${pushSpaceToStr(counter)}+ ${node.prop}: ${toString(node.value, counter)}`;
      }
      if (node.type === '-') {
        return `${pushSpaceToStr(counter)}- ${node.prop}: ${toString(node.value, counter)}`;
      }
      if (node.type === 'ok') {
        return `${pushSpaceToStr(counter)}  ${node.prop}: ${toString(node.value, counter)}`;
      }
    });
  return `{\n${recurse(output, 1).join('\n')}\n}`;
};

export default stylishFormatter;
