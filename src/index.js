import _ from 'lodash';
import parse from './parsers.js';

export default (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  const diff = keys.flatMap((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key)) {
      return [['+', [key, value2]]];
    }
    if (!_.has(obj2, key)) {
      return [['-', [key, value1]]];
    }
    return (
      value1 === value2
        ? [[' ', [key, value1]]]
        : [['-', [key, value1]], ['+', [key, value2]]]
    );
  });

  const format = (data) => {
    const INDENT = '  ';
    const lines = data.map(([sign, [key, value]]) => `${INDENT}${sign} ${key}: ${value}`);
    return ['{', ...lines, '}'].join('\n');
  };
  const result = format(diff);

  return result;
};
