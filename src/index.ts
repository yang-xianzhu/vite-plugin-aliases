import type { PluginOption } from "vite";
import { IinstallOptions } from "./type";
import Processor from "./processor";

const installOptions: IinstallOptions = {
  keyName: "@",
};

export function myAliases(
  options: IinstallOptions = installOptions
): PluginOption {
  return {
    name: "vite-Yzz-aliases",
    config(config) {
      // config：配置对象
      // env：mode：string（development开发模式，production生产模式），command：string
      // config函数可以返回一个对象，这个对象是部分的viteconfig配置（就是自己想改的一部分）
      // init
      const pro = Processor(options);
      const aliases = pro.init();
      // 读取src文件下的所有目录
      config.resolve = {
        // 如果用户原本配置了resolve.alias，则合并操作，否则直接使用。
        alias: config.resolve?.alias
          ? [...(config.resolve?.alias as any), aliases]
          : [aliases],
      };
    },
  };
}
