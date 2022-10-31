import yaml from 'js-yaml';

const parse = (fileContent, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
    case 'yaml':
      return yaml.load(fileContent);
    default:
      throw new Error('Неподдерживаемый формат файла');
  }
};

export default parse;
