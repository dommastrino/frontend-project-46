import path from 'path';
import fs from 'fs';
import parse from './parsers.js';

const extractFormat = (file) => path.parse(file).ext.slice(1);

const buildFullPath = (file) => fs.readFileSync(path.resolve(process.cwd(), file).trim(), 'utf8');

export default (file) => parse(buildFullPath(file), extractFormat(file));
