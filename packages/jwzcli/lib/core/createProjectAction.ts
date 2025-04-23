//TODO define our pull template func
import download from 'download-git-repo'
import { promisify } from 'util'
import { 
  VUE_WEBPACK_TS_TEMPLATE, 
  VUE_VITE_TS_TEMPLATE, 
  REACT_WEBPACK_TS_TEMPLATE, 
  REACT_VITE_TS_TEMPLATE 
} from '../config/repo'
import execCommand from '../utils/exec-command'

interface CustomDownloadOptions {
  clone?: boolean;
  cwd?: string;
}
const downloadPromise = promisify(download);

async function createProjectAction(
    projectName: string, 
    templateName?: { template: string | null } | null
  ) {
  const finalTemplateName = templateName ? templateName.template || 'react-ts-webpack' : 'react-ts-webpack';
  const customOptions: CustomDownloadOptions = { clone: true, cwd: projectName };
  let command: string;
  let repoUrl: string;
  try {
    //TODO use switch to get repo url
    switch (finalTemplateName) {
      case 'vue-ts-webpack':
        repoUrl = VUE_WEBPACK_TS_TEMPLATE;
        break;
      case 'vue-ts-vite':
        repoUrl = VUE_VITE_TS_TEMPLATE;
        break;
      case 'react-ts-webpack':
        repoUrl = REACT_WEBPACK_TS_TEMPLATE;
        break;
      case 'react-ts-vite':
        repoUrl = REACT_VITE_TS_TEMPLATE;
        break;
      default:
        console.log('Unsupported template');
        return;
    }
    // @ts-ignore Suppress the type check temporarily
    await downloadPromise(repoUrl, projectName,  customOptions)

    //TODO use switch to exec command gived in different platform
    switch (process.platform) {
      case 'win32':
        command = 'npm.cmd';
        break;
      case 'darwin':
      case 'linux':
        command = 'npm';
        break;
      default:
        console.log('Unsupported platform');
        return;
    }
    await execCommand(command, ['install'], { cwd: `./${projectName}` });

    //TODO give user some tips
    console.log(
      `\r\nSuccessfully created project ${projectName}`,
      `\r\ncd ${projectName}`,
      `\r\nstart your project`,
      `\r\n` 
    )
  } catch (error) {
    console.log(error, "maybe your network is not good, please try again later!!!");
  }
}

export default createProjectAction;