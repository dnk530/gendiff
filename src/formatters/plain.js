import isPlainObject from 'lodash/isPlainObject';

const formatAst = (ast, path = '') => {
  const formatValue = (value) => {
    if (isPlainObject(value)) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const output = ast.flatMap((item) => {
    const {
      type,
      name,
      value,
      children,
    } = item;

    const typeToOutput = {
      added: () => `Property '${path}${name}' was added with value: ${formatValue(value)}`,
      deleted: () => `Property '${path}${name}' was removed`,
      modified: () => `Property '${path}${name}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`,
      unmodified: () => [],
      object: () => formatAst(children, `${path}${name}.`),
    };
    return typeToOutput[type]();
  });
  return output.join('\n');
};

export default (data) => formatAst(data);
