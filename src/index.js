import _ from 'lodash';
import parse from './parsers.js';

export default (filepath1, filepath2) => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);

  const diff = (a, b) => {
    const iter = (obj1, obj2) => {
      const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));
      const children = keys.flatMap((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];
        const hasChildren = (node) => typeof node === 'object' && node !== null;
        const getChildren = (node) => ({
          type: 'object',
          value: Object.entries(node).map(([name, value]) => ({ type: 'unmodified', name, value: hasChildren(value) ? getChildren(value) : value })),
        });

        if (!_.has(obj1, key)) {
          return { type: 'added', name: key, value: hasChildren(value2) ? getChildren(value2) : value2 };
        }
        if (!_.has(obj2, key)) {
          return { type: 'deleted', name: key, value: hasChildren(value1) ? getChildren(value1) : value1 };
        }
        if (value1 === value2) {
          return { type: 'unmodified', name: key, value: value1 };
        }
        if (typeof value1 === 'object' && typeof value2 === 'object') {
          return { type: 'object', name: key, value: (iter(value1, value2)) };
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
    return { value: iter(a, b) };
  };

  // console.log(JSON.stringify(diff(object1, object2), null, 4));

  const format = (obj, depth = 1) => {
    const data = obj.value;
    const INDENT = '  ';
    const currentIndent = INDENT.repeat(depth);
    const bracketIndent = INDENT.repeat(depth - 1);
    console.log(data);
    const lines = data.flatMap((item) => {
      const { type, name: key, value } = item;
      let sign = ' ';
      switch (type) {
        case 'added':
          sign = '+';
          break;
        case 'deleted':
          sign = '-';
          break;
        case 'nested':
          sign = ' ';
          break;
        default:
          sign = ' ';
      }

      if (typeof value === 'object' && value !== null) {
        // console.log(JSON.stringify(item, null, 4));
        return `${currentIndent}${sign} ${key}: ${format(item, depth + 2)}`;
      }
      if (type === 'modified') {
        return [
          `${currentIndent}- ${key}: ${item.oldValue}`,
          `${currentIndent}+ ${key}: ${item.newValue}`,
        ];
      }

      return `${currentIndent}${sign} ${key}: ${value}`;
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  const result = format(diff(object1, object2));

  return result;
};
