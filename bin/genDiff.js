#!/usr/bin/env node --experimental-json-modules --no-warnings
import genDiff from '../src/index.js'
import { Command } from 'commander/esm.mjs';
import packageConfig from '../package.json';

const program = new Command();
program
  .description(packageConfig.description)
  .version(packageConfig.version)
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
program.parse();

genDiff();