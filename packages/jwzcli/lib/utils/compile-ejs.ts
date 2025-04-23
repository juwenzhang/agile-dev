//TODO compile ejs template to ts file
import path from 'path';
import ejs from 'ejs';
async function compileEjsTemplateToTsFile(templateName: string, data: { name: string }) { 
  const absolutePath = path.resolve(__dirname, `../../templates/component-templates/${templateName}`);
  return new Promise((resolve, reject) => {
    ejs.renderFile(absolutePath, data, {}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    }); 
  })
}

export default compileEjsTemplateToTsFile;