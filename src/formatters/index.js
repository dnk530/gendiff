import formatStylish from './stylish.js';

export default (ast, formatName) => {
  const mapping = {
    stylish: formatStylish,
  };

  return mapping[formatName](ast);
};
