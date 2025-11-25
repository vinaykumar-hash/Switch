import { readFile, writeFile } from 'fs';
export function saveBinaryFile(fileName, content) {
  writeFile(fileName, content, 'utf8', (err) => {
    if (err) {
      console.error(` Error writing file ${fileName}:`, err);
      return;
    }
    console.log(` File ${fileName} saved successfully.`);
  });
}
