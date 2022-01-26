import { readFileSync } from 'fs';
import path from 'path';
import trimStart from 'lodash/trimStart.js';
import parse from './parsers.js';
import buildAst from './astBuilder.js';
import formatAst from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const getFile = (filepath) => readFileSync(path.resolve(filepath), 'utf8');
  const getExtension = (filepath) => trimStart(path.extname(filepath), '.').toLowerCase();
  const getFileFormat = (filepath) => {
    const extension = getExtension(filepath);
    if (extension.length === 0) {
      return 'json';
    }
    const extensionToFormat = {
      json: 'json',
      yml: 'yaml',
      yaml: 'yaml',
    };
    return extensionToFormat[extension];
  };
  const data1 = parse(getFile(filepath1), getFileFormat(filepath1));
  const data2 = parse(getFile(filepath2), getFileFormat(filepath2));
  const ast = buildAst(data1, data2);
  return formatAst(ast, formatName);
};
