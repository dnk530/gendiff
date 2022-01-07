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

  const format = (data, depth = 1) => {
    const INDENT = '  ';
    const currentIndent = INDENT.repeat(depth);
    const bracketIndent = INDENT.repeat(depth - 1);
    const lines = data.flatMap((item) => {
      const { type, name: key, value } = item;

      const formatValue = (v, innerDepth = depth) => {
        if (typeof v === 'object' && v !== null) {
          const innerIndent = INDENT.repeat(innerDepth + 3);
          const innerBracketIndent = INDENT.repeat(innerDepth + 1);
          const innerLines = Object
            .entries(v)
            .map(([innerKey, innerValue]) => {
              if (typeof innerValue === 'object' && innerValue !== null) {
                return `${innerIndent}${innerKey}: ${formatValue(innerValue, innerDepth + 2)}`;
              }
              return `${innerIndent}${innerKey}: ${innerValue}`;
            });
          return `{\n${innerLines.join('\n')}\n${innerBracketIndent}}`;
        }
        return v;
      };

      switch (type) {
        case 'added':
          return `${currentIndent}+ ${key}: ${formatValue(value)}`;
        case 'deleted':
          return `${currentIndent}- ${key}: ${formatValue(value)}`;
        case 'unmodified':
          return `${currentIndent}  ${key}: ${formatValue(value)}`;
        case 'modified':
          return [
            `${currentIndent}- ${key}: ${formatValue(item.oldValue)}`,
            `${currentIndent}+ ${key}: ${formatValue(item.newValue)}`,
          ];
        case 'object':
          return `${currentIndent}  ${key}: ${format(item.children, depth + 2)}`;
        default:
          return [];
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  const result = format(diff(object1, object2));
  return result;
};
