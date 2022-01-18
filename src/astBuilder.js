import _ from 'lodash';

const buildAst = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const ast = keys.flatMap((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return { type: 'added', name: key, value: value2 };
    }
    if (!_.has(obj2, key)) {
      return { type: 'deleted', name: key, value: value1 };
    }
    if (value1 === value2) {
      return { type: 'unmodified', name: key, value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'object', name: key, children: (buildAst(value1, value2)) };
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
