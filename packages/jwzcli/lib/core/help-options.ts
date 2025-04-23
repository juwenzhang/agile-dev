import { Command } from 'commander';
import path from 'path';

function helpOptionsFunc(program: Command) {
  const filePath = path.join(__dirname, '../../package.json');
  const { name, version, description, keywords, author } = require(filePath);

  program
    .option("-n --name", "get our cli information about name")
    .option("-d --description", "get our cli information about description")
    .option("-k --keywords", "get our cli information about keywords")
    .option("-a --author", "get our cli information about author")
    .action((options: { 
      name?: boolean; 
      description?: boolean; 
      keywords?: boolean; 
      author?: boolean 
    }) => {
      if (options.name) {
        console.log(`name: ${name}`);
      }
      if (options.description) {
        console.log(`description: ${description}`);
      }
      if (options.keywords) {
        console.log(`keywords: ${keywords}`);
      }
      if (options.author) {
        console.log(`author: ${author}`);
      }
    });

  program.version(version, "-v --version", "get our cli information about version");

  program.on("--help", () => {
    console.log(`\nRun jwzcli <command> --help for detailed usage of given command.`);
    console.log(`    name: ${name}`);
    console.log(`    description: ${description}`);
    console.log(`    keywords: ${keywords}`);
    console.log(`    author: ${author}`);
  });
}

export default helpOptionsFunc;