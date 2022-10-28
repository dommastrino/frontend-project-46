import _ from 'lodash';

const build = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const sortedProps = _.sortBy(keys);
    const result = sortedProps.map((key) => {
        if (!_.has(obj1, key)) {
            return { type: '+', key, value: obj2[key] };
        }
        if (!_.has(obj2, key)) {
            return { type: '-', key, value: obj1[key] };
        }
        if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
            return { type: 'obj', key, child: build(obj1[key], obj2[key]) };
        }
        if (!_.isEqual(obj1[key], obj2[key])) {
            return {
                type: 'diff',
                key,
                file1value: obj1[key],
                file2value: obj2[key],
            };
        }
        return { type: 'ok', key, value: obj1[key] };
    });
    return result;
};
export default build;