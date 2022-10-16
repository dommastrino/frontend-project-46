import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const formatter = (output, format) => {
  if (format === 'stylish') {
    return stylishFormatter(output);
  }
  if (format === 'plain') {
    return plainFormatter(output);
  }
};

export default formatter;
