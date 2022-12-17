import { IinstallOptions, IDiffDirAndFileResult } from "./type";
const fs = require("fs");
const path = require("path");

const URL = "./src";
// 区分：文件和文件夹函数
function diffDirAndFile(
  dirFilesArr: Array<string> = [],
  basePath: string = ""
) {
  const result: IDiffDirAndFileResult = {
    dirs: [], // 存储目录文件
    files: [], // 存储普通文件
  };
  dirFilesArr.forEach((name) => {
    const currentFileStat = fs.statSync(
      path.resolve(__dirname, `${basePath}/${name}`)
    );
    const isDirectory = currentFileStat.isDirectory();
    // 如果是目录就返回true，否则返回false
    if (isDirectory) {
      result.dirs.push(name);
    } else {
      result.files.push(name);
    }
  });
  return result;
}

// 读取文件函数
function getSrcDir(options: IinstallOptions) {
  // 同步读取scr下的所有目录
  const result = fs.readdirSync(path.resolve(__dirname, URL));
  const diffResult = diffDirAndFile(result as any, URL);

  const resoleAliases: {
    [k in string]: string;
  } = {};
  diffResult.dirs.forEach((dirName) => {
    const key = `${options.keyName}/${dirName}`;
    const dirPath = path.resolve(__dirname, `${URL}/${dirName}`);
    resoleAliases[key] = dirPath;
  });
  return resoleAliases;
}

export default function YzzAliases(options: IinstallOptions) {
  return {
    init() {
      return getSrcDir(options);
    },
  };
}
