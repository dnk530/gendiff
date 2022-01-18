import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const outputStylish = fs.readFileSync(getFixturePath('output.txt'), 'utf-8');
const outputPlain = fs.readFileSync(getFixturePath('output-plain.txt'), 'utf-8');
const outputJson = fs.readFileSync(getFixturePath('output-json'), 'utf-8');

const JSON1 = getFixturePath('file1.json');
const JSON2 = getFixturePath('file2');
const YML1 = getFixturePath('file1.yaml');
const YML2 = getFixturePath('file2.yml');

describe('Test formatters', () => {
  test.each([
    ['JSON to stylish', 'stylish', JSON1, JSON2, outputStylish],
    ['YML to stylish', 'stylish', YML1, YML2, outputStylish],
    ['Unspecified format to equal stylish', undefined, YML1, YML2, outputStylish],
    ['JSON & YML to plain', 'plain', JSON1, YML2, outputPlain],
    ['JSON & YML to JSON', 'json', JSON1, YML2, outputJson],
  ])('Test %# %s', (name, format, filepath1, filepath2, expected) => {
    expect(genDiff(filepath1, filepath2, format)).toEqual(expected);
  });
});

describe('Error on unknown format', () => {
  test('Invalid output format', () => {
    expect(() => {
      genDiff(JSON1, JSON2, 'pln');
    }).toThrowError(new Error('Unknown format style: \'pln\''));
  });
});
