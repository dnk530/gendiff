import _ from 'lodash';

export default (file1, file2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(file1), ...Object.keys(file2)]));

  const result = keys.map(key => {
    if (_.has(file1, key) && _.has(file2, key)) {
      return (
        file1[key] === file2[key]
        ? `    ${key}: ${file1[key]}`
        : `  - ${key}: ${file1[key]}
  + ${key}: ${file2[key]}`
      )
    };
    if (!_.has(file1, key) && _.has(file2, key)) {
      return (`  + ${key}: ${file2[key]}`);
    };
    if (_.has(file1, key) && !_.has(file2, key)) {
      return (`  - ${key}: ${file1[key]}`);
    };
  });

console.log(['{', ...result, '}'].join('\n'));

return result;
};