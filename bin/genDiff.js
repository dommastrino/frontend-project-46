#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { program } from 'commander';
import findDiff from '../src/findDiff.js';

const command = (files, format) => {
  const [file1, file2] = files;
  if (format) {
    console.log('форматируем');
    return;
  } else {
    return findDiff(file1, file2);
  }
};
program.version('1.0.0').description('Compares two configuration files and shows a difference.').option('-f, --format <type>', 'output format').argument('<filepath1> <filepath2>');
program.parse(process.argv);

const { args } = program;
const options = program.opts();
const { format } = options;

command(args, format);
