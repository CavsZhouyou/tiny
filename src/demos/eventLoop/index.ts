/*
 * @Author: xiantian@tangping
 * @Descriptions: node event loop 测试
 * @TodoList: 无
 * @Date: 2020-06-21 22:26:21
 * @Last Modified by: xiaotian@tangping
 * @Last Modified time: 2020-06-21 22:28:12
 */

import fs = require('fs');
import path = require('path');

/**
 * 10 ms 的 I/O 操作
 *
 * @param {() => void} callback
 */
function asyncPollOperation(callback: () => void) {
  const startTime = Date.now();

  fs.readFile(path.resolve(__dirname, './test.txt'), (err) => {
    if (err) throw err;

    const endTime = Date.now();
    console.log('durations: ', endTime - startTime);

    callback();
  });
}

function loopTest(): void {
  console.log('================start================');

  // I/O operation
  asyncPollOperation(() => {
    console.log('I/O end');
  });

  // timeout operation
  setTimeout(() => {
    console.log('timeout end');
  }, 100);

  console.log('=================end=================');
}

module.exports = loopTest;
