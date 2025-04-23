import compileEjsTemplateToTsFile from "../utils/compile-ejs";
import writeFile from "../utils/writeFile";
import getFileType from "../utils/getFileType";
import { mkdir } from 'fs/promises';
import { join } from 'path';

async function createComponentAction(componentName: string, destName: string, responseType: { type: string }) {
  // console.log(componentName, destName, responseType?.type);
  const [fileType, templateName] = getFileType(responseType.type ?? 'vue');
  const finalDestName = destName || 'src/components';
  try {
    const res = await compileEjsTemplateToTsFile(templateName, { name: componentName }) as string;
    const filePath = join(finalDestName, `${componentName}.${fileType}`);
    await mkdir(destName, { recursive: true });
    await writeFile(filePath, res);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
      console.log(`目录 ${destName} 已存在`);
    } else {
      console.error(`发生错误: ${(error as Error).message}`);
    }
  }
}

export default createComponentAction;