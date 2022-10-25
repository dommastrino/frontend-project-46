#!/usr/bin/env node
import { program } from 'commander';
import findDiff from '../src/findDiff.js';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => findDiff(filepath1, filepath2, program.opts().format));
program.parse();
