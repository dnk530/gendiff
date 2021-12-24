import _ from 'lodash';
import parse from './parsers.js';

export default (filepath1, filepath2) => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);

  const diff = (obj1, obj2) => {
    const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));
    return keys.flatMap((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (!_.has(obj1, key)) {
        return { type: 'added', key, value: value2 };
      }
      if (!_.has(obj2, key)) {
        return { type: 'deleted', key, value: value1 };
      }
      if (value1 === value2) {
        return { type: 'unmodified', key, value: value1 };
      }
      if (typeof value1 === 'object') {
        return { type: 'modified', key, value: (diff(value1, value2)) };
      }
      return [{ type: 'deleted', key, value: value1 }, { type: 'added', key, value: value2 }];
    });
  };
  console.log(diff(object1, object2));

  const format = (data, depth = 1) => {
    const INDENT = '  ';
    const currentIndent = INDENT.repeat(depth);
    const bracketIndent = INDENT.repeat(depth - 1);
    const lines = data.map(({ type, key, value }) => {
      let sign = ' ';
      switch (type) {
        case 'added':
          sign = '+';
          break;
        case 'deleted':
          sign = '-';
          break;
        case 'modified':
          sign = ' ';
          break;
        default:
          sign = ' ';
      }

      if (type === 'modified') {
        return `${currentIndent}${sign} ${key}: ${format(value, depth + 2)}`;
      }
      return `${currentIndent}${sign} ${key}: ${value}`;
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  const result = format(diff(object1, object2));

  return result;
};
