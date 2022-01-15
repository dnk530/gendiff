import parse from './parsers.js';
import buildAst from './astBuilder.js';
import formatAst from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const ast = buildAst(data1, data2);
  return formatAst(ast, formatName);
};
