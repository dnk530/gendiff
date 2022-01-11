import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const file = readFileSync(filepath, 'UTF-8');
  const extension = path.extname(filepath);
  const mapping = {
    '.json': JSON.parse,
    '': JSON.parse,
    '.yaml': yaml.load,
    '.yml': yaml.load,
  };
  return mapping[extension](file);
};
