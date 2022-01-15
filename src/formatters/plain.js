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
      type, name, value, children,
    } = item;
    switch (type) {
      case 'added':
        return `Property '${path}${name}' was added with value: ${formatValue(value)}`;
      case 'deleted':
        return `Property '${path}${name}' was removed`;
      case 'modified':
        return `Property '${path}${name}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`;
      case 'object':
        return formatAst(children, `${path}${name}.`);
      default:
        return [];
    }
  });
  return lines.join('\n');
};

export default formatAst;
