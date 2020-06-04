/*
 * @Author: xiantian@tangping
 * @Descriptions: 使用 EventEmitter 扩展创建一个 Watch 类，用来处理某个目录下的文件
 *                实现一个方法，将 origin 目录下的文件名都改成小写的，并且将文件复制到
 *                processed 目录下
 * @TodoList: 无
 * @Date: 2020-06-04 18:09:11
 * @Last Modified by: xiaotian@tangping
 * @Last Modified time: 2020-06-04 18:41:35
 */

import fs = require('fs');
import events = require('events');

class Watcher extends events.EventEmitter {
  // 观察的文件夹
  private watchDir: string;

  // 处理后文件夹
  private processedDir: string;

  constructor(watchDir: string, processedDir: string) {
    super();
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }

  watch() {
    fs.readdir(this.watchDir, (err, files) => {
      if (err) return;

      // 每个文件触发 process 事件
      files.forEach((file: string) => {
        console.log(file);
        this.emit('process', file);
      });
    });
  }

  start() {
    fs.watchFile(this.watchDir, () => {
      this.watch();
    });
  }
}

const watchDir =
  '/Users/zhouyou/Project/coding-file/node-project/tiny/src/demos/watcher/origin';
const processedDir =
  '/Users/zhouyou/Project/coding-file/node-project/tiny/src/demos/watcher/processed';

const singleWatcher = new Watcher(watchDir, processedDir);

singleWatcher.on('process', (file: string) => {
  const watchFile = `${watchDir}/${file}`;
  const processedFile = `${processedDir}/${file.toLowerCase()}`;

  fs.rename(watchFile, processedFile, (err) => {
    if (err) throw err;
  });
});

module.exports = singleWatcher;
