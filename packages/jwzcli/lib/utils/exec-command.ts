import { spawn, SpawnOptions } from "child_process";

type SpawnArgs = [command: string, args?: string[], options?: SpawnOptions];

//TODO use child_process to exec command
function execCommand(...args: SpawnArgs) {
  return new Promise((resolve, reject) => {
    try {
      const [command, rawArgs, options] = args;
  
      //TODO use ?? to replace ||
      const finalArgs = rawArgs ?? []; // this is a string array
      const finalOptions: SpawnOptions = options ?? {}; // this is a object
      const childProcess = spawn(command, finalArgs, finalOptions);
      
      //TODO settle our childProcess.stdout and childProcess.stderr
      childProcess.stdout?.pipe(process.stdout);
      childProcess.stderr?.pipe(process.stderr);
      
      //TODO close our childProcess when it is closed
      childProcess.on('close', (code) => {
        resolve(code);
      }); 
      childProcess.on('error', (error) => {
        reject(error); 
      })
    } catch (error) {
      reject(error);
    }
  })
}

export default execCommand;