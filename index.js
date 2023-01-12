/*
 * @Description: 
 * @Author: hm
 * @Date: 2020-10-21 09:52:32
 * @LastEditors: hm
 * @LastEditTime: 2021-12-13 10:36:15
 */
const WebSocket = require('ws');

const querystring = require('querystring');
const { getIPAdress } = require('./ip');
const server = new WebSocket.Server({ port: 8081 });

server.on('open', function open() {
  console.log('connected');
});

server.on('close', function close() {
  console.log('disconnected');
});

server.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  const port = req.connection.remotePort;
  const clientName = ip + port;
  // const clientName = getIPAdress();
  console.log('%s is connected', clientName)
  // 发送欢迎信息给客户端
  ws.send(clientName);
  ws.on('message', function incoming(message) {
    // console.log('received: %s from %s', message, clientName);
    // 广播消息给所有客户端
    console.log(server.clients)
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          clientName + 'ip,' +
          message
        );
      }
    });
  });
});
