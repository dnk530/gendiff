import _ from 'lodash';

const formatAst = (ast, path = '') => {
  const formatValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const lines = ast.flatMap((item) => {
    const {
      type,
      name,
      value,
      children,
    } = item;

    const typeToLine = {
      added: () => `Property '${path}${name}' was added with value: ${formatValue(value)}`,
      deleted: () => `Property '${path}${name}' was removed`,
      modified: () => `Property '${path}${name}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`,
      unmodified: () => '',
      object: () => { formatAst(children, `${path}${name}.`); },
    };
    return typeToLine[type]();
  });
  return lines.join('\n');
};

export default formatAst;
