function updateFileName(fileName: string, filesList: string[]): string {
  // check if fileName already exists in the filesList
  let count = 0;
  let newFileName = fileName;
  for (let i = 0; i < filesList.length; i++) {
    if (filesList[i] === newFileName) {
      count++;
      newFileName = `${fileName.split(".")[0]}(${count}).${
        fileName.split(".")[1]
      }`;
      // recursive call to check if the new file name also exists in the list
      newFileName = updateFileName(newFileName, filesList);
      break;
    }
  }
  return newFileName;
}

export default updateFileName;
