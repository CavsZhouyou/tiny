/*
 * @Author: xiantian@tangping
 * @Descriptions: 入口文件
 * @TodoList: 无
 * @Date: 2020-06-04 17:03:45
 * @Last Modified by: xiaotian@tangping
 * @Last Modified time: 2020-06-05 17:39:36
 */

// const channelServer = require('./demos/channelServer/index.ts');
// channelServer.listen(9090);

// const singeWatcher = require('./demos/watcher/index.ts');
// singeWatcher.start();

// const next = require('./demos/rssSpider/index.ts');
// next();

const loop = require('./demos/eventLoop/index.ts');

loop();
