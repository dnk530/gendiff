#!/usr/bin/env node
import { readFileSync } from 'fs';
import path from 'path';
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const packageConfig = JSON.parse(readFileSync(path.resolve('./package.json')));

const program = new Command();
program
  .description(packageConfig.description)
  .version(packageConfig.version)
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const absPath1 = path.resolve(filepath1);
    const absPath2 = path.resolve(filepath2);
    genDiff(absPath1, absPath2);
  });
program.parse();
