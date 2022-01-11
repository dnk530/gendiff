import formatStylish from './stylish.js';

export default (ast, format) => {
  const formatters = {
    stylish: formatStylish,
  };

  return formatters[format](ast);
};
