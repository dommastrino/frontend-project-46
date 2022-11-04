import _ from 'lodash';

const format = (val) => {
  if (_.isPlainObject(val) === true) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  if (val === true || val === false || typeof val === 'number') {
    return `${val}`;
  }
  return null;
};

const plainFormatter = (output) => {
  const recurse = (obj, parent) => {
    const result = obj.map((item) => {
      const key = [...parent, item.key].join('.');
      switch (item.type) {
        case 'added':
          return `Property '${key}' was added with value: ${format(item.value)}`;
        case 'deleted':
          return `Property '${key}' was removed`;
        case 'changed':
          return `Property '${key}' was updated. From ${format(item.file1value)} to ${format(item.file2value)}`;
        case 'nested':
          return `${recurse(item.children, [key])}`;
        case 'unchanged':
          return null;
        default:
          throw new Error('Cannot handle element type');
      }
    });
    return _.compact(result).join('\n');
  };
  return recurse(output, []);
};

export default plainFormatter;
