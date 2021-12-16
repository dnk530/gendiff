import _ from 'lodash';

export default (file1, file2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(file1), ...Object.keys(file2)]));

  const result = keys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (!_.has(file1, key)) {
      return (`  + ${key}: ${value2}`);
    }
    if (!_.has(file2, key)) {
      return (`  - ${key}: ${value1}`);
    }
    return (
      value1 === value2
        ? `    ${key}: ${value1}`
        : `  - ${key}: ${value1}
  + ${key}: ${value2}`
    );
  });

  console.log(['{', ...result, '}'].join('\n'));

  return result;
};
