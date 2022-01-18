import _ from 'lodash';

const formatAst = (data, depth = 1) => {
  const INDENT = '  ';
  const currentIndent = INDENT.repeat(depth);
  const bracketIndent = INDENT.repeat(depth - 1);
  const lines = data.flatMap((item) => {
    const { type, name: key, value } = item;

    const formatValue = (innerData, innerDepth = depth) => {
      if (_.isPlainObject(innerData)) {
        const innerIndent = INDENT.repeat(innerDepth + 3);
        const innerBracketIndent = INDENT.repeat(innerDepth + 1);
        const innerLines = Object
          .entries(innerData)
          .map(([innerKey, innerValue]) => {
            if (_.isPlainObject(innerValue)) {
              return `${innerIndent}${innerKey}: ${formatValue(innerValue, innerDepth + 2)}`;
            }
            return `${innerIndent}${innerKey}: ${innerValue}`;
          });
        return `{\n${innerLines.join('\n')}\n${innerBracketIndent}}`;
      }
      return innerData;
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
          `${currentIndent}- ${key}: ${formatValue(item.value1)}`,
          `${currentIndent}+ ${key}: ${formatValue(item.value2)}`,
        ];
      case 'object':
        return `${currentIndent}  ${key}: ${formatAst(item.children, depth + 2)}`;
      default:
        return [];
    }
  });
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default formatAst;
