#!/usr/bin/env node
import { readFileSync } from 'fs';
import { dirname } from 'path';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = path.join(__dirname, '..', './package.json');
const packageConfig = JSON.parse(readFileSync(configPath));

const program = new Command();
program
  .description(packageConfig.description)
  .version(packageConfig.version)
  .option('-f, --format [type]', 'output format [stylish|plain|json]', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const absPath1 = path.resolve(filepath1);
    const absPath2 = path.resolve(filepath2);
    const options = program.opts();
    console.log(genDiff(absPath1, absPath2, options.format));
  });
program.parse();
