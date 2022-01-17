import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';

export default (filepath) => {
  const file = readFileSync(path.resolve(filepath), 'utf8');
  const extension = _.trimStart(path.extname(filepath), '.').toLowerCase();
  if (extension.length === 0) {
    return JSON.parse(file);
  }
  const extensionToParser = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  if (!_.has(extensionToParser, extension)) {
    throw new Error(`Unknown file format: '${extension}'`);
  }
  return extensionToParser[extension](file);
};
