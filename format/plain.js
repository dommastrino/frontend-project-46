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
      if (item.type === '+') {
        return `Property '${prop}' was added with value: ${format(item.val)}`;
      }
      if (item.type === '-') {
        return `Property '${prop}' was removed`;
      }
      if (item.type === 'diff') {
        return `Property '${prop}' was updated. From ${format(item.file1value)} to ${format(item.file2value)}`;
      }
      if (item.type === 'obj') {
        return `${recurse(item.child, [prop])}`;
      }
      if (item.type === 'ok') {
        return null;
      }
    });
    return _.compact(result).join('\n');
  };
  return recurse(output, []);
};

export default plainFormatter;
