/*
 * @Author: xiantian@tangping
 * @Descriptions: 异步任务串行化执行，通过 rss 地址抓取文章内容
 * @TodoList: 无
 * @Date: 2020-06-05 16:30:33
 * @Last Modified by: xiaotian@tangping
 * @Last Modified time: 2020-06-05 17:46:07
 */

import fs = require('fs');
import request = require('request');

const configFileName =
  '/Users/zhouyou/Project/coding-file/node-project/tiny/src/demos/rssSpider/rss_feeds.txt';
let tasks: ((param?: any) => void)[] = [];

/**
 * 异步任务串行化执行函数
 *
 * @param {(Error | null)} error
 * @param {*} [result]
 */
function next(error: Error | null, result?: any) {
  if (error) throw error;

  const currentTask = tasks.shift();

  if (currentTask) currentTask(result);
}

/**
 * 任务 1
 * 检查 rss 文件是否存在
 *
 */
function checkForRssFile() {
  fs.access(configFileName, fs.constants.F_OK, (error): any => {
    if (error) return next(new Error(`Missing RSS File: ${configFileName}`));
    return next(null, configFileName);
  });
}

/**
 * 任务 2
 * 读取 Rss 文件内容，随机返回其中一个
 *
 * @param {string} fileName
 */
function readRSSFile(fileName: string) {
  fs.readFile(fileName, (err, feedList: Buffer) => {
    if (err) return next(err);

    const formatedFeedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, '')
      .split('\n');

    const random = Math.floor(Math.random() * formatedFeedList.length);

    return next(null, formatedFeedList[random]);
  });
}

/**
 * 任务 3
 * 下载 Rss 内容
 *
 * @param {string} feedUrl
 */
function downloadRSSFeed(feedUrl: string) {
  request({ uri: feedUrl }, (err, res, body) => {
    if (err) return next(err);

    if (res.statusCode !== 200)
      return next(new Error('Abnormal response status code'));

    console.log('text:', body);

    return body;
  });
}

tasks = [checkForRssFile, readRSSFile, downloadRSSFeed];

module.exports = next;
