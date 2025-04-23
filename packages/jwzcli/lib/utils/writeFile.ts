import fs from 'fs';
function writeFile(filePath: string, content: string) {
  return fs.promises.writeFile(filePath, content);
}

export default writeFile;