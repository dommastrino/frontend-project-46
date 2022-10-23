import * as path from 'node:path';
import * as fs from 'node:fs';
import yaml from 'js-yaml';

const parsing = (file) => {
  const parsedPath = path.parse(file);
  const fileContent = fs.readFileSync(path.resolve(process.cwd(), file).trim(), 'utf8');
  switch (parsedPath.ext) {
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
