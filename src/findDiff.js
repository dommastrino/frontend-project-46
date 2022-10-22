/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import _ from 'lodash';
import parsing from './parsers.js';
import formatter from './formatters/index.js';

export const diff = (obj1, obj2) => {
  const props = _.union(_.keys(obj1), _.keys(obj2));
  const sortedProps = _.sortBy(props);
  const result = sortedProps.map((prop) => {
    if (!_.has(obj1, prop)) {
      return { type: '+', prop, value: obj2[prop] };
    }
    if (!_.has(obj2, prop)) {
      return { type: '-', prop, value: obj1[prop] };
    }
    if (_.isPlainObject(obj1[prop]) && _.isPlainObject(obj2[prop])) {
      return { type: 'obj', prop, child: diff(obj1[prop], obj2[prop]) };
    }
    if (!_.isEqual(obj1[prop], obj2[prop])) {
      return {
        type: 'diff',
        prop,
        file1value: obj1[prop],
        file2value: obj2[prop],
      };
    }
    return { type: 'ok', prop, value: obj1[prop] };
  });
  return result;
};

const findDiff = (file1, file2, format = 'stylish') => {
  const obj1 = parsing(file1);
  const obj2 = parsing(file2);
  const result = diff(obj1, obj2);
  const some = formatter(result, format);
  console.log(some);
  return some;
};

export default findDiff;
