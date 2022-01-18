import _ from 'lodash';

const formatAst = (data, depth = 1) => {
  const INDENT = '  ';
  const currentIndent = INDENT.repeat(depth);
  const bracketIndent = INDENT.repeat(depth - 1);
  const output = data.flatMap((item) => {
    const { type, name: key, value } = item;

    const formatValue = (innerData, innerDepth = depth) => {
      if (_.isPlainObject(innerData)) {
        const INNER_DEPTH_INCREASE = 3;
        const innerIndent = INDENT.repeat(innerDepth + INNER_DEPTH_INCREASE);
        const innerBracketIndent = INDENT.repeat(innerDepth + 1);
        const innerOutput = Object
          .entries(innerData)
          .map(([innerKey, innerValue]) => {
            if (_.isPlainObject(innerValue)) {
              const DEPTH_INCREASE = 2;
              return `${innerIndent}${innerKey}: ${formatValue(innerValue, innerDepth + DEPTH_INCREASE)}`;
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
      object: () => {
        const DEPTH_INCREASE = 2;
        return `${currentIndent}  ${key}: ${formatAst(item.children, depth + DEPTH_INCREASE)}`;
      },
    };
    return typeToOutput[type]();
  });
  return ['{', ...output, `${bracketIndent}}`].join('\n');
};

export default formatAst;
