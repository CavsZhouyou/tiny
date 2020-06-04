/*
 * @Author: xiantian@tangping
 * @Descriptions: 入口文件
 * @TodoList: 无
 * @Date: 2020-06-04 17:03:45
 * @Last Modified by: xiaotian@tangping
 * @Last Modified time: 2020-06-04 17:06:13
 */

const channelServer = require('./demos/channelServer/index.ts');

// 启动服务
channelServer.listen(9090);
