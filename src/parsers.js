import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';

export default (filepath) => {
  const file = readFileSync(filepath, 'UTF-8');
  const extension = path.extname(filepath);
  const mapping = {
    '.json': JSON.parse,
    '': JSON.parse,
    '.yaml': yaml.load,
    '.yml': yaml.load,
  };
  if (!_.has(mapping, extension)) {
    console.log(`Unknown file format: '${extension}'`);
    process.exit(1);
  }
  return mapping[extension](file);
};
