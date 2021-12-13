#!/usr/bin/env node --experimental-json-modules --no-warnings
import genDiff from '../src/index.js'
import { Command } from 'commander/esm.mjs';
import packageConfig from '../package.json';

const program = new Command();
program
  .description(packageConfig.description)
  .version(packageConfig.version)
program.parse();

genDiff();