import * as path from 'node:path';
import * as fs from 'node:fs';
import yaml from 'js-yaml';

const parse = (file) => {
  let obj = {};
  const parsedPath = path.parse(file);
  const fileContent = fs.readFileSync(path.resolve(process.cwd(), file).trim(), 'utf8');
  if (parsedPath.ext === '.json') {
    obj = JSON.parse(fileContent);
  } else if (parsedPath.ext === '.yaml' || parsedPath.ext === '.yml') {
    obj = yaml.load(fileContent);
  }
  return obj;
};

export default parse;
