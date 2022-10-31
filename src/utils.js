import parse from './parsers.js';
import path from 'path';
import fs from 'fs';

const extractFormat = (file) => path.parse(file).ext.slice(1);

const buildFullPath = (file) => fs.readFileSync(path.resolve(process.cwd(), file).trim(), 'utf8');

export const getData = (file) => parse(buildFullPath(file), extractFormat(file));