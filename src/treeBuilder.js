import _ from 'lodash';

const buildTree = (data1, data2) => { 
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: '+', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: '-', key, value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { type: 'obj', key, child: buildTree(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: 'diff',
        key,
        file1value: data1[key],
        file2value: data2[key],
      };
    }
    return { type: 'ok', key, value: data1[key] };
  });
  return result;
};

export default buildTree;
