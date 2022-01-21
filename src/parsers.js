import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import trimStart from 'lodash/trimStart';
import has from 'lodash/has';

export default (filepath) => {
  const file = readFileSync(path.resolve(filepath), 'utf8');
  const extension = trimStart(path.extname(filepath), '.').toLowerCase();
  if (extension.length === 0) {
    return JSON.parse(file);
  }
  const extensionToParser = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  if (!has(extensionToParser, extension)) {
    throw new Error(`Unknown file format: '${extension}'`);
  }
  return extensionToParser[extension](file);
};
