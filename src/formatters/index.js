import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const formatter = (output, format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatter(output);
    case 'plain':
      return plainFormatter(output);
    case 'json':
      return JSON.stringify(output);
    default:
      throw new Error(`Неподдерживаемый тип данных ${output}`);
  }
};

export default formatter;
