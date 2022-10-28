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
  const recurse = (obj, counter) => obj.map((item) => {
    switch (item.type) {
      case 'obj':
        return `${pushSpaceToStr(counter)}  ${item.key}: {\n${recurse(item.child, counter + 1).join('\n')}\n${pushSpaceToStr(counter)}  }`;
      case 'diff':
        return `${pushSpaceToStr(counter)}- ${item.key}: ${toString(item.file1value, counter)}\n${pushSpaceToStr(counter)}+ ${item.key}: ${toString(item.file2value, counter)}`;
      case '+':
        return `${pushSpaceToStr(counter)}+ ${item.key}: ${toString(item.value, counter)}`;
      case '-':
        return `${pushSpaceToStr(counter)}- ${item.key}: ${toString(item.value, counter)}`;
      case 'ok':
        return `${pushSpaceToStr(counter)}  ${item.key}: ${toString(item.value, counter)}`;
      default:
        throw new Error('Невозможно обработать тип элемента');
    }
  });
  return `{\n${recurse(output, 1).join('\n')}\n}`;
};

export default stylishFormatter;
