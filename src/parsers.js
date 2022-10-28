import yaml from 'js-yaml';

const parsing = (fileContent, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error('Неподдерживаемый формат файла');
  }
};

export default parsing;
