import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url); // ?
const __dirname = dirname(__filename); // ?

test('gendiff ', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); // ?
  const file1 = JSON.parse(fs.readFileSync(getFixturePath('file1.json'), 'utf-8'));
  const file2 = JSON.parse(fs.readFileSync(getFixturePath('file2.json'), 'utf-8'));
  const expectedOutput = fs.readFileSync(getFixturePath('expected_file.txt'), 'utf-8');
  expect(genDiff(file1, file2)).toEqual(expectedOutput);
});
