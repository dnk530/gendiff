import isPlainObject from 'lodash/isPlainObject.js';

const formatValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatAst = (ast, path = '') => {
  const output = ast.flatMap((item) => {
    const {
      type,
      name,
    } = item;

    const typeToOutput = {
      added: () => `Property '${path}${name}' was added with value: ${formatValue(item.value)}`,
      deleted: () => `Property '${path}${name}' was removed`,
      modified: () => `Property '${path}${name}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`,
      unmodified: () => [],
      object: () => formatAst(item.children, `${path}${name}.`),
    };
    return typeToOutput[type]();
  });
  return output.join('\n');
};

export default (data) => formatAst(data);
