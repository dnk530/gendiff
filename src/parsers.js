import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const file = readFileSync(filepath, 'UTF-8');
  const extension = path.extname(filepath);
  const JSON_EXTENSIONS = ['.json', ''];
  const YAML_EXTENSIONS = ['.yaml', '.yml'];
  let parse;

  if (JSON_EXTENSIONS.includes(extension)) {
    parse = (x) => JSON.parse(x);
  }
  if (YAML_EXTENSIONS.includes(extension)) {
    parse = (x) => yaml.load(x);
  }

  return (parse(file));
};
