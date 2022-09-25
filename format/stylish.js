import _ from 'lodash';

const pushSpaceToStr = (counter, initialValue = 4) => ' '.repeat(initialValue * counter - 2);

const toString = (data, counter) => {
  if (data === null) {
    return null;
  }
  if (_.isPlainObject(data) === false) {
    return `${data}`;
  }
  const body = Object.entries(data).map(([key, value]) => `${pushSpaceToStr(counter + 1)}  ${key}: ${toString(value, counter + 1)}`);
  return ['{', ...body, `${pushSpaceToStr(counter)}  }`].join('\n');
};

const stylishFormatter = (output) => {
  const recurse = (obj, counter) =>
    obj.map((item) => {
      if (item.type === 'obj') {
        return `${pushSpaceToStr(counter)}  ${item.prop}: {\n${recurse(item.child, counter + 1).join('\n')}\n${pushSpaceToStr(counter)}  }`;
      }
      if (item.type === 'diff') {
        return `${pushSpaceToStr(counter)}- ${item.prop}: ${toString(item.file1value, counter)}\n${pushSpaceToStr(counter)}+ ${item.prop}: ${toString(item.file2value, counter)}`;
      }
      if (item.type === '+') {
        return `${pushSpaceToStr(counter)}+ ${item.prop}: ${toString(item.value, counter)}`;
      }
      if (item.type === '-') {
        return `${pushSpaceToStr(counter)}- ${item.prop}: ${toString(item.value, counter)}`;
      }
      if (item.type === 'ok') {
        return `${pushSpaceToStr(counter)}  ${item.prop}: ${toString(item.value, counter)}`;
      }
    });
  return `{\n${recurse(output, 1).join('\n')}\n}`;
};

export default stylishFormatter;
