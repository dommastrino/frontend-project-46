import { Command } from 'commander';
const commander = new Command();
commander.version('1.0.0').description('Compares two configuration files and shows a difference.');
commander.option('-f, --format <type>', 'output format').argument('<filepath1> <filepath2>');
commander.parse(process.argv);
