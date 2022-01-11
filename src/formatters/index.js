import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (ast, formatName) => {
  const mapping = {
    stylish: formatStylish,
    plain: formatPlain,
    json: JSON.stringify,
  };

  return mapping[formatName](ast);
};
