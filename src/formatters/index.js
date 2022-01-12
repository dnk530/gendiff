import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (ast, formatName) => {
  const mapping = {
    stylish: formatStylish,
    plain: formatPlain,
    json: JSON.stringify,
  };
  if (!_.has(mapping, formatName)) {
    console.log(`Unknown format style: '${formatName}'`);
    process.exit(1);
  }
  return mapping[formatName](ast);
};
