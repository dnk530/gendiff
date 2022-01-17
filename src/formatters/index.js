import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (ast, formatName) => {
  const formatNameToFormatter = {
    stylish: formatStylish,
    plain: formatPlain,
    json: JSON.stringify,
  };
  if (!_.has(formatNameToFormatter, formatName)) {
    throw new Error(`Unknown format style: '${formatName}'`);
  }
  return formatNameToFormatter[formatName](ast);
};
