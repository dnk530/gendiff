#!/usr/bin/env node --experimental-json-modules --no-warnings
import genDiff from '../src/index.js'
import { Command } from 'commander/esm.mjs';
import packageConfig from '../package.json';
import path from 'path';
import { readFileSync } from 'fs';

const program = new Command();
program
  .description(packageConfig.description)
  .version(packageConfig.version)
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const abspath1 = path.resolve(filepath1);
    const abspath2 = path.resolve(filepath2);
    const file1 = JSON.parse(readFileSync(abspath1, 'UTF-8'));
    const file2 = JSON.parse(readFileSync(abspath2, 'UTF-8'));
    genDiff(file1, file2)
  })
program.parse();