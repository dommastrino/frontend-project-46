#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { program } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';

const command = (files, format) => {
  const [file1, file2] = files;
  let fileContent1;
  let fileContent2;
  if (format) {
    console.log('форматируем');
  } else {
    fileContent1 = fs.readFileSync(path.resolve(process.cwd(), file1).trim(), 'utf8');
    const obj1 = JSON.parse(fileContent1);
    const keys1 = Object.keys(obj1);
    fileContent2 = fs.readFileSync(path.resolve(process.cwd(), file2).trim(), 'utf8');
    const obj2 = JSON.parse(fileContent2);
    const keys2 = Object.keys(obj2);
    console.log('{');
    for (const key of keys1) {
      if (!Object.hasOwn(obj2, key)) {
        console.log(`- ${key}: ${obj1[key]}`);
      }
    }
    for (const key of keys2) {
      if (Object.hasOwn(obj1, key)) {
        if (obj1[key] !== obj2[key]) {
          console.log(`- ${key}: ${obj1[key]}`);
          console.log(`+ ${key}: ${obj2[key]}`);
        } else {
          console.log(`  ${key}: ${obj1[key]}`);
        }
      } else {
        console.log(`+ ${key}: ${obj2[key]}`);
      }
    }
    // for (const key of keys1) {
    //   if (!Object.hasOwn(obj2, key)) {
    //     console.log(`- ${key}: ${obj1[key]}`);
    //   } else {
    //     if (obj2[key] == obj1[key]) {
    //       console.log(`  ${key}: ${obj2[key]}`);
    //     } else {
    //       console.log(`+ ${key}: ${obj2[key]}`);
    //       console.log(`- ${key}: ${obj1[key]}`);
    //     }
    //   }
    // }
    // for (const key of keys2) {
    //   if (!Object.hasOwn(obj1, key)) {
    //     console.log(`+ ${key}: ${obj2[key]}`);
    //   }
    // }
    console.log('}');
  }
};

program.version('1.0.0').description('Compares two configuration files and shows a difference.').option('-f, --format <type>', 'output format').argument('<filepath1> <filepath2>');
program.parse(process.argv);

const { args } = program;
const options = program.opts();
const { format } = options;

command(args, format);
