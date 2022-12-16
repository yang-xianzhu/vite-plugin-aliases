import { IinstallOptions, IDiffDirAndFileResult } from "./type";
const qs = require("fs");
const path = require("path");

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
    const currentFileStat = qs.statSync(
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
  const result = qs.readdirSync(path.resolve(__dirname, "../src"));
  const diffResult = diffDirAndFile(result as any, "../src");

  const resoleAliases: {
    [k in string]: string;
  } = {};
  diffResult.dirs.forEach((dirName) => {
    const key = `${options.keyName}${dirName}`;
    const dirPath = path.resolve(__dirname, `../src/${dirName}`);
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
