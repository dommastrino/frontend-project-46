#!/usr/bin/env node
import { program } from 'commander';
import findDiff from '../src/findDiff.js';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1...>')
  .action((files, option) => {
    const [file1, file2] = files;
    return findDiff(file1, file2, option.format);
  });
program.parse();
