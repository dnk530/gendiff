import has from 'lodash/has.js';
import isPlainObject from 'lodash/isPlainObject.js';
import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import isEqual from 'lodash/isEqual.js';

const buildAst = (obj1, obj2) => {
  const keys = sortBy(union(Object.keys(obj1), Object.keys(obj2)));
  const ast = keys.flatMap((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!has(obj1, key)) {
      return { type: 'added', name: key, value: value2 };
    }
    if (!has(obj2, key)) {
      return { type: 'deleted', name: key, value: value1 };
    }
    if (isEqual(value1, value2)) {
      return { type: 'unmodified', name: key, value: value1 };
    }
    if (isPlainObject(value1) && isPlainObject(value2)) {
      return { type: 'object', name: key, children: buildAst(value1, value2) };
    }
    return {
      type: 'modified',
      name: key,
      value1,
      value2,
    };
  });
  return ast;
};

export default buildAst;
