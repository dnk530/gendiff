import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);

  const diff = (a, b) => {
    const iter = (obj1, obj2) => {
      const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));
      const children = keys.flatMap((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if (!_.has(obj1, key)) {
          return { type: 'added', name: key, value: value2 };
        }
        if (!_.has(obj2, key)) {
          return { type: 'deleted', name: key, value: value1 };
        }
        if (value1 === value2) {
          return { type: 'unmodified', name: key, value: value1 };
        }
        if (typeof value1 === 'object' && typeof value2 === 'object') {
          return { type: 'object', name: key, children: (iter(value1, value2)) };
        }
        return {
          type: 'modified',
          name: key,
          oldValue: value1,
          newValue: value2,
        };
      });
      return children;
    };
    return iter(a, b);
  };
  const ast = diff(object1, object2);
  // console.log(JSON.stringify(ast, null, 4));
  const result = format(ast, formatName);
  return result;
};
