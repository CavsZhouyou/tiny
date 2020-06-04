/*
 * @Author: xiantian@tangping
 * @Descriptions: 用事件发射器实现简单的发布/预定系统
 * @TodoList: 无
 * @Date: 2020-06-04 16:24:57
 * @Last Modified by: xiaotian@tangping
 * @Last Modified time: 2020-06-04 17:09:06
 */

import events = require('events');
import net = require('net');

interface clientType {
  [propName: string]: net.Socket;
}

interface subscriptionsType {
  [propName: string]: (senderId: string, message: string) => void;
}

// 创建一个事件发射器
const channel = new events.EventEmitter();

// 订阅者
const clients: clientType = {};

// 订阅者对应的订阅事件
const subscriptions: subscriptionsType = {};

channel.on('join', (id: string, client: net.Socket) => {
  // 加入一个订阅者
  clients[id] = client;

  // 为订阅者添加一个订阅事件，当有其他用户发送消息时，将消息转发给当前订阅者
  subscriptions[id] = (senderId: string, message) => {
    // 如果是自己发送的消息则退出
    if (id === senderId) return;

    // 发送用户的消息给自己
    clients[id].write(`${id} say: ${message}`);
  };

  // 添加 broadcast 事件的监听
  channel.on('broadcast', subscriptions[id]);
});

const server = net.createServer((client: net.Socket) => {
  const id = `${client.remoteAddress}:${client.remotePort}`;

  console.log('id: ', id);

  channel.emit('join', id, client);

  // 当连接用户传入数据的时候，触发广播事件
  client.on('data', (data: Buffer) => {
    const formatedData = data.toString();
    channel.emit('broadcast', id, formatedData);
  });
});

module.exports = server;
