import isPlainObject from 'lodash/isPlainObject.js';

const INDENT = '  ';
const DEPTH_INCREASE = 2;
const INNER_DEPTH_INCREASE = 3;

const formatValue = (innerData, innerDepth) => {
  if (isPlainObject(innerData)) {
    const innerIndent = INDENT.repeat(innerDepth + INNER_DEPTH_INCREASE);
    const innerBracketIndent = INDENT.repeat(innerDepth + 1);
    const innerOutput = Object
      .entries(innerData)
      .map(([innerKey, innerValue]) => {
        if (isPlainObject(innerValue)) {
          return `${innerIndent}${innerKey}: ${formatValue(innerValue, innerDepth + DEPTH_INCREASE)}`;
        }
        return `${innerIndent}${innerKey}: ${innerValue}`;
      });
    return `{\n${innerOutput.join('\n')}\n${innerBracketIndent}}`;
  }
  return innerData;
};

const formatAst = (data, depth = 1) => {
  const currentIndent = INDENT.repeat(depth);
  const bracketIndent = INDENT.repeat(depth - 1);
  const output = data.flatMap((item) => {
    const { type, name: key, value } = item;
    const typeToOutput = {
      added: () => `${currentIndent}+ ${key}: ${formatValue(value, depth)}`,
      deleted: () => `${currentIndent}- ${key}: ${formatValue(value, depth)}`,
      unmodified: () => `${currentIndent}  ${key}: ${formatValue(value, depth)}`,
      modified: () => [
        `${currentIndent}- ${key}: ${formatValue(item.value1, depth)}`,
        `${currentIndent}+ ${key}: ${formatValue(item.value2, depth)}`,
      ],
      object: () => `${currentIndent}  ${key}: ${formatAst(item.children, depth + DEPTH_INCREASE)}`,
    };
    return typeToOutput[type]();
  });
  return ['{', ...output, `${bracketIndent}}`].join('\n');
};

export default (data) => formatAst(data);
