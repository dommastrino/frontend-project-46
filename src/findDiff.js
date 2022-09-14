/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import * as fs from 'node:fs';
import * as path from 'node:path';
import _ from 'lodash';

const findDiff = (file1, file2) => {
  const fileContent1 = fs.readFileSync(path.resolve(process.cwd(), file1).trim(), 'utf8');
  const obj1 = JSON.parse(fileContent1);
  const keys1 = Object.keys(obj1);
  const fileContent2 = fs.readFileSync(path.resolve(process.cwd(), file2).trim(), 'utf8');
  const obj2 = JSON.parse(fileContent2);
  const keys2 = Object.keys(obj2);
  const sortedProps = _.sortBy(_.union(keys1, keys2));
  const result = sortedProps.map((prop) => {
    if (!_.has(obj1, prop)) {
      return { type: '+', name: prop, value: obj2[prop] };
    }
    if (!_.has(obj2, prop)) {
      return { type: '-', name: prop, value: obj1[prop] };
    }
    if (!_.isEqual(obj1[prop], obj2[prop])) {
      return {
        type: 'diff',
        name: prop,
        file1Val: obj1[prop],
        file2Val: obj2[prop],
      };
    }
    return { type: ' ', name: prop, value: obj1[prop] };
  });
  console.log('{');
  result.forEach((elem) => {
    if (elem.type === 'diff') {
      console.log(`- ${elem.name} ${elem.file1Val}`);
      console.log(`+ ${elem.name} ${elem.file2Val}`);
    } else console.log(`${elem.type} ${elem.name} ${elem.value}`);
  });
  console.log('}');
  return result;
};

export default findDiff;
