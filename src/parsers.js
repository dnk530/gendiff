import yaml from 'js-yaml';

export default (data, dataFormat) => {
  const dataFormatToParser = {
    json: JSON.parse,
    yaml: yaml.load,
  };
  return dataFormatToParser[dataFormat](data);
};
