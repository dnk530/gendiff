import _ from 'lodash';

const formatAst = (data, depth = 1) => {
  const INDENT = '  ';
  const currentIndent = INDENT.repeat(depth);
  const bracketIndent = INDENT.repeat(depth - 1);
  const output = data.flatMap((item) => {
    const { type, name: key, value } = item;

    const formatValue = (innerData, innerDepth = depth) => {
      if (_.isPlainObject(innerData)) {
        const innerIndent = INDENT.repeat(innerDepth + 3);
        const innerBracketIndent = INDENT.repeat(innerDepth + 1);
        const innerOutput = Object
          .entries(innerData)
          .map(([innerKey, innerValue]) => {
            if (_.isPlainObject(innerValue)) {
              return `${innerIndent}${innerKey}: ${formatValue(innerValue, innerDepth + 2)}`;
            }
            return `${innerIndent}${innerKey}: ${innerValue}`;
          });
        return `{\n${innerOutput.join('\n')}\n${innerBracketIndent}}`;
      }
      return innerData;
    };

    const typeToOutput = {
      added: () => `${currentIndent}+ ${key}: ${formatValue(value)}`,
      deleted: () => `${currentIndent}- ${key}: ${formatValue(value)}`,
      unmodified: () => `${currentIndent}  ${key}: ${formatValue(value)}`,
      modified: () => [
        `${currentIndent}- ${key}: ${formatValue(item.value1)}`,
        `${currentIndent}+ ${key}: ${formatValue(item.value2)}`,
      ],
      object: () => `${currentIndent}  ${key}: ${formatAst(item.children, depth + 2)}`,
    };
    return typeToOutput[type]();
  });
  return ['{', ...output, `${bracketIndent}}`].join('\n');
};

export default formatAst;
