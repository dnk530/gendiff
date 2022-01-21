import has from 'lodash/has';
import isPlainObject from 'lodash/isPlainObject';
import sortBy from 'lodash/sortBy';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';

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
