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
      const prop = [...parent, item.prop].join('.');
      switch (item.type) {
        case '+':
          return `Property '${prop}' was added with value: ${format(item.value)}`;
        case '-':
          return `Property '${prop}' was removed`;
        case 'diff':
          return `Property '${prop}' was updated. From ${format(item.file1value)} to ${format(item.file2value)}`;
        case 'obj':
          return `${recurse(item.child, [prop])}`;
        case 'ok':
          return null;
        default:
          throw new Error('Невозможно обработать тип элемента');
      }
    });
    return _.compact(result).join('\n');
  };
  return recurse(output, []);
};

export default plainFormatter;
