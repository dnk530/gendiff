import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedOutput = fs.readFileSync(getFixturePath('/simple/output.txt'), 'utf-8');
const output = fs.readFileSync(getFixturePath('output.txt'), 'utf-8');

test('gendiff json', () => {
  const filepath1 = getFixturePath('/simple/file1.json');
  const filepath2 = getFixturePath('/simple/file2.json');
  expect(genDiff(filepath1, filepath2)).toEqual(expectedOutput);
});

test('gendiff yaml', () => {
  const filepath1 = getFixturePath('/simple/file1.yml');
  const filepath2 = getFixturePath('/simple/file2.yaml');
  expect(genDiff(filepath1, filepath2)).toEqual(expectedOutput);
});

test('gendiff no extension json + yaml', () => {
  const filepath1 = getFixturePath('/simple/file1');
  const filepath2 = getFixturePath('/simple/file2.yaml');
  expect(genDiff(filepath1, filepath2)).toEqual(expectedOutput);
});

test('gendiff nested json', () => {
  const filepath1 = getFixturePath('/file1.json');
  const filepath2 = getFixturePath('/file2.json');
  expect(genDiff(filepath1, filepath2)).toEqual(output);
});
