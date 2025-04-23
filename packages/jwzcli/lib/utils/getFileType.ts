import { VUE_TEMPLATE_FILE_NAME, REACT_TEMPLATE_FILE_NAME } from "../config/file";

function getFileType(str: string) {
  if (str.match(/vue/)) {
    return ['vue', VUE_TEMPLATE_FILE_NAME];
  } else if (str.match(/react/)) {
    return ['tsx', REACT_TEMPLATE_FILE_NAME];
  } else {
    return ['vue', VUE_TEMPLATE_FILE_NAME]; 
  }
}

export default getFileType;