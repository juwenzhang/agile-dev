#!/usr/bin/env node
import { Command } from 'commander';
import helpOptionsFunc from './core/help-options';
import createProjectAction from './core/createProjectAction';
import createComponentAction from './core/createComponentAction';

const program: Command = new Command();

//TODO add help options
helpOptionsFunc(program);

//TODO add create project command
program
  .command('init <projectName>') // command name
  .description(`init a project, template you can chioce:\n     vue-ts-webpack,\n     vue-ts-vite,\n     react-ts-webpack,\n     react-ts-vite\n     example: jwzcli init my-project -t vue-ts-webpack\n     default: react-ts-webpack\n`) // command description
  .option('-t, --template <templateName>', 'choose template, please use -t or --template option to choose template ensurase')
  .action(createProjectAction);

//TODO create component command  
program
  .command('add <componentName> [...others]')
  .description('add a component, example: jwzcli add my-component -d src/components -t type')
  .option('-d, --dest <destName>', 'choose a dest')
  .option('-t, --type <typeName>', 'choose a type')
  .action(createComponentAction)

//TODO program must do parse process.argv to get our information
program.parse(process.argv);