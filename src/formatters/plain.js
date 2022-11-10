import _ from 'lodash';

const stringify = (data) => {
  if (_.isPlainObject(data) === true) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const formatPlain = (output) => {
  const iter = (obj, parent) => {
    const result = obj.map((item) => {
      const key = [...parent, item.key].join('.');
      switch (item.type) {
        case 'added':
          return `Property '${key}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${key}' was removed`;
        case 'changed':
          return `Property '${key}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        case 'nested':
          return `${iter(item.children, [key])}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Cannot handle element type ${item.type}`);
      }
    });
    return _.compact(result).join('\n');
  };
  return iter(output, []);
};

export default formatPlain;
