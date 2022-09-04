import { Command } from 'commander';
const commander = new Command();
commander.version('1.0.0').description('Compares two configuration files and shows a difference.');
commander.parse(process.argv);
